from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List


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
    products: List["Product"] = Relationship(back_populates="enterprise")
    ads: List["AdGenerated"] = Relationship(back_populates="enterprise")
    advertisements: List["Advertisement"] = Relationship(back_populates="enterprise")
    users: List["User"] = Relationship(back_populates="enterprise")
    payments: List["Payment"] = Relationship(back_populates="enterprise")
    social_media_accounts: List["SocialMediaAccount"] = Relationship(back_populates="enterprise") 

class EnterpriseCreate(EnterpriseBase):
    pass

class EnterpriseRead(EnterpriseBase):
    id: int 


from src.models.ad import AdGenerated
