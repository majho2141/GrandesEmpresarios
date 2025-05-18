from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from ..database import get_session
from ..models.order import OrderCreate, OrderRead, OrderUpdate, OrderStatus
from ..crud import order as order_crud
from ..routers.auth import get_current_user
from ..models.user import User

router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)

@router.post("/", response_model=OrderRead)
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Asegurarse de que el user_id en la orden coincida con el usuario actual
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to create order for another user")
    
    return order_crud.create_order(db, order)

@router.get("/", response_model=List[OrderRead])
def read_orders(
    skip: int = 0,
    limit: int = 100,
    status: OrderStatus = None,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    if status:
        orders = order_crud.get_orders_by_status(db, status, skip=skip, limit=limit)
    else:
        orders = order_crud.get_user_orders(db, current_user.id, skip=skip, limit=limit)
    return orders

@router.get("/{order_id}", response_model=OrderRead)
def read_order(
    order_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    order = order_crud.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this order")
    return order

@router.patch("/{order_id}", response_model=OrderRead)
def update_order(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    order = order_crud.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this order")
    
    updated_order = order_crud.update_order(db, order_id, order_update)
    return updated_order

@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    order = order_crud.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this order")
    
    success = order_crud.delete_order(db, order_id)
    if not success:
        raise HTTPException(status_code=400, detail="Could not delete order")
    return {"message": "Order deleted successfully"}

@router.patch("/{order_id}/status", response_model=OrderRead)
def update_order_status(
    order_id: int,
    new_status: OrderStatus,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    order = order_crud.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this order's status")
    
    updated_order = order_crud.update_order_status(db, order_id, new_status)
    return updated_order 