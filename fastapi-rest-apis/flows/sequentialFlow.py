# it takes the input for the first file right, then we gonna print the output for the first file

import sys
import subprocess
import json

# exit()
def run_python_file(file_path, arg):
    print("XYZ")
    print("FILE PATH", file_path)
    # print("ARG", arg)
    try:
        print("ARG without json", arg)
        print("ARG", json.dumps(arg))
        output = subprocess.check_output(["python", file_path, json.dumps(arg)], stderr=subprocess.STDOUT, universal_newlines=True)
        return output
    except Exception as e:
        print("Error:", e)
        return None
    
def run_sequence(files, input):
    print("FILES", files)
    print("INPUT", input)
    try:
        output = ""
        idx = 0
        for file in files:
            print(type(output))
            if("<prev>" in json.dumps(input[idx])):
                output = json.loads(output)
                # input[idx] = json.loads(input[idx])
                input[idx]['text'] = output['output']['content']['text']
            # input[idx] = json.dumps(input[idx])
            print(input[idx])
            print(f"input value {idx}", type(input[idx])) 
            output = run_python_file(f"./actions/scripts/{file}.py", input[idx])
            print(f"OP {idx}", output)
            # input = output
            idx = idx + 1
        print("OP in runSequence", output)
        return output
    except Exception as e:
        print("E", e)
        return e
    pass
