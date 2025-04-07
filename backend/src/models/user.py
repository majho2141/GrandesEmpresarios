from typing import Optional
from pydantic import EmailStr
from sqlmodel import Field, SQLModel, Relationship
from .role import Role, RoleRead
from .enterprise import Enterprise, EnterpriseRead, EnterpriseCreate

class UserBase(SQLModel):
    name: str = Field(max_length=45)
    email: EmailStr = Field(unique=True, index=True)
    phone_number: str = Field(max_length=20)
    document_id: str = Field(max_length=20)
    address: str = Field(max_length=255)
    enterprise_id: Optional[int] = Field(default=None, foreign_key="enterprise.id")
    role_id: Optional[int] = Field(default=None, foreign_key="role.id", nullable=True)
    document_verified: bool = Field(default=False)
    is_active: bool = Field(default=False)

class UserCreate(UserBase):
    password: str
    enterprise: Optional[EnterpriseCreate] = None

class UserRead(UserBase):
    id: int

class UserReadWithDetails(UserRead):
    role: Optional[RoleRead] = None
    enterprise: Optional[EnterpriseRead] = None

class UserUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    password: Optional[str] = None
    role_id: Optional[int] = None
    document_verified: Optional[bool] = None
    is_active: Optional[bool] = None

# Modelo para autenticación
class UserLogin(SQLModel):
    email: EmailStr
    password: str

# Modelo para token
class Token(SQLModel):
    access_token: str
    token_type: str

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password: str
    role: Optional[Role] = Relationship(back_populates="users")
    enterprise: Optional[Enterprise] = Relationship()

