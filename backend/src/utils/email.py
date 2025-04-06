import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
import jwt
from datetime import datetime, timedelta

from src.config.settings import settings

def send_email(to_email: str, subject: str, html_content: str):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = settings.EMAILS_FROM_EMAIL
    msg['To'] = to_email
    
    html_part = MIMEText(html_content, 'html')
    msg.attach(html_part)
    
    if settings.SMTP_SSL:
        server = smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT)
    else:
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
        if settings.SMTP_TLS:
            server.starttls()
    
    server.login(settings.EMAILS_FROM_EMAIL, settings.SMTP_PASSWORD)
    server.sendmail(settings.EMAILS_FROM_EMAIL, to_email, msg.as_string())
    server.quit()

def generate_email_verification_token(email: str) -> str:
    expire = datetime.utcnow() + timedelta(hours=48)
    return jwt.encode(
        {"exp": expire, "email": email, "type": "email_verification"},
        settings.SECRET_KEY,
        algorithm="HS256"
    )

def verify_email_token(token: str) -> str:
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        if decoded_token["type"] != "email_verification":
            raise ValueError("Invalid token type")
        return decoded_token["email"]
    except jwt.PyJWTError:
        raise ValueError("Invalid token") 