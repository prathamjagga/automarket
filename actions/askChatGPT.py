import subprocess
import json
import sys

from openai import OpenAI

print(sys.argv)

json_args = json.loads(sys.argv[1])

client = OpenAI(api_key=json_args["token"])

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": json_args['prompt']}
  ]
)

print(completion.choices[0].message.content)
