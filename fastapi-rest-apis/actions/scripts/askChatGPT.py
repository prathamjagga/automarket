import subprocess
import json
import sys
import google.generativeai as genai

def get_output(json_args):
  try:
      genai.configure(api_key="AIzaSyCBajXtMaSAm-cOWlS78pqOyOJ9t41S5hY")
      model = genai.GenerativeModel("gemini-1.5-flash")
      response = model.generate_content(json_args["prompt"])
      return(json.dumps({"output": {"type":"json", "content":{"text":response.text}}}))
  except Exception as e:
      return(json.dumps({"output": {"type": "error", "content": e}}))
