import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Define the scope
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']

def add_row(sheet_name, row_data):
    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
    client = gspread.authorize(creds)
    sheet = client.open(sheet_name).sheet1
    sheet.append_row(row_data)
    print("New row added successfully.")

def get_all_rows(sheet_name):

    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
    client = gspread.authorize(creds)

    sheet = client.open(sheet_name).sheet1

    rows = sheet.get_all_records()
    return rows

sheet_name = input("Enter the name of the Google Sheet: ")

new_row_data = ['John', 'Doe', 'john.doe@example.com']
add_row(sheet_name, new_row_data)

all_rows = get_all_rows(sheet_name)
print("All rows in the sheet:")
print(all_rows)
