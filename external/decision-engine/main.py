from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel

class BusinessDetails(BaseModel):
    name: str
    yearEstablished: int
    summaryProfitOrLoss: float
class DEForm(BaseModel):
    businessDetails: BusinessDetails
    preAssessment: int

app = FastAPI()

@app.post("/")
async def root(application:DEForm):
    return {"outcome": "approved"}
