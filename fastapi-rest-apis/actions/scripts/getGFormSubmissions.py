import subprocess
import json
import sys
from openai import OpenAI
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

def get_output(json_args):
  try:
      ## get Typeform submissions

      return(json.dumps({"output": {"type":"json", "content":{"text":"Done."}}}))
  except Exception as e:
      return(json.dumps({"output": {"type": "error", "content": e}}))

def get_google_form_submissions(access_token, sheet_url):
    # Extract the spreadsheet ID from the URL
    spreadsheet_id = sheet_url.split('/')[5]
    
    # Use the access token to authenticate
    creds = Credentials(token=access_token)
    service = build('sheets', 'v4', credentials=creds)
    
    # Specify the range to retrieve all responses
    sheet_range = 'Form Responses 1'  # This is the default sheet name for responses
    
    try:
        # Fetching the response data from the Google Sheet
        result = service.spreadsheets().values().get(spreadsheetId=spreadsheet_id, range=sheet_range).execute()
        rows = result.get('values', [])
        
        if not rows:
            print("No data found.")
            return None
        else:
            return rows
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# Usage example:
access_token = ''
sheet_url = 'https://docs.google.com/spreadsheets/d/your_spreadsheet_id_here/edit#gid=0'
submissions = get_google_form_submissions(access_token, sheet_url)

if submissions:
    for row in submissions:
        print(row)
