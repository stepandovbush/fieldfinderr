"""
Launchpad backend — Groq (Llama) powered.

Endpoints:
  POST /api/fields        -> every type of field a student can go into
  POST /api/careers       -> careers + skills inside a typed field
  POST /api/universities  -> best universities worldwide for a field, weighing price + academics
  POST /api/majors        -> every major offered at a given university
  POST /api/scan          -> scan a resume / PDF / txt / image and extract structured info

API keys are rotated round-robin across LLM_API_KEY_1..3 with automatic
failover on rate-limit / server errors.
"""

import os
import io
import re
import json
import base64
import itertools
import threading

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
TEXT_MODEL = os.getenv("GROQ_TEXT_MODEL", "llama-3.1-8b-instant")
FALLBACK_MODEL = "llama-3.1-8b-instant"  # used if TEXT_MODEL hits daily token cap
VISION_MODEL = os.getenv("GROQ_VISION_MODEL", "meta-llama/llama-4-scout-17b-16e-instruct")

# ---- key rotation -----------------------------------------------------------
# Loads every LLM_API_KEY_* defined in .env (1, 2, 3, 4, ...) — add as many as you like.
KEYS = [v.strip() for k, v in sorted(os.environ.items())
        if k.startswith("LLM_API_KEY_") and v and v.strip()]
_cycle = itertools.cycle(range(len(KEYS))) if KEYS else None
_lock = threading.Lock()


def _next_key() -> str:
    with _lock:
        return KEYS[next(_cycle)]


async def _try_model(model, messages, json_mode, max_tokens, temperature):
    """Try all keys for a given model. Returns (content, None) on success or (None, last_err) on failure."""
    last_err = "unknown error"
    is_tpd_limit = False
    for _ in range(len(KEYS)):
        key = _next_key()
        payload = {"model": model, "messages": messages,
                   "temperature": temperature, "max_tokens": max_tokens}
        if json_mode:
            payload["response_format"] = {"type": "json_object"}
        try:
            async with httpx.AsyncClient(timeout=90) as client:
                r = await client.post(GROQ_URL, headers={"Authorization": f"Bearer {key}"}, json=payload)
            if r.status_code == 429 or r.status_code >= 500:
                last_err = f"{r.status_code}: {r.text[:200]}"
                if "tokens per day" in r.text or "TPD" in r.text:
                    is_tpd_limit = True
                continue
            r.raise_for_status()
            return r.json()["choices"][0]["message"]["content"], None
        except httpx.HTTPError as e:
            last_err = str(e)
            continue
    return None, (last_err, is_tpd_limit)


async def groq_chat(messages, model=TEXT_MODEL, json_mode=False,
                    max_tokens=1600, temperature=0.4) -> str:
    """Call Groq, rotating keys and failing over on 429/5xx. Falls back to 8b if daily TPD cap hit."""
    if not KEYS:
        raise HTTPException(500, "No API keys configured. Add LLM_API_KEY_1..3 to backend/.env")
    content, err = await _try_model(model, messages, json_mode, max_tokens, temperature)
    if content is not None:
        return content
    last_err, is_tpd = err
    # If primary model hit the daily token cap, retry with the fast fallback model
    if is_tpd and FALLBACK_MODEL and model != FALLBACK_MODEL:
        content, err2 = await _try_model(FALLBACK_MODEL, messages, json_mode, max_tokens, temperature)
        if content is not None:
            return content
        if err2:
            last_err = err2[0]
    raise HTTPException(502, f"All API keys failed. Last error: {last_err}")


def parse_json(raw: str):
    """Best-effort JSON parse: strip code fences, find first {...} / [...]."""
    s = raw.strip()
    if s.startswith("```"):
        s = s.split("```", 2)[1] if "```" in s[3:] else s.lstrip("`")
        s = s[4:] if s.lower().startswith("json") else s
    try:
        return json.loads(s)
    except Exception:
        for op, cl in (("{", "}"), ("[", "]")):
            i, j = s.find(op), s.rfind(cl)
            if i != -1 and j != -1:
                try:
                    return json.loads(s[i:j + 1])
                except Exception:
                    pass
    raise HTTPException(502, "Model did not return valid JSON.")


