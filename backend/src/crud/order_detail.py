from typing import List, Optional
from sqlmodel import Session, select

from ..models.order_detail import OrderDetail, OrderDetailCreate, OrderDetailUpdate

def create_order_detail(db: Session, order_detail: OrderDetailCreate) -> OrderDetail:
    db_order_detail = OrderDetail.model_validate(order_detail)
    db.add(db_order_detail)
    db.commit()
    db.refresh(db_order_detail)
    return db_order_detail

def get_order_detail(db: Session, order_detail_id: int) -> Optional[OrderDetail]:
    return db.get(OrderDetail, order_detail_id)

def get_order_details(
    db: Session, 
    order_id: int, 
    skip: int = 0, 
    limit: int = 100
) -> List[OrderDetail]:
    query = select(OrderDetail).where(OrderDetail.order_id == order_id)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def get_product_order_details(
    db: Session,
    product_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[OrderDetail]:
    query = select(OrderDetail).where(OrderDetail.product_id == product_id)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def update_order_detail(
    db: Session, 
    order_detail_id: int, 
    order_detail_update: OrderDetailUpdate
) -> Optional[OrderDetail]:
    db_order_detail = get_order_detail(db, order_detail_id)
    if not db_order_detail:
        return None
    
    order_detail_data = order_detail_update.model_dump(exclude_unset=True)
    for key, value in order_detail_data.items():
        setattr(db_order_detail, key, value)
    
    db.add(db_order_detail)
    db.commit()
    db.refresh(db_order_detail)
    return db_order_detail

def delete_order_detail(db: Session, order_detail_id: int) -> bool:
    db_order_detail = get_order_detail(db, order_detail_id)
    if not db_order_detail:
        return False
    
    db.delete(db_order_detail)
    db.commit()
    return True 