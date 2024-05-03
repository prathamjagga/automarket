import subprocess
from fastapi import FastAPI

import db.index as DB

app = FastAPI()

@app.get("/")
def root():
    return "Hello from Velocity - The soul of AutoMarket"

@app.get("/sequential_flow")
def run():
    # TO DO: extract actions from request here
    output = subprocess.check_output(["python", "../sequentialFlow.py", "../actions/readFile.py", "../actions/textSummarizer.py", "https://www.dwsamplefiles.com/?dl_id=176"])
    return output

@app.get("/actions")
def getActions():
    return 1

@app.get("/db-status")
def dbStatus():
    return DB.getDBStatus()