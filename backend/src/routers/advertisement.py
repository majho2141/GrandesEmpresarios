from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from ..database import get_session
from ..models.advertisement import AdvertisementCreate, AdvertisementRead, AdvertisementUpdate, AdvertisementStatus
from ..crud import advertisement as advertisement_crud
from ..crud import enterprise as enterprise_crud
from ..routers.auth import get_current_user
from ..models.user import User

router = APIRouter(
    prefix="/advertisements",
    tags=["advertisements"]
)

@router.post("/", response_model=AdvertisementRead)
def create_advertisement(
    advertisement: AdvertisementCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que el usuario pertenece a la empresa
    enterprise = enterprise_crud.get_enterprise_by_id(session=db, enterprise_id=advertisement.enterprise_id)
    if not enterprise:
        raise HTTPException(status_code=404, detail="Enterprise not found")
    if enterprise.id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to create advertisements for this enterprise")
    
    return advertisement_crud.create_advertisement(db, advertisement)

@router.get("/enterprise/{enterprise_id}", response_model=List[AdvertisementRead])
def read_enterprise_advertisements(
    enterprise_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que el usuario pertenece a la empresa
    enterprise = enterprise_crud.get_enterprise_by_id(session=db, enterprise_id=enterprise_id)
    if not enterprise:
        raise HTTPException(status_code=404, detail="Enterprise not found")
    if enterprise.id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this enterprise's advertisements")
    
    advertisements = advertisement_crud.get_enterprise_advertisements(db, enterprise_id, skip=skip, limit=limit)
    return advertisements

@router.get("/active", response_model=List[AdvertisementRead])
def read_active_advertisements(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session)
):
    advertisements = advertisement_crud.get_active_advertisements(db, skip=skip, limit=limit)
    return advertisements

@router.get("/{advertisement_id}", response_model=AdvertisementRead)
def read_advertisement(
    advertisement_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    advertisement = advertisement_crud.get_advertisement(db, advertisement_id)
    if not advertisement:
        raise HTTPException(status_code=404, detail="Advertisement not found")
    
    # Verificar que el usuario pertenece a la empresa
    if advertisement.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this advertisement")
    
    return advertisement

@router.patch("/{advertisement_id}", response_model=AdvertisementRead)
def update_advertisement(
    advertisement_id: int,
    advertisement_update: AdvertisementUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    advertisement = advertisement_crud.get_advertisement(db, advertisement_id)
    if not advertisement:
        raise HTTPException(status_code=404, detail="Advertisement not found")
    
    # Verificar que el usuario pertenece a la empresa
    if advertisement.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this advertisement")
    
    updated_advertisement = advertisement_crud.update_advertisement(db, advertisement_id, advertisement_update)
    return updated_advertisement

@router.delete("/{advertisement_id}")
def delete_advertisement(
    advertisement_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    advertisement = advertisement_crud.get_advertisement(db, advertisement_id)
    if not advertisement:
        raise HTTPException(status_code=404, detail="Advertisement not found")
    
    # Verificar que el usuario pertenece a la empresa
    if advertisement.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this advertisement")
    
    success = advertisement_crud.delete_advertisement(db, advertisement_id)
    if not success:
        raise HTTPException(status_code=400, detail="Could not delete advertisement")
    return {"message": "Advertisement deleted successfully"}

@router.post("/{advertisement_id}/click")
def increment_advertisement_clicks(
    advertisement_id: int,
    db: Session = Depends(get_session)
):
    advertisement = advertisement_crud.increment_clicks(db, advertisement_id)
    if not advertisement:
        raise HTTPException(status_code=404, detail="Advertisement not found")
    return {"message": "Click registered successfully"}

@router.post("/{advertisement_id}/impression")
def increment_advertisement_impressions(
    advertisement_id: int,
    db: Session = Depends(get_session)
):
    advertisement = advertisement_crud.increment_impressions(db, advertisement_id)
    if not advertisement:
        raise HTTPException(status_code=404, detail="Advertisement not found")
    return {"message": "Impression registered successfully"}

@router.patch("/{advertisement_id}/status")
def update_advertisement_status(
    advertisement_id: int,
    status: AdvertisementStatus,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    advertisement = advertisement_crud.get_advertisement(db, advertisement_id)
    if not advertisement:
        raise HTTPException(status_code=404, detail="Advertisement not found")
    
    # Verificar que el usuario pertenece a la empresa
    if advertisement.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this advertisement's status")
    
    updated_advertisement = advertisement_crud.update_advertisement_status(db, advertisement_id, status)
    return {"message": "Advertisement status updated successfully"} 