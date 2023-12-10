from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel

class DEForm(BaseModel):
    name: str
    yearEstablished: int
    summaryProfitOrLoss: float
    preAssessment: int

app = FastAPI()

@app.post("/")
async def root(application:DEForm):
    return {"outcome": "approved"}
