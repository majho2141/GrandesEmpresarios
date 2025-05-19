from typing import Optional
from sqlmodel import Field, SQLModel, Relationship

class OrderDetailBase(SQLModel):
    quantity: int
    unit_price: float
    discount: float = Field(default=0.0)
    total_price: float
    product_id: int = Field(foreign_key="product.id")
    order_id: int = Field(foreign_key="order.id")

class OrderDetailCreate(OrderDetailBase):
    pass

class OrderDetailRead(OrderDetailBase):
    id: int

class OrderDetailUpdate(SQLModel):
    quantity: Optional[int] = None
    unit_price: Optional[float] = None
    discount: Optional[float] = None
    total_price: Optional[float] = None

class OrderDetail(OrderDetailBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product: "Product" = Relationship(back_populates="order_details")
    order: "Order" = Relationship(back_populates="order_details") 