import requests

api_key = ""

form_id = "HBFYI7xt"

response = requests.get(f"https://api.typeform.com/forms/{form_id}/responses", headers={"Authorization": "Bearer " + api_key})

print(response.json())