# ---- PII redaction (same approach as ClearPath: scrub before the LLM) -------
_PII_PATTERNS = [
    (re.compile(r'\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b'), '[SSN REDACTED]'),
    (re.compile(r'\b\d{2}-\d{7}\b'), '[EIN REDACTED]'),
    (re.compile(r'\b(?:\d[ -]?){13,16}\b'), '[CARD REDACTED]'),
    (re.compile(r'\b[A-Z]{1,2}\d{6,9}\b'), '[PASSPORT REDACTED]'),
    (re.compile(r'\bA[-\s]?\d{8,9}\b', re.IGNORECASE), '[A-NUMBER REDACTED]'),
    (re.compile(r'\b\d{8,17}\b'), '[ACCT REDACTED]'),
    (re.compile(r'\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b'), '[PHONE REDACTED]'),
    (re.compile(r'\b[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}\b'), '[EMAIL REDACTED]'),
    (re.compile(r'(?:date of birth|dob|born)[:\s]+\d{1,2}[/\-]\d{1,2}[/\-]\d{2,4}', re.IGNORECASE), '[DOB REDACTED]'),
    (re.compile(r'\b\d{1,5}\s+[A-Za-z0-9.\s]{3,40}\b(?:street|st|avenue|ave|road|rd|blvd|lane|ln|drive|dr|court|ct|way)\b', re.IGNORECASE), '[ADDRESS REDACTED]'),
]


def scrub_pii(text: str) -> str:
    for pattern, replacement in _PII_PATTERNS:
        text = pattern.sub(replacement, text)
    return text


# ---- app --------------------------------------------------------------------
app = FastAPI(title="Launchpad API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # dev: allow the static frontend on any port
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"ok": True, "keys_loaded": len(KEYS), "text_model": TEXT_MODEL, "vision_model": VISION_MODEL}


# ---- request bodies ---------------------------------------------------------
class FieldsReq(BaseModel):
    query: str | None = None


class InterpretFieldReq(BaseModel):
    text: str


class CareersReq(BaseModel):
    field: str
    age: int | None = None


class UniReq(BaseModel):
    field: str
    career: str | None = None
    age: int | None = None
    budget: str | None = None
    gpa: str | None = None
    sat: str | None = None
    act: str | None = None
    location: str | None = None
    class_rank: str | None = None
    extracurriculars: str | None = None
    awards: str | None = None
    rigor: str | None = None           # course rigor, e.g. "9 APs, IB Diploma"
    recs: str | None = None            # recommendation letters, e.g. "research scientist (strong)"
    hooks: str | None = None           # special hooks, e.g. "legacy, recruited athlete, URM"
    essay_themes: str | None = None    # essay topic ideas
    first_gen: str | None = None
    major: str | None = None
    school_size: str | None = None
    school_type: str | None = None
    financial_aid: str | None = None
    work_experience: str | None = None
    languages: str | None = None
    countries: str | None = None


class ChatReq(BaseModel):
    message: str
    history: list | None = None
    resume_context: str | None = None
    field: str | None = None
    career: str | None = None


class MajorsReq(BaseModel):
    university: str


class OppReq(BaseModel):
    field: str
    career: str | None = None
    stage: str                          # middleschool | highschool | college | graduate
    age: int | None = None


class ClassesReq(BaseModel):
    field: str
    career: str | None = None
    stage: str | None = None
    age: int | None = None


# what each stage is realistically working with
STAGE_GUIDE = {
    "middleschool": "a middle-school student (roughly ages 11-13): focus on exploration clubs, "
                    "beginner activities, summer camps, and age-appropriate competitions. No internships.",
    "highschool":   "a high-school student (roughly 14-17): clubs, volunteering, competitions, "
                    "and pre-college / summer programs.",
    "college":      "an undergraduate college student (roughly 18-22): clubs, competitions, "
                    "internships, and research opportunities.",
    "graduate":     "a graduate / postgraduate student (23+): research positions, fellowships, "
                    "internships, professional networking/conferences, and entry-level jobs.",
}


