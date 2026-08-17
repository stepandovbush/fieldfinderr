# Launchpad backend (Groq / Llama)

FastAPI service that powers the dynamic AI features: every field, careers,
global universities, majors, and resume/document scanning. Uses 3 Groq API
keys in round-robin with automatic failover.

## Setup

```bash
cd Youthxcode/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Then paste your 3 Groq keys into `.env` (already created, gitignored):

```
LLM_API_KEY_1=gsk_...
LLM_API_KEY_2=gsk_...
LLM_API_KEY_3=gsk_...
```

## Run

```bash
uvicorn main:app --reload --port 8000
```

Check it: open http://localhost:8000/health → should show `keys_loaded: 3`.

## Endpoints

| Method | Path                | Body                                          |
|--------|---------------------|-----------------------------------------------|
| POST   | `/api/fields`       | `{ "query": "optional" }`                     |
| POST   | `/api/careers`      | `{ "field": "medicine", "age": 16 }`          |
| POST   | `/api/universities` | `{ "field": "...", "budget": "...", "gpa": "...", "countries": "global" }` |
| POST   | `/api/majors`       | `{ "university": "MIT" }`                      |
| POST   | `/api/scan`         | multipart file (pdf / txt / jpg / png)        |

## Note on models

Model names are in `.env` (`GROQ_TEXT_MODEL`, `GROQ_VISION_MODEL`). Groq
occasionally renames models — if you get a model-not-found error, update those
values to a current Groq model id.
