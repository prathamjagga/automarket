import sys
import json

def find_occurrences(text, keyword):
    occurrences = text.lower().count(keyword.lower())
    return occurrences
def get_output():
    try:
        input_json = json.loads(sys.argv[1])
        text = input_json["text"]
        keyword = input_json["keyword"]
        num_occurrences = find_occurrences(text, keyword)
        print(json.dumps({"output": {"type": "text", "content": f"The keyword '{keyword}' occurs {num_occurrences} times in the text."}}))
    except Exception as e:
        print(json.dumps({"output": {"type": "error", "content": e}}))