# ---- endpoints --------------------------------------------------------------
@app.post("/api/fields")
async def fields(req: FieldsReq):
    focus = f' related to "{req.query}"' if req.query else ""
    msgs = [
        {"role": "system", "content":
            "You are a career-exploration assistant for students. Return ONLY JSON."},
        {"role": "user", "content":
            f"List a comprehensive set of fields a student could go into{focus}. "
            "Group them by domain. JSON shape: "
            '{"groups":[{"domain":"...","fields":["...","..."]}]}. '
            "Be expansive and cover STEM, health, business, law, arts, trades, social sciences, and more."},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=2000))


@app.post("/api/interpret-field")
async def interpret_field(req: InterpretFieldReq):
    msgs = [
        {"role": "system", "content":
            "You identify what academic or professional field a student is interested in based on "
            "anything they type — even vague phrases, partial words, or descriptions. "
            "Return ONLY JSON."},
        {"role": "user", "content":
            f'Student typed: "{req.text}"\n\n'
            "What field of study or career area is this? "
            "Return a clean, properly capitalised field name (2-5 words) that will be used to find "
            "careers, courses, and opportunities. Also return a one-sentence tagline describing the field.\n"
            'JSON: {"field": "Architecture & Urban Design", "tagline": "Design buildings, cities, and spaces that shape how people live."}'},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=80, temperature=0.1))


@app.post("/api/careers")
async def careers(req: CareersReq):
    msgs = [
        {"role": "system", "content":
            "You are an exhaustive career mapper. Given a field, you list EVERY single job title, "
            "career path, and role that someone with knowledge of that field could pursue — leaving "
            "nothing out. You cover mainstream roles, niche specialisations, academic/research paths, "
            "government/public-sector roles, entrepreneurial paths, emerging tech-driven roles, "
            "creative applications, consulting variants, and adjacent careers that draw heavily on "
            "the field's knowledge. Return ONLY valid JSON."},
        {"role": "user", "content":
            f'Field: "{req.field}".\n\n'
            "List EVERY SINGLE career a student can pursue in or adjacent to this field. "
            "Do not stop early — aim for 40-80+ careers. Think across:\n"
            "- Direct / core roles in the field\n"
            "- Specialist / niche sub-roles within the field\n"
            "- Research and academic paths (professor, researcher, postdoc, lab director)\n"
            "- Government, policy, and public-sector roles\n"
            "- Business, consulting, and entrepreneurship roles\n"
            "- Education and training roles\n"
            "- Emerging and tech-driven roles (AI applications, new startups, etc.)\n"
            "- Cross-disciplinary roles that combine this field with law, business, writing, design, etc.\n"
            "- Non-obvious adjacent careers where this field's knowledge is a key advantage\n\n"
            "For every career provide: name, one fitting emoji (icon), a one-sentence blurb "
            "describing what the person actually does, and 5-7 concrete skills needed.\n\n"
            'JSON shape: {"field":"...","careers":[{"name":"...","icon":"emoji","blurb":"...","skills":["..."]}]}'},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=3000))


