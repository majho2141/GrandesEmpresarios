from pydantic import EmailStr, BaseModel
from sqlmodel import Field, Relationship, SQLModel
from typing import Optional
from datetime import datetime

# Shared properties
class User(SQLModel, table=True):
    email: EmailStr = Field(primary_key=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)
    password: str = Field(max_length=255)  # Almacena la contraseña hasheada

# Modelo para crear o actualizar usuarios
class UserCreate(BaseModel):
    email: EmailStr
    full_name: str | None = None
    is_active: bool = False
    is_superuser: bool = False
    password: str  # Contraseña en texto plano

# Modelo para respuestas (sin exponer la contraseña)
class UserResponse(BaseModel):
    email: EmailStr
    full_name: str | None = None
    is_active: bool
    is_superuser: bool

class VerificationCode(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(index=True)
    code: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

