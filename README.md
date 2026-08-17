# FieldFinder

**Find every career, course, and opportunity in your field.**

## Who we built this for

High school students who are staring at a blank "what do you want to do with your life" question and have nowhere good to point it. Specifically: kids without a private college counselor, because those run $150-300 an hour and most families don't have that lying around. School counselors are stretched across hundreds of students each, so a 15-minute check-in once a semester is often all a student gets. FieldFinder is for the student who knows they like biology, or coding, or design, but has no idea what jobs actually exist in that world, what it takes to get into a school for it, or whether they can afford to.

## The barrier we're removing

Career and college guidance in the US is gatekept by money and time. Three problems stack on top of each other:

1. **Nobody tells you what's actually in a field.** A student who likes "science" hears about being a doctor and stops there, never learning that biomedical engineering, epidemiology, or science policy exist and might fit them better.
2. **University matching is manual and scattered.** Figuring out which schools fit your GPA, test scores, budget, and extracurriculars means digging through a dozen different sites and forums, one school at a time.
3. **Turning a resume into next steps takes expertise most 16-year-olds don't have.** Knowing what's missing, what to build, and what to fix requires someone experienced looking at it, which loops back to problem #1: that person costs money.

FieldFinder replaces all three with one free, AI-guided flow.

## How it works

A student types in any field, from architecture to marine biology to culinary arts, and the app takes it from there:

- **Field and career mapping**: Groq/Llama maps every career that lives inside the typed field, along with the skills each one needs, so students see the full menu instead of the three jobs they've already heard of.
- **University matching**: The student fills in their real profile (GPA, SAT/ACT, budget, region, extracurriculars, awards, course rigor, recommendation strength, hooks, essay themes, intended major, school size preference) and gets back universities worldwide ranked on actual fit, weighing admission odds against academics and price, plus the majors each one offers.
- **Salary, skills, and scholarships**: Real salary ranges and in-demand skills for the field, plus scholarships worth applying for.
- **A personalized roadmap**: A step-by-step plan for where to go from right now in school to get into that field.
- **Resume scanning and chat**: Upload a resume, PDF, or even a photo of one, and the AI extracts the structured content and chats with the student about how to strengthen it.

Under the hood, a FastAPI backend calls Groq's Llama models for every dynamic feature, rotating across multiple API keys with automatic failover so the app stays up under load instead of stalling on a single rate limit.

The result: a student with no counselor and no budget gets the same depth of guidance that used to cost hundreds of dollars an hour, just by typing what they're curious about.
