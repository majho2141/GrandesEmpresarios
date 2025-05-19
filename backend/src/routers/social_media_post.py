from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.database import get_session
from src.models.social_media_post import SocialMediaPostCreate, SocialMediaPostRead, SocialMediaPostUpdate, PostStatus
from src.crud import social_media_post as crud
from src.routers.auth import get_current_user
from src.models.user import User

router = APIRouter(
    prefix="/social-media-posts",
    tags=["social-media-posts"]
)

@router.post("/", response_model=SocialMediaPostRead)
def create_social_media_post(
    post: SocialMediaPostCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que el usuario pertenece a la empresa del social media account
    social_media_account = db.get("SocialMediaAccount", post.social_media_account_id)
    if not social_media_account:
        raise HTTPException(status_code=404, detail="Social media account not found")
    
    if social_media_account.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to create posts for this social media account")
    
    return crud.create_social_media_post(db, post)

@router.get("/", response_model=List[SocialMediaPostRead])
def read_social_media_posts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.get_social_media_posts(db, skip=skip, limit=limit)

@router.get("/account/{account_id}", response_model=List[SocialMediaPostRead])
def read_account_social_media_posts(
    account_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que el usuario pertenece a la empresa del social media account
    social_media_account = db.get("SocialMediaAccount", account_id)
    if not social_media_account:
        raise HTTPException(status_code=404, detail="Social media account not found")
    
    if social_media_account.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to view posts from this social media account")
    
    return crud.get_account_social_media_posts(db, account_id, skip=skip, limit=limit)

@router.get("/advertisement/{advertisement_id}", response_model=List[SocialMediaPostRead])
def read_advertisement_social_media_posts(
    advertisement_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que el usuario pertenece a la empresa del anuncio
    advertisement = db.get("Advertisement", advertisement_id)
    if not advertisement:
        raise HTTPException(status_code=404, detail="Advertisement not found")
    
    if advertisement.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to view posts from this advertisement")
    
    return crud.get_advertisement_social_media_posts(db, advertisement_id, skip=skip, limit=limit)

@router.get("/scheduled", response_model=List[SocialMediaPostRead])
def read_scheduled_posts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.get_scheduled_posts(db, skip=skip, limit=limit)

@router.get("/{post_id}", response_model=SocialMediaPostRead)
def read_social_media_post(
    post_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    post = crud.get_social_media_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Social media post not found")
    
    # Verificar que el usuario pertenece a la empresa del social media account
    social_media_account = db.get("SocialMediaAccount", post.social_media_account_id)
    if social_media_account.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this post")
    
    return post

@router.patch("/{post_id}", response_model=SocialMediaPostRead)
def update_social_media_post(
    post_id: int,
    post_update: SocialMediaPostUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    post = crud.get_social_media_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Social media post not found")
    
    # Verificar que el usuario pertenece a la empresa del social media account
    social_media_account = db.get("SocialMediaAccount", post.social_media_account_id)
    if social_media_account.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")
    
    updated_post = crud.update_social_media_post(db, post_id, post_update)
    return updated_post

@router.delete("/{post_id}")
def delete_social_media_post(
    post_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    post = crud.get_social_media_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Social media post not found")
    
    # Verificar que el usuario pertenece a la empresa del social media account
    social_media_account = db.get("SocialMediaAccount", post.social_media_account_id)
    if social_media_account.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")
    
    success = crud.delete_social_media_post(db, post_id)
    if not success:
        raise HTTPException(status_code=404, detail="Social media post not found")
    return {"message": "Social media post deleted successfully"}

@router.patch("/{post_id}/status")
def update_post_status(
    post_id: int,
    status: PostStatus,
    platform_post_id: str = None,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    post = crud.get_social_media_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Social media post not found")
    
    # Verificar que el usuario pertenece a la empresa del social media account
    social_media_account = db.get("SocialMediaAccount", post.social_media_account_id)
    if social_media_account.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post's status")
    
    updated_post = crud.update_post_status(db, post_id, status, platform_post_id)
    return {"message": "Post status updated successfully"} 