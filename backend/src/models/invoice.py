from enum import Enum
from datetime import date
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

class PaymentMethod(str, Enum):
    CASH = "cash"
    CREDIT_CARD = "credit_card"
    DEBIT_CARD = "debit_card"
    BANK_TRANSFER = "bank_transfer"
    PAYPAL = "paypal"

class InvoiceStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"

class InvoiceBase(SQLModel):
    invoice_number: str = Field(max_length=45)
    payment_method: PaymentMethod
    total_price: float
    creation_date: date
    payment_date: Optional[date] = None
    status: InvoiceStatus = Field(default=InvoiceStatus.PENDING)
    order_id: int = Field(foreign_key="order.id")

class InvoiceCreate(InvoiceBase):
    pass

class InvoiceRead(InvoiceBase):
    id: int

class InvoiceUpdate(SQLModel):
    invoice_number: Optional[str] = None
    payment_method: Optional[PaymentMethod] = None
    total_price: Optional[float] = None
    payment_date: Optional[date] = None
    status: Optional[InvoiceStatus] = None

class Invoice(InvoiceBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order: "Order" = Relationship(back_populates="invoice")
    payments: List["Payment"] = Relationship(back_populates="invoice") 