@app.post("/api/universities")
async def universities(req: UniReq):
    target = req.career or req.field

    # Build student profile string
    profile_parts = []
    if req.gpa:
        profile_parts.append(f"GPA {req.gpa}")
    if req.class_rank:
        profile_parts.append(f"class rank {req.class_rank}")
    if req.sat:
        profile_parts.append(f"SAT {req.sat}/1600")
    if req.act:
        profile_parts.append(f"ACT {req.act}/36")
    if req.location:
        profile_parts.append(f"from {req.location}")
    if req.extracurriculars:
        profile_parts.append(f"extracurriculars: {req.extracurriculars}")
    if req.awards:
        profile_parts.append(f"awards/honors: {req.awards}")
    if req.first_gen == "yes":
        profile_parts.append("first-generation college student")
    if req.rigor:
        profile_parts.append(f"course rigor: {req.rigor}")
    if req.recs:
        profile_parts.append(f"recommendation letters: {req.recs}")
    if req.hooks:
        profile_parts.append(f"special hooks: {req.hooks}")
    if req.essay_themes:
        profile_parts.append(f"essay themes: {req.essay_themes}")
    if req.work_experience:
        profile_parts.append(f"work experience: {req.work_experience}")
    if req.languages:
        profile_parts.append(f"languages: {req.languages}")
    profile_str = ", ".join(profile_parts) if profile_parts else "not provided"

    # School preference notes
    pref_parts = []
    if req.major:
        pref_parts.append(f"intended major: {req.major}")
    if req.school_size:
        pref_parts.append(f"school size: {req.school_size}")
    if req.school_type:
        pref_parts.append(f"school type: {req.school_type}")
    if req.financial_aid == "yes":
        pref_parts.append("financial aid is important — prioritize schools with strong aid/scholarship programs")
    prefs_str = "; ".join(pref_parts) if pref_parts else "none specified"

    # Reach / match / safety instruction
    has_academic = any([req.gpa, req.sat, req.act, req.class_rank])
    has_holistic = any([req.extracurriculars, req.awards, req.first_gen])
    if has_academic:
        fit_instruction = (
            "Using the student's academic profile (GPA, test scores, class rank), classify each university as: "
            "'safety' (student clearly exceeds typical requirements), "
            "'match' (student meets requirements well), or "
            "'reach' (student is below typical admitted student profile). "
            + ("Also factor in their extracurriculars/awards/first-gen status as a holistic boost where relevant. " if has_holistic else "")
            + "Set 'fit' to null only if truly insufficient info."
        )
    else:
        fit_instruction = "Set 'fit' to null — no academic scores were provided."

    # Tuition personalisation based on origin
    loc = (req.location or "").strip()
    if loc.lower() == "international":
        cost_note = "Show international student tuition/fees for every university."
    elif loc:
        cost_note = (
            f"For US universities, show in-state tuition if the student is from {loc}; "
            "otherwise show out-of-state rates. For non-US universities, show standard rates."
        )
    else:
        cost_note = "Show standard domestic/in-state tuition where applicable."

    msgs = [
        {"role": "system", "content":
            "You recommend universities worldwide for a student, balancing academic strength "
            "with affordability/value. Be realistic and global. Return ONLY JSON."},
        {"role": "user", "content":
            f"Recommend ~8 universities (GLOBALLY, not just USA) strong for {target}. "
            f"Student profile: {profile_str}. "
            f"School preferences: {prefs_str}. "
            f"Budget: {req.budget or 'any'}. Regions: {req.countries or 'global'}. "
            f"Age: {req.age or 'high school'}. "
            f"{cost_note} "
            f"{fit_instruction} "
            "Weigh academics, cost, fit for intended major, and school preferences. Include exactly what the student needs to get in. "
            'JSON shape: {"universities":[{"name":"...","country":"...","annual_cost":"...",'
            '"academic_rating":"e.g. 9/10","gpa":"typical GPA needed, e.g. 3.8+",'
            '"sat":"typical SAT/ACT needed or local equivalent (test-optional note if applicable)",'
            '"acceptance_rate":"e.g. 12%","requirements":["other admission needs: essays, letters, portfolio, interviews"],'
            '"value_note":"why it is a good price/quality pick",'
            '"strength":"why strong for this field",'
            '"fit":"safety|match|reach|null"}]}'},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=2800))


