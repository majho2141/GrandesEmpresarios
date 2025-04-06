from typing import Any
import random
from datetime import datetime, timedelta

from sqlmodel import Session, select, delete, col

from src.config.security import get_password_hash, verify_password

from src.models.user import User, UserCreate, UserResponse, VerificationCode

def create_user(*, session: Session, user_create: UserCreate) -> User:
    # Verificar si es el primer usuario
    statement = select(User)
    existing_users = session.exec(statement).all()
    
    # Si no hay usuarios, este será superusuario
    if not existing_users:
        user_create.is_superuser = True
    
    # Crear un objeto de usuario con la contraseña hasheada
    db_obj = User(
        email=user_create.email,
        full_name=user_create.full_name,
        is_active=user_create.is_active,
        is_superuser=user_create.is_superuser,
        password=get_password_hash(user_create.password)  # Contraseña hasheada
    )
    
    # Añadir usuario a la base de datos
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    
    return db_obj

def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user

def authenticate_user(*, session: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(session=session, email=email)
    if not user:
        return None
    if not verify_password(password, user.password):  # Verifica contra contraseña hasheada
        return None
    return user

def get_all_users(*, session: Session) -> list[User]:
    statement = select(User)
    users = session.exec(statement).all()
    return users

def delete_user(*, session: Session, email: str) -> None:
    statement = delete(User).where(User.email == email)
    session.exec(statement)
    session.commit()

def update_user(*, session: Session, email: str, user_update: UserCreate) -> User:
    statement = select(User).where(User.email == email)
    db_obj = session.exec(statement).first()
    if not db_obj:
        raise ValueError("User not found")
    
    # Actualizar los valores del usuario (excepto email que es clave primaria)
    db_obj.full_name = user_update.full_name
    db_obj.is_active = user_update.is_active
    db_obj.is_superuser = user_update.is_superuser
    
    # Actualizar contraseña si se proporcionó
    if user_update.password:
        db_obj.password = get_password_hash(user_update.password)
    
    # Guardar cambios
    session.commit()
    session.refresh(db_obj)
    
    return db_obj

def generate_verification_code(*, session: Session, email: str) -> str:
    # Desactivar códigos anteriores
    statement = select(VerificationCode).where(VerificationCode.email == email)
    old_codes = session.exec(statement).all()
    for code in old_codes:
        code.is_active = False
        session.add(code)
    
    # Generar nuevo código
    code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    
    # Guardar nuevo código
    db_code = VerificationCode(email=email, code=code)
    session.add(db_code)
    session.commit()
    session.refresh(db_code)
    
    return code

def verify_code(*, session: Session, email: str, code: str) -> bool:
    statement = select(VerificationCode).where(
        VerificationCode.email == email,
        VerificationCode.code == code,
        VerificationCode.is_active == True,
        VerificationCode.created_at >= datetime.utcnow() - timedelta(minutes=15)
    )
    db_code = session.exec(statement).first()
    
    if not db_code:
        return False
    
    # Desactivar el código después de usarlo
    db_code.is_active = False
    session.add(db_code)
    session.commit()
    
    return True
    