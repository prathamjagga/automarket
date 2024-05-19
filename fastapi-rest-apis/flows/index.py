from db.index import runSQL
from flows.sequentialFlow import run_sequence

def runFlow(nodes, input):
    try:
        OP = run_sequence(nodes, input)
        return OP
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
    
