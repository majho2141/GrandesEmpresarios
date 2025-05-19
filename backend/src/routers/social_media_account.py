from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.database import get_session
from src.models.social_media_account import SocialMediaAccountCreate, SocialMediaAccountRead, SocialMediaAccountUpdate
from src.crud import social_media_account as crud
from src.routers.auth import get_current_user
from src.models.user import User

router = APIRouter(
    prefix="/social-media-accounts",
    tags=["social-media-accounts"]
)

@router.post("/", response_model=SocialMediaAccountRead)
def create_social_media_account(
    account: SocialMediaAccountCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que el usuario pertenece a la empresa
    if account.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to create social media accounts for this enterprise")
    return crud.create_social_media_account(db, account)

@router.get("/", response_model=List[SocialMediaAccountRead])
def read_social_media_accounts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.get_social_media_accounts(db, skip=skip, limit=limit)

@router.get("/enterprise/{enterprise_id}", response_model=List[SocialMediaAccountRead])
def read_enterprise_social_media_accounts(
    enterprise_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que el usuario pertenece a la empresa
    if enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this enterprise's social media accounts")
    return crud.get_enterprise_social_media_accounts(db, enterprise_id, skip=skip, limit=limit)

@router.get("/active", response_model=List[SocialMediaAccountRead])
def read_active_social_media_accounts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.get_active_social_media_accounts(db, skip=skip, limit=limit)

@router.get("/{account_id}", response_model=SocialMediaAccountRead)
def read_social_media_account(
    account_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    account = crud.get_social_media_account(db, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Social media account not found")
    return account

@router.patch("/{account_id}", response_model=SocialMediaAccountRead)
def update_social_media_account(
    account_id: int,
    account_update: SocialMediaAccountUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    account = crud.get_social_media_account(db, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Social media account not found")
    
    # Verificar que el usuario pertenece a la empresa
    if account.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this social media account")
    
    updated_account = crud.update_social_media_account(db, account_id, account_update)
    return updated_account

@router.delete("/{account_id}")
def delete_social_media_account(
    account_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    account = crud.get_social_media_account(db, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Social media account not found")
    
    # Verificar que el usuario pertenece a la empresa
    if account.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this social media account")
    
    success = crud.delete_social_media_account(db, account_id)
    if not success:
        raise HTTPException(status_code=404, detail="Social media account not found")
    return {"message": "Social media account deleted successfully"}

@router.post("/{account_id}/update-connection")
def update_last_connection(
    account_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    account = crud.get_social_media_account(db, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Social media account not found")
    
    # Verificar que el usuario pertenece a la empresa
    if account.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this social media account")
    
    updated_account = crud.update_last_connection(db, account_id)
    return {"message": "Last connection updated successfully"} 