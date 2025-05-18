from typing import Optional, List
from pydantic import EmailStr, field_validator
from sqlmodel import Field, SQLModel, Relationship
from .role import Role, RoleRead
from .enterprise import Enterprise, EnterpriseRead, EnterpriseCreate
from .notification import Notification
from .address import Address

class UserBase(SQLModel):
    name: str = Field(max_length=45)
    email: str = Field(unique=True, index=True)
    phone_number: str = Field(max_length=20)
    document_id: str = Field(max_length=20)
    address: str = Field(max_length=255)
    enterprise_id: Optional[int] = Field(default=None, foreign_key="enterprise.id")
    role_id: Optional[int] = Field(default=None, foreign_key="role.id", nullable=True)
    document_verified: bool = Field(default=False)
    is_active: bool = Field(default=False)

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        if not v:
            raise ValueError('Email cannot be empty')
        try:
            # Validar el formato del email usando una expresión regular simple
            if '@' not in v or '.' not in v:
                raise ValueError('Invalid email format')
        except ValueError:
            raise ValueError('Invalid email format')
        return v

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
    email: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    password: Optional[str] = None
    role_id: Optional[int] = None
    document_verified: Optional[bool] = None
    is_active: Optional[bool] = None

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            try:
                # Validar el formato del email usando una expresión regular simple
                if '@' not in v or '.' not in v:
                    raise ValueError('Invalid email format')
            except ValueError:
                raise ValueError('Invalid email format')
        return v

# Modelo para autenticación
class UserLogin(SQLModel):
    email: str
    password: str

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        if not v:
            raise ValueError('Email cannot be empty')
        try:
            # Validar el formato del email usando una expresión regular simple
            if '@' not in v or '.' not in v:
                raise ValueError('Invalid email format')
        except ValueError:
            raise ValueError('Invalid email format')
        return v

# Modelo para token
class Token(SQLModel):
    access_token: str
    token_type: str

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password: str
    role: Optional[Role] = Relationship(back_populates="users")
    enterprise: Optional[Enterprise] = Relationship()
    notifications: List[Notification] = Relationship(back_populates="user")
    addresses: List["Address"] = Relationship(back_populates="user")
    orders: List["Order"] = Relationship(back_populates="user")

