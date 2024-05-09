import requests
import sys
import json

try:
    input_data = json.loads(sys.argv[1])
    api_key = input_data["api_key"]
    user_URI = input_data["user_URI"]
    events = requests.get("https://api.calendly.com/scheduled_events?user="+user_URI, headers={"Authorization": "Bearer " + api_key})
    print({ "output": {"type":"json", "content":events.json()}})
          
except Exception as e:
    print({"output": {"type": "error", "content": e}})
