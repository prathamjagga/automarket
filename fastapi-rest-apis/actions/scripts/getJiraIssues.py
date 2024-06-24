def get_output():
    import requests
    from requests.auth import HTTPBasicAuth
    import json

    # Replace these variables with your own Jira account details
    email = 'your_email@example.com'
    api_token = 'your_api_token'
    jira_url = 'https://your_jira_instance.atlassian.net'
    account_id = 'user_account_id'  # This is the account ID of the user whose issues you want to retrieve

    # Construct the API URL
    jql_query = f'assignee={account_id}'
    api_url = f'{jira_url}/rest/api/2/search?jql={jql_query}'

    # Make the request to the Jira API
    response = requests.get(api_url, auth=HTTPBasicAuth(email, api_token), headers={'Accept': 'application/json'})

    # Check if the request was successful
    if response.status_code == 200:
        issues = response.json()
        print(json.dumps(issues, indent=4))
    else:
        print(f"Failed to fetch issues: {response.status_code} - {response.text}")
