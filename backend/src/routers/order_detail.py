from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from ..database import get_session
from ..models.order_detail import OrderDetailCreate, OrderDetailRead, OrderDetailUpdate
from ..crud import order_detail as order_detail_crud
from ..crud import order as order_crud
from ..routers.auth import get_current_user
from ..models.user import User

router = APIRouter(
    prefix="/order-details",
    tags=["order-details"]
)

@router.post("/", response_model=OrderDetailRead)
def create_order_detail(
    order_detail: OrderDetailCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que la orden pertenece al usuario actual
    order = order_crud.get_order(db, order_detail.order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to add details to this order")
    
    return order_detail_crud.create_order_detail(db, order_detail)

@router.get("/order/{order_id}", response_model=List[OrderDetailRead])
def read_order_details(
    order_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que la orden pertenece al usuario actual
    order = order_crud.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this order's details")
    
    order_details = order_detail_crud.get_order_details(db, order_id, skip=skip, limit=limit)
    return order_details

@router.get("/{order_detail_id}", response_model=OrderDetailRead)
def read_order_detail(
    order_detail_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    order_detail = order_detail_crud.get_order_detail(db, order_detail_id)
    if not order_detail:
        raise HTTPException(status_code=404, detail="Order detail not found")
    
    # Verificar que la orden pertenece al usuario actual
    order = order_crud.get_order(db, order_detail.order_id)
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this order detail")
    
    return order_detail

@router.patch("/{order_detail_id}", response_model=OrderDetailRead)
def update_order_detail(
    order_detail_id: int,
    order_detail_update: OrderDetailUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    order_detail = order_detail_crud.get_order_detail(db, order_detail_id)
    if not order_detail:
        raise HTTPException(status_code=404, detail="Order detail not found")
    
    # Verificar que la orden pertenece al usuario actual
    order = order_crud.get_order(db, order_detail.order_id)
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this order detail")
    
    updated_order_detail = order_detail_crud.update_order_detail(db, order_detail_id, order_detail_update)
    return updated_order_detail

@router.delete("/{order_detail_id}")
def delete_order_detail(
    order_detail_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    order_detail = order_detail_crud.get_order_detail(db, order_detail_id)
    if not order_detail:
        raise HTTPException(status_code=404, detail="Order detail not found")
    
    # Verificar que la orden pertenece al usuario actual
    order = order_crud.get_order(db, order_detail.order_id)
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this order detail")
    
    success = order_detail_crud.delete_order_detail(db, order_detail_id)
    if not success:
        raise HTTPException(status_code=400, detail="Could not delete order detail")
    return {"message": "Order detail deleted successfully"} 