from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

class AddressBase(SQLModel):
    street: str = Field(max_length=100)
    city: str = Field(max_length=45)
    state: str = Field(max_length=45)
    country: str = Field(max_length=45)
    postal_code: str = Field(max_length=20)
    user_id: int = Field(foreign_key="user.id")
    is_default: bool = Field(default=False)

class AddressCreate(AddressBase):
    pass

class AddressRead(AddressBase):
    id: int

class AddressUpdate(SQLModel):
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    is_default: Optional[bool] = None

class Address(AddressBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: "User" = Relationship(back_populates="addresses")
    orders: List["Order"] = Relationship(back_populates="address") 