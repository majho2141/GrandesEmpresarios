from typing import List, Optional
from sqlmodel import Session, select
from src.models.invoice import Invoice, InvoiceCreate, InvoiceUpdate, InvoiceStatus

def create_invoice(db: Session, invoice: InvoiceCreate) -> Invoice:
    db_invoice = Invoice.model_validate(invoice)
    db.add(db_invoice)
    db.commit()
    db.refresh(db_invoice)
    return db_invoice

def get_invoice(db: Session, invoice_id: int) -> Optional[Invoice]:
    return db.get(Invoice, invoice_id)

def get_invoices(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[Invoice]:
    query = select(Invoice)
    query = query.offset(skip).limit(limit)
    return list(db.exec(query))

def get_order_invoice(
    db: Session,
    order_id: int
) -> Optional[Invoice]:
    query = select(Invoice).where(Invoice.order_id == order_id)
    return db.exec(query).first()

def update_invoice(
    db: Session,
    invoice_id: int,
    invoice_update: InvoiceUpdate
) -> Optional[Invoice]:
    db_invoice = get_invoice(db, invoice_id)
    if not db_invoice:
        return None
    
    invoice_data = invoice_update.model_dump(exclude_unset=True)
    for key, value in invoice_data.items():
        setattr(db_invoice, key, value)
    
    db.add(db_invoice)
    db.commit()
    db.refresh(db_invoice)
    return db_invoice

def delete_invoice(db: Session, invoice_id: int) -> bool:
    db_invoice = get_invoice(db, invoice_id)
    if not db_invoice:
        return False
    
    db.delete(db_invoice)
    db.commit()
    return True

def update_invoice_status(
    db: Session,
    invoice_id: int,
    status: InvoiceStatus
) -> Optional[Invoice]:
    db_invoice = get_invoice(db, invoice_id)
    if not db_invoice:
        return None
    
    db_invoice.status = status
    db.add(db_invoice)
    db.commit()
    db.refresh(db_invoice)
    return db_invoice 