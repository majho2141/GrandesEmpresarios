from typing import List, Optional
from sqlmodel import Session, select
from src.models.permission import Permission, PermissionCreate, PermissionUpdate

def get(*, session: Session, id: int) -> Optional[Permission]:
    return session.get(Permission, id)

def get_by_name(*, session: Session, name: str) -> Optional[Permission]:
    return session.exec(select(Permission).where(Permission.name == name)).first()

def get_multi(
    *, session: Session, skip: int = 0, limit: int = 100
) -> List[Permission]:
    return session.exec(select(Permission).offset(skip).limit(limit)).all()

def create(*, session: Session, obj_in: PermissionCreate) -> Permission:
    db_obj = Permission(**obj_in.dict())
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def update(
    *, session: Session, db_obj: Permission, obj_in: PermissionUpdate
) -> Permission:
    update_data = obj_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def delete(*, session: Session, id: int) -> bool:
    obj = session.get(Permission, id)
    if not obj:
        return False
    session.delete(obj)
    session.commit()
    return True 