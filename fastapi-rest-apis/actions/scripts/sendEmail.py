def get_output(input_json):
    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    import os
    import json

    # Email and password configuration
    sender_email = input_json["sender_email"]
    receiver_email = input_json["receiver_email"]
    password = input_json["app_password"]

    # Email content
    subject = input_json["subject"]
    body = input_json["body"]

    # Create a multipart message and set headers
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    # Add body to email
    message.attach(MIMEText(body, "plain"))

    try:
        # Log in to the SMTP server
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()  # Secure the connection
        server.login(sender_email, password)

        # Send email
        server.sendmail(sender_email, receiver_email, message.as_string())
        return (json.dumps({"output": {"type": "json", "content": {"text": "Email sent successfully!"}}}))
    except Exception as e:
        return (json.dumps({"output": {"type": "error", "content": "Error sending email."}}))
    finally:
        # Quit the SMTP server
        server.quit()