@app.post("/api/classes")
async def classes(req: ClassesReq):
    who = STAGE_GUIDE.get(req.stage or "highschool", STAGE_GUIDE["highschool"])
    target = req.career or req.field
    msgs = [
        {"role": "system", "content":
            "You are an exhaustive academic advisor who recommends EVERY course that could benefit "
            "a student pursuing a given career — including obvious core courses AND surprising, "
            "cross-disciplinary ones. For every single course you must explain exactly why it helps "
            "with the student's target career. Return ONLY JSON."},
        {"role": "user", "content":
            f"Student is {who}\nField: {req.field}. Target career: {target}.\n\n"
            "List EVERY course that could benefit this student — be exhaustive and think creatively. "
            "Include the obvious core classes AND unexpected ones from other disciplines that build "
            "transferable skills (e.g. a future doctor benefits from public speaking, statistics, "
            "psychology, economics). "
            "For EVERY course write a 'note' explaining specifically why it helps with the target career — "
            "never leave note blank. Include as many courses as possible in each category.\n"
            "Split into four groups:\n"
            "- core: foundational classes directly in the field\n"
            "- ap: AP courses (prefix each name with 'AP')\n"
            "- ib: IB courses (prefix each name with 'IB')\n"
            "- electives: ANY other class — including ones from art, business, tech, social sciences, "
            "  communications, PE/health — that builds a useful skill for this career\n\n"
            "JSON shape: "
            '{"core":[{"name":"...","note":"why this helps with ' + target + '"}],'
            '"ap":[{"name":"AP ...","note":"why this helps"}],'
            '"ib":[{"name":"IB ...","note":"why this helps"}],'
            '"electives":[{"name":"...","note":"why this helps even if it seems unrelated"}]}'},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=3600))


@app.post("/api/majors")
async def majors(req: MajorsReq):
    msgs = [
        {"role": "system", "content":
            "You list academic programs/majors offered by a university. Return ONLY JSON."},
        {"role": "user", "content":
            f'List the majors / degree programs offered at "{req.university}". '
            "Group by school/faculty where possible. Be thorough. JSON shape: "
            '{"university":"...","schools":[{"school":"...","majors":["...","..."]}]}'},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=2400))


@app.post("/api/opportunities")
async def opportunities(req: OppReq):
    who = STAGE_GUIDE.get(req.stage, STAGE_GUIDE["highschool"])
    target = req.career or req.field
    msgs = [
        {"role": "system", "content":
            "You are an exhaustive opportunity advisor for students. You list EVERY club, program, "
            "competition, internship, volunteering role, or activity that could benefit a student — "
            "including ones that seem only tangentially related — and for each you explain exactly "
            "why it benefits their target career. Use real program names and real URLs where possible; "
            "otherwise use a descriptive Google search URL. Return ONLY JSON."},
        {"role": "user", "content":
            f"Student is {who}\nField: {req.field}. Target career: {target}.\n\n"
            "Provide two things:\n\n"
            "1. need_to_know: A comprehensive list of everything this student should be doing, building, "
            "or achieving at their current stage to progress toward this career. Be specific and actionable.\n\n"
            "2. groups: EXHAUSTIVE list of opportunities across as many categories as possible. "
            "Think broadly — include obvious ones AND surprising cross-disciplinary ones "
            "(e.g. a future engineer joining a debate club to build client communication skills; "
            "a future doctor doing a business program to understand healthcare administration). "
            "For EVERY item include a 'why' field that explains specifically how this opportunity "
            "benefits the student's target career — even if it seems off-topic.\n\n"
            "Categories to include (include ALL that are relevant to the stage, plus any others you think of):\n"
            "Clubs & Organizations, Competitions & Awards, Volunteering, Research & Internships, "
            "Online Courses & Certifications, Summer Programs, Leadership Roles, "
            "Cross-disciplinary Activities (arts/business/sports that build transferable skills).\n\n"
            'JSON shape: {"need_to_know":["specific actionable item..."],'
            '"groups":[{"category":"Category name","items":['
            '{"name":"...","desc":"one-line description + why it helps with ' + target + '","url":"real URL or google search URL"}]}]}'},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=4000))


