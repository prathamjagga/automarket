import requests
import sys

url = "https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer"

payload = {
	"url": "http://en.wikipedia.org/wiki/Automatic_summarization",
	"text": sys.argv[1],
	"sentnum": 8
}
headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": "af74029910msh5b6e260ba57a618p19ab41jsn8be7af70ca5e",
	"X-RapidAPI-Host": "textanalysis-text-summarization.p.rapidapi.com"
}

# response = requests.post(url, json=payload, headers=headers)

print("this is automatically summarized text")