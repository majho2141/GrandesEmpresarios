from typing import List, Optional
from sqlmodel import Session, select
from src.models.payment import Payment, PaymentCreate, PaymentUpdate

def create_payment(db: Session, payment: PaymentCreate) -> Payment:
    db_payment = Payment.model_validate(payment)
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def get_payment(db: Session, payment_id: int) -> Optional[Payment]:
    return db.get(Payment, payment_id)

def get_payments(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[Payment]:
    query = select(Payment)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def get_enterprise_payments(
    db: Session,
    enterprise_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[Payment]:
    query = select(Payment).where(Payment.enterprise_id == enterprise_id)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def get_advertisement_payments(
    db: Session,
    advertisement_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[Payment]:
    query = select(Payment).where(Payment.advertisement_id == advertisement_id)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def get_invoice_payments(
    db: Session,
    invoice_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[Payment]:
    query = select(Payment).where(Payment.invoice_id == invoice_id)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def update_payment(
    db: Session,
    payment_id: int,
    payment_update: PaymentUpdate
) -> Optional[Payment]:
    db_payment = get_payment(db, payment_id)
    if not db_payment:
        return None
    
    payment_data = payment_update.model_dump(exclude_unset=True)
    for key, value in payment_data.items():
        setattr(db_payment, key, value)
    
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def delete_payment(db: Session, payment_id: int) -> bool:
    db_payment = get_payment(db, payment_id)
    if not db_payment:
        return False
    
    db.delete(db_payment)
    db.commit()
    return True 