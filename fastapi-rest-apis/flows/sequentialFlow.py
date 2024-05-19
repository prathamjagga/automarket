# it takes the input for the first file right, then we gonna print the output for the first file

import sys
import subprocess
import json

# exit()
def run_python_file(file_path, arg):
    print("FILE PATH", file_path)
    try:
        output = subprocess.check_output(["python", file_path, arg], stderr=subprocess.STDOUT, universal_newlines=True)
        return output
    except subprocess.CalledProcessError as e:
        print("Error:", e.output)
        return None
    
def run_sequence(files, input):
    print("FILES", files)
    print("INPUT", input)
    try:
        output = ""
        for file in files:
            output = run_python_file(f"../actions/{file}.py", json.dumps(input))
            print("OP", output)
            input = output
        print("OP in runSequence", output)
        return output
    except Exception as e:
        return e
        pass
    pass
