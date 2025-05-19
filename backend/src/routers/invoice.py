from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.database import get_session
from src.models.invoice import InvoiceCreate, InvoiceRead, InvoiceUpdate, InvoiceStatus
from src.crud import invoice as crud
from src.routers.auth import get_current_user
from src.models.user import User

router = APIRouter(
    prefix="/invoices",
    tags=["invoices"]
)

@router.post("/", response_model=InvoiceRead)
def create_invoice(
    invoice: InvoiceCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.create_invoice(db, invoice)

@router.get("/", response_model=List[InvoiceRead])
def read_invoices(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.get_invoices(db, skip=skip, limit=limit)

@router.get("/{invoice_id}", response_model=InvoiceRead)
def read_invoice(
    invoice_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    invoice = crud.get_invoice(db, invoice_id)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

@router.get("/order/{order_id}", response_model=InvoiceRead)
def read_order_invoice(
    order_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    invoice = crud.get_order_invoice(db, order_id)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found for this order")
    return invoice

@router.patch("/{invoice_id}", response_model=InvoiceRead)
def update_invoice(
    invoice_id: int,
    invoice_update: InvoiceUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    invoice = crud.update_invoice(db, invoice_id, invoice_update)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

@router.delete("/{invoice_id}")
def delete_invoice(
    invoice_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    success = crud.delete_invoice(db, invoice_id)
    if not success:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return {"message": "Invoice deleted successfully"}

@router.patch("/{invoice_id}/status")
def update_invoice_status(
    invoice_id: int,
    status: InvoiceStatus,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    invoice = crud.update_invoice_status(db, invoice_id, status)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return {"message": "Invoice status updated successfully"} 