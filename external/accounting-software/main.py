from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

class AccountingDataRow(BaseModel):
    year: int 
    month: int
    profitOrLoss: float
    assetsValue: float

sheet = [
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
app = FastAPI()

@app.get("/xero/balances", response_model=List[AccountingDataRow])
async def fetch_xero_balances():
    return sheet

@app.get("/myob/balances", response_model=List[AccountingDataRow])
async def fetch_myob_balances():
    return sheet