class SalaryReq(BaseModel):
    field: str
    career: str = ""
    stage: str = "highschool"

@app.post("/api/salary")
async def salary(req: SalaryReq):
    focus = f" focused on the role of {req.career}" if req.career else ""
    msgs = [
        {"role": "system", "content": "You are a compensation data expert. Return ONLY JSON."},
        {"role": "user", "content":
            f"Provide real US salary ranges for the top 7 careers in {req.field}{focus}.\n"
            "Include entry-level, mid-career, and senior salaries in USD, plus BLS job growth outlook.\n"
            "Also provide an overall field outlook summary.\n"
            'JSON shape: {"field_outlook":{"growth":"e.g. +13% by 2033","jobs":"e.g. 40,000","note":"one-sentence field outlook summary"},'
            '"careers":[{"title":"...","entry":"$X–$Y k","mid":"$X–$Y k","senior":"$X–$Y k",'
            '"growth":"X% (faster/slower than avg)","note":"one-line context about this specific role"}]}'},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=1200))


class SkillsReq(BaseModel):
    field: str
    career: str = ""
    stage: str = "highschool"

@app.post("/api/skills")
async def skills(req: SkillsReq):
    focus = f" targeting the role of {req.career}" if req.career else ""
    who = STAGE_GUIDE.get(req.stage, STAGE_GUIDE["highschool"])
    msgs = [
        {"role": "system", "content": "You are a skills and career development advisor. Return ONLY JSON."},
        {"role": "user", "content":
            f"List the most important skills to build for {req.field}{focus}. Student is {who}.\n"
            "Cover technical skills, soft skills, industry tools/software, and valuable certifications.\n"
            "For every certification include the direct website URL of the certifying body.\n"
            'JSON shape: {"technical":["skill..."],"soft":["skill..."],'
            '"tools":[{"name":"...","note":"what it is / why it matters","url":"direct website URL"}],'
            '"certifications":[{"name":"...","org":"...","note":"when to pursue it","url":"direct URL to certification page"}]}'},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=1400))


class ScholarshipReq(BaseModel):
    field: str
    stage: str = "highschool"

@app.post("/api/scholarships")
async def scholarships(req: ScholarshipReq):
    who = STAGE_GUIDE.get(req.stage, STAGE_GUIDE["highschool"])
    msgs = [
        {"role": "system", "content": "You are a financial aid expert. Return ONLY JSON."},
        {"role": "user", "content":
            f"List 10 real scholarships, grants, or fellowships for students in {req.field}. Student is {who}.\n"
            "Include national and field-specific awards. Use real names and real URLs.\n"
            'JSON shape: {"scholarships":[{"name":"...","amount":"...","org":"...","eligibility":"one-line",'
            '"deadline":"typical deadline or Rolling","url":"real URL"}]}'},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=1600))


class RoadmapReq(BaseModel):
    field: str
    career: str = ""
    stage: str = "highschool"
    age: int = 16

@app.post("/api/roadmap")
async def roadmap(req: RoadmapReq):
    focus = f" aiming to become a {req.career}" if req.career else ""
    who = STAGE_GUIDE.get(req.stage, STAGE_GUIDE["highschool"])
    msgs = [
        {"role": "system", "content": "You are a career roadmap advisor for students. Return ONLY JSON."},
        {"role": "user", "content":
            f"Create a detailed step-by-step roadmap to break into {req.field}{focus}. Student is {who} (age {req.age}).\n"
            "Cover all life stages from current through early career. Be specific and actionable per phase.\n"
            "For each phase include 2-3 real resource URLs (websites, platforms, or programs) that directly help with that phase's actions.\n"
            'JSON shape: {"steps":[{"phase":"Middle School | High School | College | Early Career | Mid Career",'
            '"title":"short phase title","actions":["specific action 1","specific action 2",...],'
            '"resources":[{"label":"website name","url":"https://..."}]}]}'},
    ]
    return parse_json(await groq_chat(msgs, json_mode=True, max_tokens=1800))


