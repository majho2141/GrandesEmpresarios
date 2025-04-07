from typing import Generator, Annotated
from sqlmodel import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
import jwt
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError

from src.config.db import engine
from src.config.security import ALGORITHM
from src.config.settings import settings
from src.models.user import User, UserRead
from src.crud import user as user_crud
from src.models.role import RoleRead

security = HTTPBearer()

def get_session() -> Generator:
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

async def get_current_user(
    session: SessionDep,
    auth_header = Depends(security)
) -> User:
    try:
        token = auth_header.credentials
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[ALGORITHM]
        )
        document_id: str = payload.get("sub")
        if document_id is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No se pudieron validar las credenciales",
            )
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No se pudieron validar las credenciales",
        )
    
    user = user_crud.get_user_by_document(session=session, document_id=document_id)
    if not user:
        raise HTTPException(
            status_code=404, 
            detail="Usuario no encontrado"
        )
    return user

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    if not current_user.is_active:
        raise HTTPException(
            status_code=400, 
            detail="Usuario inactivo"
        )
    return current_user

async def get_current_superuser(
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> User:
    if current_user.role.name != "ADMIN":
        raise HTTPException(
            status_code=403, 
            detail="El usuario no tiene suficientes privilegios"
        )
    return current_user

def check_permission(permission_name: str):
    async def permission_checker(
        current_user: Annotated[User, Depends(get_current_active_user)]
    ) -> User:
        if not any(p.name == permission_name for p in current_user.role.permissions):
            raise HTTPException(
                status_code=403,
                detail=f"El usuario no tiene el permiso: {permission_name}"
            )
        return current_user
    return permission_checker