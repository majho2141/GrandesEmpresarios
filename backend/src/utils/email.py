import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from pathlib import Path
import jwt
from datetime import datetime, timedelta

from src.config.settings import settings

def send_email(to_email: str, subject: str, html_content: str):
    # Verificar que la configuración de correo esté completa
    if not settings.SMTP_HOST or not settings.EMAILS_FROM_EMAIL or not settings.SMTP_PASSWORD:
        print("ERROR: Configuración de correo incompleta. Verifique las variables de entorno SMTP_HOST, EMAILS_FROM_EMAIL y SMTP_PASSWORD.")
        return False
    
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = settings.EMAILS_FROM_EMAIL
        msg['To'] = to_email
        
        # Crear la parte HTML
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        print(f"Configuración SMTP: Host={settings.SMTP_HOST}, Port={settings.SMTP_PORT}, SSL={settings.SMTP_SSL}, TLS={settings.SMTP_TLS}")
        
        if settings.SMTP_SSL:
            print("Usando conexión SSL...")
            server = smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT)
        else:
            print("Usando conexión normal...")
            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
            if settings.SMTP_TLS:
                print("Iniciando TLS...")
                server.starttls()
        
        print(f"Intentando conectar a servidor SMTP: {settings.SMTP_HOST}:{settings.SMTP_PORT}")
        server.login(settings.EMAILS_FROM_EMAIL, settings.SMTP_PASSWORD)
        server.sendmail(settings.EMAILS_FROM_EMAIL, to_email, msg.as_string())
        server.quit()
        print(f"Correo enviado con éxito a {to_email}")
        return True
    except Exception as e:
        print(f"ERROR detallado al enviar correo: {str(e)}")
        import traceback
        print("Traceback completo:")
        print(traceback.format_exc())
        return False

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