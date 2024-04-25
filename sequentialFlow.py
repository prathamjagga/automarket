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
    

argsLength = len(sys.argv)
input = sys.argv[argsLength-1]

for i in range(1, len(sys.argv)-1):
    output = run_python_file(sys.argv[i], input)
    input = output

print(output)

