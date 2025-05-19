from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class EnterpriseBase(SQLModel):
    name: str = Field(max_length=100)
    NIT: str = Field(max_length=30)
    description: str = Field(max_length=500)
    logo_url: Optional[str] = None
    website: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = Field(max_length=20, default=None)
    currency: Optional[str] = Field(max_length=10, default=None)
    address: Optional[str] = Field(max_length=255, default=None)

class EnterpriseCreate(EnterpriseBase):
    pass

class EnterpriseRead(EnterpriseBase):
    id: int

class EnterpriseUpdate(SQLModel):
    name: Optional[str] = None
    NIT: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None
    website: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    currency: Optional[str] = None
    address: Optional[str] = None

class Enterprise(EnterpriseBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    users: List["User"] = Relationship(back_populates="enterprise")
    products: List["Product"] = Relationship(back_populates="enterprise")
    advertisements: List["Advertisement"] = Relationship(back_populates="enterprise")
    payments: List["Payment"] = Relationship(back_populates="enterprise")
    social_media_accounts: List["SocialMediaAccount"] = Relationship(back_populates="enterprise") 