VISION_EXTRACT = ("Extract ALL readable text from this document or resume image, "
                  "preserving structure. Return the raw text only.")

RESUME_SYSTEM = (
    "You analyze a student resume. Return ONLY valid JSON — no prose outside the JSON object.\n"
    "Fill each field EXACTLY as described below:\n"
    '{\n'
    '  "summary": "2-3 sentence overview of the candidate",\n'
    '  "strengths": ["POSITIVE things only — what the resume does well, standout experiences, impressive achievements. Do NOT put weaknesses or gaps here."],\n'
    '  "weaknesses": ["NEGATIVE things only — what the resume is missing, skills that are weak or absent, areas needing improvement. Do NOT put strengths here."],\n'
    '  "skills": ["technical and soft skills explicitly shown in the resume"],\n'
    '  "experience": ["each job, internship, or project summarised in one line"],\n'
    '  "suggested_fields": ["fields of study or work that fit this resume"],\n'
    '  "suggested_careers": ["specific job titles that fit this resume"],\n'
    '  "gaps": ["concrete certifications, projects, or experiences to add next"]\n'
    '}'
)


@app.post("/api/scan")
async def scan(file: UploadFile = File(...)):
    name = (file.filename or "file").lower()
    ext = name.rsplit(".", 1)[-1] if "." in name else ""
    data = await file.read()
    text = ""

    if ext == "txt":
        text = data.decode("utf-8", "ignore")
    elif ext == "pdf":
        from pypdf import PdfReader
        reader = PdfReader(io.BytesIO(data))
        text = "\n".join((p.extract_text() or "") for p in reader.pages)
        if len(text.strip()) < 30:
            raise HTTPException(422, "This PDF looks scanned (no embedded text). "
                                     "Export a JPG/PNG of it and upload that for vision OCR.")
    elif ext in ("jpg", "jpeg", "png", "webp", "gif"):
        b64 = base64.b64encode(data).decode()
        mime = "jpeg" if ext == "jpg" else ext
        content = [
            {"type": "text", "text": VISION_EXTRACT},
            {"type": "image_url", "image_url": {"url": f"data:image/{mime};base64,{b64}"}},
        ]
        text = await groq_chat([{"role": "user", "content": content}],
                               model=VISION_MODEL, max_tokens=2000)
    else:
        raise HTTPException(400, f"Unsupported file type: .{ext}. Use pdf, txt, jpg, or png.")

    # ---- redact sensitive info BEFORE it reaches the model (ClearPath-style) ----
    scrubbed = scrub_pii(text)
    pii_redacted = scrubbed != text

    analysis = parse_json(await groq_chat(
        [{"role": "system", "content": RESUME_SYSTEM},
         {"role": "user", "content": scrubbed[:12000]}],
        json_mode=True, max_tokens=1600))
    return {
        "extracted_chars": len(text),
        "pii_redacted": pii_redacted,
        "redacted_text": scrubbed[:12000],   # safe to show — PII already removed
        "analysis": analysis,
    }


@app.post("/api/chat")
async def chat(req: ChatReq):
    system = (
        "You are a helpful career advisor for students. You have access to the user's "
        "resume (already PII-redacted) and answer questions about it honestly and helpfully. "
        "Be concise — 2-4 short paragraphs max. No bullet-point walls."
    )
    if req.resume_context:
        system += f"\n\nResume content (PII redacted):\n{req.resume_context[:8000]}"
    if req.field:
        system += f"\n\nStudent's target field: {req.field}."
    if req.career:
        system += f" Target career: {req.career}."

    messages = [{"role": "system", "content": system}]
    for turn in (req.history or []):
        role = turn.get("role") if isinstance(turn, dict) else None
        content = turn.get("content") if isinstance(turn, dict) else None
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": str(content)[:2000]})
    messages.append({"role": "user", "content": req.message})

    reply = await groq_chat(messages, json_mode=False, max_tokens=600, temperature=0.5)
    return {"reply": reply}
