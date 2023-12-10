from typing import Annotated
from fastapi import FastAPI
from pydantic import UUID4, BaseModel
import uuid

class InitialisedApplication(BaseModel):
    application_id: UUID4 | Annotated[str, UUID4]

class DEForm(BaseModel):
    name: UUID4
    yearEstablished: int
    summaryProfitOrLoss: float
    preAssessment: int

app = FastAPI()

@app.post("/initialise", response_model=InitialisedApplication)
async def initialise_application():
    return {"application_id": uuid.uuid4()}

@app.post("/outcome")
async def request_outcome(application:DEForm):
    return {"outcome": "approved"}
