import sys
import json

try:
    input_dict = json.loads(sys.argv[1])
    if input_dict["flag"]=="yes":
        print({"output": {"type": "boolean", "content": True}})
    else:
        print({"output": {"type": "boolean", "content": False}})
except Exception as e:
        print({"output": {"type": "error", "content": e}})