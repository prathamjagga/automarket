import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Define the scope
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']

def add_row(sheet_name, row_data):
    # Authenticate with Google Sheets API using service account credentials
    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
    client = gspread.authorize(creds)

    # Open the Google Sheet
    sheet = client.open(sheet_name).sheet1

    # Append a new row to the sheet
    sheet.append_row(row_data)
    print("New row added successfully.")

def get_all_rows(sheet_name):
    # Authenticate with Google Sheets API using service account credentials
    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
    client = gspread.authorize(creds)

    # Open the Google Sheet
    sheet = client.open(sheet_name).sheet1

    # Get all rows from the sheet
    rows = sheet.get_all_records()
    return rows

sheet_name = input("Enter the name of the Google Sheet: ")

# Example of adding a new row
new_row_data = ['John', 'Doe', 'john.doe@example.com']
add_row(sheet_name, new_row_data)

# Example of retrieving all rows
all_rows = get_all_rows(sheet_name)
print("All rows in the sheet:")
print(all_rows)
