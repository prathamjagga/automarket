import subprocess
import json


import uvicorn
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request


import db.index as DB
from db.index import session, runSQL
from actions.index import addAction, getAllActions, getAction, getActionOutputs
from flows.index import addFlowToDB, runFlow, saveFlowStr, getStrFlows

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

@app.get("/action/{name}")
def getActionAPI(name):
    result = getAction(name)
    json_result = []
    for val in result:
        json_result.append({"name":val[1], "type":val[2]})
    return {"inputs":json_result}
    print(result)
    return None
@app.get("/outputs/{action_name}")
def getActionOutputAPI(action_name):
    print("ACTION_NAME", action_name)
    result = getActionOutputs(action_name)
    json_result = []
    for val in result:
        json_result.append({"name":val[1], "type":val[2]})
    return {"outputs":json_result}
@app.get("/actions")
def getActions():
    result = getAllActions()
    print(result)
    json_res = []
    for val in result:
        json_res.append({"action_name":val[0], "input_name": val[1], "input_type":val[2]})
    return json_res

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
    print("RUN")
    request = await request.json()
    print("REQ", request)
    flow_input = request
    OP =  runFlow(flow_input['nodes'], flow_input['input'])
    # print("OP", OP)
    return json.loads(OP)

@app.post("/save-flow")
async def saveFlowAPI(request: Request):
    try:
        request = await request.json()
        return saveFlowStr(request['nodes'], request['input'], request['name'])
    except:
        return False

    # response = requests.post(
    #     f"https://api.stability.ai/v2beta/stable-image/generate/ultra",
    #     headers={
    #         "authorization": f"Bearer ",
    #         "accept": "image/*"
    #     },
    #     files={"none": ''},
    #     data={
    #         "prompt": "Lighthouse on a cliff overlooking the ocean",
    #         "output_format": "webp",
    #     },
    # )

    # return response.content
# if __name__ == "main":
#     uvicorn.run(app, host="127.0.0.1", port=8000)


@app.get("/apps")
async def getAllFlowsAPI():
    return getStrFlows()


@app.post("/run-sql")
async def runSQLAPI(request: Request):
    request = await request.json()
    runSQL(request['query'])
    return 1