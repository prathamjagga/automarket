# it takes the input for the first file right, then we gonna print the output for the first file

import sys
import subprocess
import json
import importlib

# exit()
def run_python_file(file, arg):
    print("XYZ")
    print("FILE PATH", file)
    # print("ARG", arg)
    try:
        print("ARG without json", arg)
        print("ARG", json.dumps(arg))
        output = importlib.import_module("actions.scripts."+file).get_output(arg)
        print("REA")
        return output
    except Exception as e:
        print("Error:", e)
        return json.dumps({"output":{"type":"error", "content":str(e)}})
    
def run_sequence(files, inputs):
    print("FILES", files)
    print("INPUT", inputs)
    try:
        output = ""
        idx = 0
        for file in files:
            if idx != 0:
                print(f"INPUT {idx}", inputs[idx])
                keys = inputs[idx].keys()
                values = inputs[idx].values()
                for key, val in zip(keys, values):
                    if "<prev" in val:
                        # print(type(json.loads(output)))
                        output = dict(json.loads(output))
                        inputs[idx][key] = output['output']['content'][str(val[6:(len(val)-1)])]
                # pass
            output = run_python_file(file, inputs[idx])
            print(f"OP {idx}", output)
            idx = idx + 1
        print("OP in runSequence", output)
        return output
    except Exception as e:
        print("E", e)
        return e
    pass
