from typing import List, Optional
from sqlmodel import Session, select
from src.models.role import Role, RoleCreate, RoleUpdate
from src.models.permission import Permission

def get(*, session: Session, id: int) -> Optional[Role]:
    return session.get(Role, id)

def get_by_name(*, session: Session, name: str) -> Optional[Role]:
    return session.exec(select(Role).where(Role.name == name)).first()

def get_multi(
    *, session: Session, skip: int = 0, limit: int = 100
) -> List[Role]:
    return session.exec(select(Role).offset(skip).limit(limit)).all()

def create(*, session: Session, obj_in: RoleCreate) -> Role:
    db_obj = Role(**obj_in.dict())
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def update(
    *, session: Session, db_obj: Role, obj_in: RoleUpdate
) -> Role:
    update_data = obj_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def delete(*, session: Session, id: int) -> bool:
    obj = session.get(Role, id)
    if not obj:
        return False
    session.delete(obj)
    session.commit()
    return True

def get_permissions(*, session: Session, role_id: int) -> List[Permission]:
    role = session.get(Role, role_id)
    if not role:
        return []
    return role.permissions

def add_permission(*, session: Session, role_id: int, permission_id: int) -> bool:
    role = session.get(Role, role_id)
    permission = session.get(Permission, permission_id)
    if not role or not permission:
        return False
    role.permissions.append(permission)
    session.commit()
    return True

def remove_permission(*, session: Session, role_id: int, permission_id: int) -> bool:
    role = session.get(Role, role_id)
    permission = session.get(Permission, permission_id)
    if not role or not permission:
        return False
    role.permissions.remove(permission)
    session.commit()
    return True 