# import requests
import sys
import json
import requests

def summarize(text):
	url = "https://meaningcloud-summarization-v1.p.rapidapi.com/summarization-1.0"

	querystring = {"sentences":"5","url":text}

	headers = {
		"Accept": "application/json",
		"X-RapidAPI-Key": "af74029910msh5b6e260ba57a618p19ab41jsn8be7af70ca5e",
		"X-RapidAPI-Host": "meaningcloud-summarization-v1.p.rapidapi.com"
	}

	response = requests.get(url, headers=headers, params=querystring)

	print(response.json())

try:
	# print(sys.argv[1])
	a = sys.argv[1]
	input_json = json.loads(sys.argv[1])
	text = input_json["text"]
	print(json.dumps({"output":{"type":"text", "content": text[:100]}})) ## TODO : replace content by summarize(text) after subscription
except Exception as e:
	print(json.dumps({"output":{"type":"error", "content":str(e)}}))
