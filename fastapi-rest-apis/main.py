import subprocess
import json


from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request


import db.index as DB
from db.index import session
from actions.index import addAction, getAllActions
from flows.index import addFlowToDB, runFlow

from models import ActionsContent, FlowsContent, RunFlowInput

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    result = getAllActions()
    json_result = []
    for val in result:
        json_result.append({"name":val[0], "input_type":val[1], "output_type": val[2]})
    return json_result

@app.get("/db-status")
def dbStatus():
    return DB.getDBStatus()

@app.post("/add-action")
async def addAnAction(request: Request):
    request = await request.json()
    return addAction(request['name'], request['inputs'])

@app.post("/add-flow")
async def addFlow(request: Request):
    request = await request.json()
    flows_content = request

    return addFlowToDB(flows_content['nodes'])

@app.post("/run-flow")
async def run_flow(request: Request):
    request = await request.json()
    flow_input = request
    print("FLOWS CONTENT", flow_input)
    return {"output": runFlow(flow_input['nodes'], flow_input['input'])}
