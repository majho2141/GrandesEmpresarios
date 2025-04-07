from typing import Optional
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from datetime import datetime, timedelta
import random

from src.config.security import get_password_hash, verify_password
from src.models.user import User, UserCreate, UserUpdate
from src.models.role import Role
from src.models.verification_code import VerificationCode

def create_user(*, session: Session, user_create: UserCreate) -> User:
    """
    Crear un nuevo usuario.
    El primer usuario registrado será ADMIN.
    Los demás serán EMPLOYEE si tienen empresa o CLIENT si no tienen.
    """
    # Verificar si es el primer usuario
    statement = select(User)
    existing_users = session.exec(statement).all()
    
    # Si no hay usuarios, será el primer usuario (ADMIN)
    if not existing_users:
        # Buscar rol ADMIN
        admin_role = session.exec(select(Role).where(Role.name == "ADMIN")).first()
        if not admin_role:
            raise ValueError("El rol ADMIN no existe. Verifica la inicialización de la base de datos.")
        
        # Asignar rol ADMIN y activar la cuenta
        user_create.role_id = admin_role.id
        user_create.is_active = True  # El admin se crea activo por defecto
        
        # Crear usuario con contraseña hasheada
        db_obj = User(
            **user_create.model_dump(exclude={"password", "enterprise"}),
            password=get_password_hash(user_create.password)
        )
        
        session.add(db_obj)
        session.commit()
        session.refresh(db_obj)
        return db_obj
    
    # Si no es el primer usuario, proceder con la lógica normal
    # Crear usuario con contraseña hasheada
    db_obj = User(
        **user_create.model_dump(exclude={"password", "enterprise"}),
        password=get_password_hash(user_create.password)
    )
    
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def get_user_by_email(*, session: Session, email: str) -> Optional[User]:
    return session.exec(select(User).where(User.email == email)).first()

def get_user_by_document(*, session: Session, document_id: str) -> Optional[User]:
    return session.exec(select(User).where(User.document_id == document_id)).first()

def authenticate_user(*, session: Session, email: str, password: str) -> Optional[User]:
    user = get_user_by_email(session=session, email=email)
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user

def get_all_users(session: Session) -> list[User]:
    """
    Obtener todos los usuarios del sistema con sus roles y empresas
    """
    statement = select(User).options(selectinload(User.role), selectinload(User.enterprise))
    result = session.exec(statement)
    return list(result.all() or [])

def delete_user(*, session: Session, document_id: str) -> bool:
    user = get_user_by_document(session=session, document_id=document_id)
    if not user:
        return False
    
    session.delete(user)
    session.commit()
    return True

def update_user(
    *, session: Session, document_id: str, user_update: UserUpdate
) -> Optional[User]:
    db_obj = get_user_by_document(session=session, document_id=document_id)
    if not db_obj:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    if "password" in update_data:
        update_data["password"] = get_password_hash(update_data["password"])
    
    for field, value in update_data.items():
        setattr(db_obj, field, value)
    
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def generate_verification_code(*, session: Session, email: str) -> str:
    # Generar código de 6 dígitos
    code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    
    # Desactivar códigos anteriores
    statement = select(VerificationCode).where(
        VerificationCode.email == email,
        VerificationCode.is_active == True
    )
    old_codes = session.exec(statement).all()
    for old_code in old_codes:
        old_code.is_active = False
        session.add(old_code)
    
    # Crear nuevo código
    verification_code = VerificationCode(
        email=email,
        code=code,
        is_active=True
    )
    session.add(verification_code)
    session.commit()
    
    return code

def verify_code(*, session: Session, email: str, code: str) -> bool:
    # Buscar código activo
    statement = select(VerificationCode).where(
        VerificationCode.email == email,
        VerificationCode.code == code,
        VerificationCode.is_active == True,
        VerificationCode.created_at >= datetime.utcnow() - timedelta(minutes=15)
    )
    verification_code = session.exec(statement).first()
    
    if not verification_code:
        return False
    
    # Desactivar el código después de usarlo
    verification_code.is_active = False
    session.add(verification_code)
    session.commit()
    
    return True

def get_users_by_role(*, session: Session, role_name: str) -> list[User]:
    """
    Obtener todos los usuarios por nombre de rol
    """
    statement = select(User).join(Role).where(Role.name == role_name)
    return session.exec(statement).all()

def verify_user_password(*, session: Session, user_id: str, password: str) -> bool:
    """
    Verificar la contraseña de un usuario
    """
    user = get_user_by_document(session=session, document_id=user_id)
    if not user:
        return False
    return verify_password(password, user.password)
    