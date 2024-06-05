import subprocess
import json
import sys
from openai import OpenAI

def get_output(json_args):
  try:
      client = OpenAI(api_key=json_args["token"])
      completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
          {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
          {"role": "user", "content": json_args['prompt']}
        ]
      )
      return(json.dumps({"output": {"type":"text", "content":completion.choices[0].message.content}}))
  except Exception as e:
      return(json.dumps({"output": {"type": "error", "content": e}}))

