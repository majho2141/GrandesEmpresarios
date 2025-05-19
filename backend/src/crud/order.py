from typing import List, Optional
from sqlmodel import Session, select
from datetime import date

from ..models.order import Order, OrderCreate, OrderUpdate, OrderStatus

def create_order(db: Session, order: OrderCreate) -> Order:
    db_order = Order.model_validate(order)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_order(db: Session, order_id: int) -> Optional[Order]:
    return db.get(Order, order_id)

def get_user_orders(
    db: Session, 
    user_id: int, 
    skip: int = 0, 
    limit: int = 100
) -> List[Order]:
    query = select(Order).where(Order.user_id == user_id)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def get_orders_by_status(
    db: Session,
    status: OrderStatus,
    skip: int = 0,
    limit: int = 100
) -> List[Order]:
    query = select(Order).where(Order.status == status)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def update_order(
    db: Session, 
    order_id: int, 
    order_update: OrderUpdate
) -> Optional[Order]:
    db_order = get_order(db, order_id)
    if not db_order:
        return None
    
    order_data = order_update.model_dump(exclude_unset=True)
    for key, value in order_data.items():
        setattr(db_order, key, value)
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def delete_order(db: Session, order_id: int) -> bool:
    db_order = get_order(db, order_id)
    if not db_order:
        return False
    
    db.delete(db_order)
    db.commit()
    return True

def update_order_status(
    db: Session,
    order_id: int,
    new_status: OrderStatus
) -> Optional[Order]:
    db_order = get_order(db, order_id)
    if not db_order:
        return None
    
    db_order.status = new_status
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order 