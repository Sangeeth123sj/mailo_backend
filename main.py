from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import cohere
from pydantic import BaseModel
co = cohere.Client('M8A9xH7mdqfu9qA1fKVi1jsTYlADKDNRO6df7Lxv') # This is your trial API key
app = FastAPI()



origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:8000",
    "https://example.com",
    "https://subdomain.example.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

class MailRequest(BaseModel):
    prompt: str


@app.post("/generate_mail")
async def generate_mail(request: MailRequest):
    try:
        response = co.generate(
            model='command-xlarge-nightly',
            prompt=request.prompt,
            max_tokens=300,
            temperature=0.9,
            k=0,
            p=0.75,
            frequency_penalty=0,
            presence_penalty=0,
            stop_sequences=[],
            return_likelihoods='NONE'
        )
        print(f"Prediction: {response.generations[0].text}")
        return {"success": True, "message": response.generations[0].text}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
