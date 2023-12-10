from typing import Annotated, List
from fastapi import FastAPI
from pydantic import UUID4, BaseModel
import uuid
import os
import httpx
import asyncio

class InitialisedApplication(BaseModel):
    application_id: UUID4 | Annotated[str, UUID4]

class AccountingSoftwareProvider(BaseModel):
    provider_name: str


class AccountingDataRow(BaseModel):
    year: int 
    month: int
    profitOrLoss: float
    assetsValue: float

class DEForm(BaseModel):
    name: UUID4
    yearEstablished: int
    summaryProfitOrLoss: float
    preAssessment: int

async def request(provider_url):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(provider_url)
            return response.json()
    except:
        return f"Unable to connect to external accounting software"

app = FastAPI()

@app.post("/initialise", response_model=InitialisedApplication)
async def initialise_application():
    return {"application_id": uuid.uuid4()}

@app.post("/outcome")
async def request_outcome(application:DEForm):
    return {"outcome": "approved"}

@app.post("/balances") 
async def request_balances(provider:AccountingSoftwareProvider) -> List[AccountingDataRow]:
    try: 
        if provider.provider_name=='xero':
            provider_url = os.getenv("XERO_URL") or "http://localhost:8081/xero/balances"
            return await request(provider_url)
        elif provider.provider_name=='myob':
            provider_url = os.getenv("XERO_URL") or "http://localhost:8081/myob/balances"
            return await request(provider_url)
        else:
            return [
                    {
                        "year": 2020,
                        "month": 12,
                        "profitOrLoss": 250000,
                        "assetsValue": 1234
                    },
                    {
                        "year": 2020,
                        "month": 11,
                        "profitOrLoss": 1150,
                        "assetsValue": 5789
                    },
                    {
                        "year": 2020,
                        "month": 10,
                        "profitOrLoss": 2500,
                        "assetsValue": 22345
                    },
                    {
                        "year": 2020,
                        "month": 9,
                        "profitOrLoss": -187000,
                        "assetsValue": 223452
                    }
                ]
    except:
        return f"Unsupported request type"

