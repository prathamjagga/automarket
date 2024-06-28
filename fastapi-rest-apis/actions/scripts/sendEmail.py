import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
import json

# Email and password configuration
sender_email = "prathamjagga123@gmail.com"
receiver_email = "vipul.kumar@cloudeq.com"
password = "yaik zgzh zrwr pylj"

# Email content
subject = "Test Email from Python"
body = "Vipul Yamunanagar Wale"

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
    json.dumps("Email(s) successfully sent!")
except Exception as e:
    json.dumps(f"Error sending email(s): {e}")
finally:
    # Quit the SMTP server
    server.quit()
