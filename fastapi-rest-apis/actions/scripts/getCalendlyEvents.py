import requests
import sys
import json


def get_output(input_json):
    try:
        api_key = input_json["api_key"]
        user_URI = input_json["user_URI"]
        events = requests.get("https://api.calendly.com/scheduled_events?user="+user_URI, headers={"Authorization": "Bearer " + api_key})
        return(json.dumps({ "output": {"type":"json", "content":events.json()}}))
    except Exception as e:
        return(json.dumps({"output": {"type": "error", "content": str(e)}}))