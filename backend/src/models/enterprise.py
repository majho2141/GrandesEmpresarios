from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class EnterpriseBase(SQLModel):
    name: str = Field(max_length=100)
    description: str = Field(max_length=255)
    logo: Optional[str] = Field(max_length=255, default=None)
    website: Optional[str] = Field(max_length=255, default=None)
    email: str = Field(max_length=100)
    phone: str = Field(max_length=20)
    address: str = Field(max_length=255)

class EnterpriseCreate(EnterpriseBase):
    pass

class EnterpriseRead(EnterpriseBase):
    id: int

class EnterpriseUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    logo: Optional[str] = None
    website: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class Enterprise(EnterpriseBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    products: List["Product"] = Relationship(back_populates="enterprise")
    advertisements: List["Advertisement"] = Relationship(back_populates="enterprise") 