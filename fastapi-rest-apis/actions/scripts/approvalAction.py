import sys
import json

try:
    input_dict = json.loads(sys.argv[1])
    if input_dict["flag"]=="yes":
        print(json.dumps({"output": {"type": "boolean", "content": True}}))
    else:
        print(json.dumps({"output": {"type": "boolean", "content": False}}))
except Exception as e:
        print(json.dumps({"output": {"type": "error", "content": e}}))