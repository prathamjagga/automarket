import subprocess
from fastapi import FastAPI
import json

import db.index as DB
from db.index import session
from actions.index import addAction, getAllActions
from flows.index import addFlowToDB, runFlow

from models import ActionsContent, FlowsContent, RunFlowInput

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
    result = getAllActions()
    json_result = {}
    idx = 0
    for val in result:
        json_result[idx] = {"name":val[0], "input_type":val[1], "output_type": val[2]}
        idx = idx+1
    return json_result

@app.get("/db-status")
def dbStatus():
    return DB.getDBStatus()

@app.post("/add-action")
def addAnAction(actions_content: ActionsContent):
    return addAction(actions_content.name, actions_content.input_type, actions_content.output_type)

@app.post("/add-flow")
def addFlow(flows_content: FlowsContent):
    return addFlowToDB(flows_content.nodes)

@app.post("/run-flow")
def run_flow(flow_input: RunFlowInput):
    return runFlow(flow_input.nodes, flow_input.input)