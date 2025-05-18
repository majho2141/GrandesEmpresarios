from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from ..database import get_session
from ..models.address import AddressCreate, AddressRead, AddressUpdate
from ..crud import address as address_crud
from ..routers.auth import get_current_user
from ..models.user import User

router = APIRouter(
    prefix="/addresses",
    tags=["addresses"]
)

@router.post("/", response_model=AddressRead)
def create_address(
    address: AddressCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Asegurarse de que el user_id en la dirección coincida con el usuario actual
    if address.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to create address for another user")
    
    return address_crud.create_address(db, address)

@router.get("/", response_model=List[AddressRead])
def read_addresses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    addresses = address_crud.get_user_addresses(db, current_user.id, skip=skip, limit=limit)
    return addresses

@router.get("/{address_id}", response_model=AddressRead)
def read_address(
    address_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    address = address_crud.get_address(db, address_id)
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    if address.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this address")
    return address

@router.patch("/{address_id}", response_model=AddressRead)
def update_address(
    address_id: int,
    address_update: AddressUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    address = address_crud.get_address(db, address_id)
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    if address.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this address")
    
    updated_address = address_crud.update_address(db, address_id, address_update)
    return updated_address

@router.delete("/{address_id}")
def delete_address(
    address_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    address = address_crud.get_address(db, address_id)
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    if address.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this address")
    
    success = address_crud.delete_address(db, address_id)
    if not success:
        raise HTTPException(status_code=400, detail="Could not delete address")
    return {"message": "Address deleted successfully"}

@router.post("/{address_id}/set-default", response_model=AddressRead)
def set_default_address(
    address_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    address = address_crud.get_address(db, address_id)
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    if address.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to set this address as default")
    
    updated_address = address_crud.set_default_address(db, address_id, current_user.id)
    return updated_address 