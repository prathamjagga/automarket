from db.index import runSQL
from flows.sequentialFlow import run_sequence

import json

def runFlow(nodes, inputs):
    print(input)
    # exit()
    try:
        OP = run_sequence(nodes, inputs)
        return OP
    except Exception as e:
        print("ERROR", e)
        return False
    return True

def saveFlowStr(nodes, inputs, name):
    try:
        flow = {"nodes": nodes, "inputs": inputs}
        flowstr = json.dumps(flow)
        runSQL(f"INSERT INTO flow_as_str (flow_string, app_name) VALUES ('{flowstr}', '{name}')")
    except Exception as e:
        print("ERROR", e)
        return False
    return True

def addFlowToDB(nodes):
    nodesAsStr = ""
    for val in nodes:
        nodesAsStr += f"'./actions/{val}.py',"
    try:
        result = runSQL(f"INSERT INTO flows (nodes) VALUES (ARRAY[{nodesAsStr[:len(nodesAsStr)-1]}]);")
        return result
    except Exception as e:
        print("ERROR", e)
        return False
    


def getStrFlows():
    result = ""
    result_json = []
    try:
        result = runSQL("select * from flow_as_str")
        result = result.fetchall()
        for val in result:
            result_json.append({"app_name":val[2], "flow_string":val[0], "id":val[1]})
    except:
        return False
    return result_json

