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

def get_output(input_json):
	try:
		print(type(input_json))
		text = input_json["text"]
		return(json.dumps({"output":{"type":"text", "content": text[:100]}})) ## TODO : replace content by summarize(text) after subscription
	except Exception as e:
		return (json.dumps({"output":{"type":"error", "content":str(e)}}))
