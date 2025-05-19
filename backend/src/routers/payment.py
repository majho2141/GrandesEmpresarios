from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.database import get_session
from src.models.payment import PaymentCreate, PaymentRead, PaymentUpdate
from src.crud import payment as crud
from src.routers.auth import get_current_user
from src.models.user import User

router = APIRouter(
    prefix="/payments",
    tags=["payments"]
)

@router.post("/", response_model=PaymentRead)
def create_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.create_payment(db, payment)

@router.get("/", response_model=List[PaymentRead])
def read_payments(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.get_payments(db, skip=skip, limit=limit)

@router.get("/enterprise/{enterprise_id}", response_model=List[PaymentRead])
def read_enterprise_payments(
    enterprise_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.get_enterprise_payments(db, enterprise_id, skip=skip, limit=limit)

@router.get("/advertisement/{advertisement_id}", response_model=List[PaymentRead])
def read_advertisement_payments(
    advertisement_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.get_advertisement_payments(db, advertisement_id, skip=skip, limit=limit)

@router.get("/invoice/{invoice_id}", response_model=List[PaymentRead])
def read_invoice_payments(
    invoice_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.get_invoice_payments(db, invoice_id, skip=skip, limit=limit)

@router.get("/{payment_id}", response_model=PaymentRead)
def read_payment(
    payment_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    payment = crud.get_payment(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.patch("/{payment_id}", response_model=PaymentRead)
def update_payment(
    payment_id: int,
    payment_update: PaymentUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    payment = crud.update_payment(db, payment_id, payment_update)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.delete("/{payment_id}")
def delete_payment(
    payment_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    success = crud.delete_payment(db, payment_id)
    if not success:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment deleted successfully"} 