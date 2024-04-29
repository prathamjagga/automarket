import subprocess

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return "Hello from Velocity - The soul of AutoMarket"
@app.get("/sequential_flow")
def run():
    # TO DO: extract actions from request here
    output = subprocess.check_output(["python", "../sequentialFlow.py", "../actions/readFile.py", "../actions/textSummarizer.py", "https://www.dwsamplefiles.com/?dl_id=176"])
    return output