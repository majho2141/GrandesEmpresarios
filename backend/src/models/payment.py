from enum import Enum
from datetime import date
from typing import Optional
from sqlmodel import Field, SQLModel, Relationship

class PaymentMethod(str, Enum):
    CASH = "cash"
    CREDIT_CARD = "credit_card"
    DEBIT_CARD = "debit_card"
    BANK_TRANSFER = "bank_transfer"
    PAYPAL = "paypal"

class PaymentBase(SQLModel):
    amount: float
    payment_date: date
    payment_method: PaymentMethod
    concept: str = Field(max_length=255)
    enterprise_id: int = Field(foreign_key="enterprise.id")
    advertisement_id: int = Field(foreign_key="advertisement.id")
    invoice_id: int = Field(foreign_key="invoice.id")

class PaymentCreate(PaymentBase):
    pass

class PaymentRead(PaymentBase):
    id: int

class PaymentUpdate(SQLModel):
    amount: Optional[float] = None
    payment_date: Optional[date] = None
    payment_method: Optional[PaymentMethod] = None
    concept: Optional[str] = None
    advertisement_id: Optional[int] = None
    invoice_id: Optional[int] = None

class Payment(PaymentBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    enterprise: "Enterprise" = Relationship(back_populates="payments")
    advertisement: "Advertisement" = Relationship(back_populates="payments")
    invoice: "Invoice" = Relationship(back_populates="payments") 