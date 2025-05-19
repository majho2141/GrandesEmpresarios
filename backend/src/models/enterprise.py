from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class EnterpriseBase(SQLModel):
    name: str = Field(max_length=100)
    description: str = Field(max_length=500)
    logo_url: Optional[str] = None
    website: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

class EnterpriseCreate(EnterpriseBase):
    pass

class EnterpriseRead(EnterpriseBase):
    id: int

class EnterpriseUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None
    website: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

class Enterprise(EnterpriseBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    users: List["User"] = Relationship(back_populates="enterprise")
    products: List["Product"] = Relationship(back_populates="enterprise")
    advertisements: List["Advertisement"] = Relationship(back_populates="enterprise")
    payments: List["Payment"] = Relationship(back_populates="enterprise")
    social_media_accounts: List["SocialMediaAccount"] = Relationship(back_populates="enterprise") 