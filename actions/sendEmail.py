import requests

def send_email_via_mailchimp(api_key, audience_id, email, content):
    url = f"https://us1.api.mailchimp.com/3.0/lists/{audience_id}/members"
    headers = {
        "Authorization": f"Basic {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
            "FNAME": "Subscriber",
            "LNAME": "Name"
        }
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            print("Email sent successfully!")
        else:
            print("Failed to send email. Status code:", response.status_code)
    except Exception as e:
        print("Error sending email:", e)

if __name__ == "__main__":
    # Specify Mailchimp API key and audience ID
    api_key = input("Enter your Mailchimp API key: ")
    audience_id = input("Enter your Mailchimp audience ID: ")

    # Specify recipient email and email content
    email = input("Enter recipient email address: ")
    content = input("Enter email content: ")

    # Send the email
    send_email_via_mailchimp(api_key, audience_id, email, content)
