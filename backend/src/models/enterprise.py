from sqlmodel import SQLModel, Field
from typing import Optional

class EnterpriseBase(SQLModel):
    name: str = Field(max_length=45)
    NIT: str = Field(max_length=30, unique=True)
    email: str = Field(max_length=100)
    phone_number: str = Field(max_length=20)
    currency: str = Field(max_length=20)
    description: str = Field(max_length=255)
    address: str = Field(max_length=100)

class Enterprise(EnterpriseBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class EnterpriseCreate(EnterpriseBase):
    pass

class EnterpriseRead(EnterpriseBase):
    id: int 