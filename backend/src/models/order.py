from datetime import date, datetime
from enum import Enum
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class OrderBase(SQLModel):
    order_date: date
    delivery_date: date
    status: OrderStatus = Field(default=OrderStatus.PENDING)
    shipping_cost: float
    total_amount: float
    user_id: int = Field(foreign_key="user.id")
    address_id: int = Field(foreign_key="address.id")
    total_price: float

class OrderCreate(OrderBase):
    pass

class OrderRead(OrderBase):
    id: int
    created_at: datetime
    updated_at: datetime

class OrderUpdate(SQLModel):
    delivery_date: Optional[date] = None
    status: Optional[OrderStatus] = None
    shipping_cost: Optional[float] = None
    total_amount: Optional[float] = None
    address_id: Optional[int] = None
    total_price: Optional[float] = None

class Order(OrderBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    user: "User" = Relationship(back_populates="orders")
    address: "Address" = Relationship(back_populates="orders")
    order_details: List["OrderDetail"] = Relationship(back_populates="order")
    invoice: Optional["Invoice"] = Relationship(back_populates="order") 