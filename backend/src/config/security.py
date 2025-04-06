from datetime import datetime, timedelta
from typing import Any

try:
    import jwt as pyjwt  # Intentamos importar PyJWT
except ImportError:
    # Si falla, importamos PyJWT explícitamente
    try:
        import PyJWT as pyjwt
    except ImportError:
        raise ImportError("No se pudo importar PyJWT. Por favor, instálalo con 'pip install PyJWT'")

from passlib.context import CryptContext

from src.config.settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


ALGORITHM = "HS256"


def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.utcnow() + expires_delta
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = pyjwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)