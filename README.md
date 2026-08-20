# FieldFinder

**Find every career, course, and opportunity in your field.**

FieldFinder is an AI-guided career and college planner for high school students. Type in any field (architecture, marine biology, culinary arts, anything) and it maps out the careers inside it, matches universities to your actual profile, and builds a roadmap to get there.

## Who we built this for

High school students who are staring at a blank "what do you want to do with your life" question and have nowhere good to point it. Specifically: kids without a private college counselor, because those run $150-300 an hour and most families don't have that lying around. School counselors are stretched across hundreds of students each, so a 15-minute check-in once a semester is often all a student gets. FieldFinder is for the student who knows they like biology, or coding, or design, but has no idea what jobs actually exist in that world, what it takes to get into a school for it, or whether they can afford to.

## The barrier we're removing

Career and college guidance in the US is gatekept by money and time. Three problems stack on top of each other:

1. **Nobody tells you what's actually in a field.** A student who likes "science" hears about being a doctor and stops there, never learning that biomedical engineering, epidemiology, or science policy exist and might fit them better.
2. **University matching is manual and scattered.** Figuring out which schools fit your GPA, test scores, budget, and extracurriculars means digging through a dozen different sites and forums, one school at a time.
3. **Turning a resume into next steps takes expertise most 16-year-olds don't have.** Knowing what's missing, what to build, and what to fix requires someone experienced looking at it, which loops back to problem #1: that person costs money.

FieldFinder replaces all three with one free, AI-guided flow.

## Features

- **Field and career mapping**: maps every career inside a typed field, with the skills each one needs.
- **University matching**: ranks universities worldwide against a student's real profile (GPA, SAT/ACT, budget, region, extracurriculars, awards, course rigor, recommendation strength, hooks, essay themes, intended major, school size).
- **Majors lookup**: every major offered at a given university.
- **Salary, skills, and scholarships**: real salary ranges, in-demand skills, and scholarships for the field.
- **Personalized roadmap**: a step-by-step plan from where the student is now to getting into that field.
- **Resume scanning and chat**: upload a resume/PDF/image, get structured info extracted, and chat with the AI about how to strengthen it.

## Tech stack

- **Frontend**: static HTML/CSS/JS (`index.html`, `code.js`, `style.css`), no build step.
- **Backend**: FastAPI (`backend/main.py`), calling Groq's Llama models for every dynamic feature.
- **Reliability**: multiple Groq API keys rotated round-robin with automatic failover on rate limits/server errors, so the app doesn't die under load.

## Setup

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Paste your Groq API keys into `backend/.env`:

```
LLM_API_KEY_1=gsk_...
LLM_API_KEY_2=gsk_...
LLM_API_KEY_3=gsk_...
```

Run it:

```bash
uvicorn main:app --reload --port 8000
```

Check it worked: open `http://localhost:8000/health`, should show `keys_loaded: 3`.

### Frontend

The frontend is plain static files and talks to the backend at `http://localhost:8000`. Serve the project root with any static server, for example:

```bash
python3 -m http.server 5500
```

Then open `http://localhost:5500` with the backend already running.

## API

| Method | Path                    | Purpose                                      |
|--------|-------------------------|-----------------------------------------------|
| POST   | `/api/fields`           | Every field a student can go into             |
| POST   | `/api/interpret-field`  | Normalize a free-typed field                  |
| POST   | `/api/careers`          | Careers + skills inside a field               |
| POST   | `/api/universities`     | Matched universities weighing fit + price     |
| POST   | `/api/majors`           | Majors offered at a given university          |
| POST   | `/api/classes`          | Suggested AP/IB classes                       |
| POST   | `/api/opportunities`    | Personalized opportunities                    |
| POST   | `/api/salary`           | Salary ranges for a field                     |
| POST   | `/api/skills`           | In-demand skills for a field                  |
| POST   | `/api/scholarships`     | Scholarships for a field                      |
| POST   | `/api/roadmap`          | Step-by-step roadmap into a field             |
| POST   | `/api/scan`             | Extract structured info from a resume/PDF/image |
| POST   | `/api/chat`             | Chat about the extracted resume               |

## How it works, end to end

A student types in a field. The app calls Groq/Llama to map out careers and required skills. They fill in their real stats and profile, and the backend ranks universities on fit and affordability, pulling in majors, salary data, skills, and scholarships along the way. From there it generates a personalized roadmap, and a student can upload a resume to get structured feedback through a built-in chat, all backed by a FastAPI service that rotates across multiple API keys so it keeps working under load.

The result: a student with no counselor and no budget gets the same depth of guidance that used to cost hundreds of dollars an hour, just by typing what they're curious about.
