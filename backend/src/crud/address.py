from typing import List, Optional
from sqlmodel import Session, select

from ..models.address import Address, AddressCreate, AddressUpdate

def create_address(db: Session, address: AddressCreate) -> Address:
    db_address = Address.model_validate(address)
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address

def get_address(db: Session, address_id: int) -> Optional[Address]:
    return db.get(Address, address_id)

def get_user_addresses(
    db: Session, 
    user_id: int, 
    skip: int = 0, 
    limit: int = 100
) -> List[Address]:
    query = select(Address).where(Address.user_id == user_id)
    query = query.offset(skip).limit(limit)
    return list(db.exec(query))

def update_address(
    db: Session, 
    address_id: int, 
    address_update: AddressUpdate
) -> Optional[Address]:
    db_address = get_address(db, address_id)
    if not db_address:
        return None
    
    address_data = address_update.model_dump(exclude_unset=True)
    for key, value in address_data.items():
        setattr(db_address, key, value)
    
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address

def delete_address(db: Session, address_id: int) -> bool:
    db_address = get_address(db, address_id)
    if not db_address:
        return False
    
    db.delete(db_address)
    db.commit()
    return True

def set_default_address(db: Session, address_id: int, user_id: int) -> Optional[Address]:
    # Primero, desactivar todas las direcciones por defecto del usuario
    addresses = get_user_addresses(db, user_id)
    for addr in addresses:
        if addr.is_default:
            addr.is_default = False
            db.add(addr)
    
    # Luego, establecer la nueva dirección por defecto
    db_address = get_address(db, address_id)
    if not db_address:
        return None
    
    db_address.is_default = True
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address 