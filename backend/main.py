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

class LoanApplicationForm(BaseModel):
    id: UUID4
    name: str
    yearEstablished: int
    loanAmountRequested:float
    preAssessment: int
    balances: List[AccountingDataRow]

async def request(provider_url):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(provider_url)
            return response.json()
    except:
        return f"Unable to connect to external accounting software"

def calculate_total_revenue(balances:List[AccountingDataRow]):
    total_revenue=0
    for row in balances:
        total_revenue+=row.profitOrLoss
    return total_revenue 

def calculate_avg_assets(balances:List[AccountingDataRow]):
    total_months = len(balances)
    total_assets = 0
    for row in balances:
        total_assets+=row.assetsValue
    return total_assets/total_months

def calculate_preAssessment(loanAmountRequested:float, total_revenue:float, avg_assets: float):
    preAssessment = 20
    if total_revenue > 0:
        preAssessment = 60
    if avg_assets > loanAmountRequested:
        preAssessment = 100
    return preAssessment


app = FastAPI()

@app.post("/initialise", response_model=InitialisedApplication)
async def initialise_application():
    return {"application_id": uuid.uuid4()}

@app.post("/outcome")
async def request_outcome(application:LoanApplicationForm):
    revenue = calculate_total_revenue(application.balances)
    avg_assets = calculate_avg_assets(application.balances)
    preAssessment = calculate_preAssessment(application.loanAmountRequested, revenue, avg_assets)
    return {"outcome": "approved", "revenue":revenue, "avg_assets": avg_assets, "preAssessment": preAssessment}

@app.post("/balances") 
async def request_balances(provider:AccountingSoftwareProvider) -> List[AccountingDataRow]:
    try: 
        if provider.provider_name=='xero':
            provider_url = "http://localhost:8081/xero/balances" if os.getenv("XERO_URL") is None else os.getenv("XERO_URL")
            return await request(provider_url)
        elif provider.provider_name=='myob':
            provider_url = "http://localhost:8081/myob/balances" if os.getenv("MYOB_URL") is None else os.getenv("MYOB_URL")
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

