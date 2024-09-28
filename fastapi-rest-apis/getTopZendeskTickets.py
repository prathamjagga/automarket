import requests
from requests.auth import HTTPBasicAuth

def fetch_top_10_zendesk_tickets(subdomain, email, api_token):
    """
    Fetches the top 10 Zendesk tickets from the given Zendesk account.
    
    Args:
    - subdomain (str): Your Zendesk subdomain.
    - email (str): Your Zendesk email address.
    - api_token (str): Your Zendesk API token.
    
    Returns:
    - list: A list of the top 10 Zendesk tickets.
    """
    # Define the endpoint URL for fetching tickets
    url = f"https://{subdomain}.zendesk.com/api/v2/tickets.json"

    # Make the API request
    response = requests.get(url, auth=HTTPBasicAuth(f"{email}/token", api_token))

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        tickets = data.get('tickets', [])

        # Return the top 10 tickets
        return tickets[:10]
    else:
        print(f"Error: Unable to fetch tickets. Status code: {response.status_code}")
        return None

# Example usage
subdomain = 'your_subdomain'    # Replace with your Zendesk subdomain
email = 'your_email@example.com'  # Replace with your Zendesk email
api_token = 'your_api_token'     # Replace with your Zendesk API token

top_tickets = fetch_top_10_zendesk_tickets(subdomain, email, api_token)
if top_tickets:
    for ticket in top_tickets:
        print(f"Ticket ID: {ticket['id']}, Subject: {ticket['subject']}")
