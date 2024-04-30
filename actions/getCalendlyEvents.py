api_key = ""


import requests

userURI = "https://api.calendly.com/users/5e59d9c7-6579-41c4-9b9f-b73a18a6a0e3"

events = requests.get("https://api.calendly.com/scheduled_events?user="+userURI, headers={"Authorization": "Bearer " + api_key})


print(events.json())