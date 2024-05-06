# it takes the input for the first file right, then we gonna print the output for the first file

import sys
import subprocess

# exit()
def run_python_file(file_path, arg):
    try:
        output = subprocess.check_output(["python", file_path, arg], stderr=subprocess.STDOUT, universal_newlines=True)
        return output
    except subprocess.CalledProcessError as e:
        print("Error:", e.output)
        return None
    
def run_sequence(files, input):
    try:
        output = ""
        for file in files:
            output = run_python_file(f"../{file}", input)
            input = output
        return output
    except Exception as e:
        pass
    pass
