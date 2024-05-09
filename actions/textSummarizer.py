import requests
import sys
import json

try:
	input_json = json.loads(sys.argv[1])
	text = input_json["text"]
	# TODO: use some api for summarization
	print({"output":{"type":"text", "content":"This is the summarized text"}})
except Exception as e:
	print({"output":{"type":"error", "content":e}})
