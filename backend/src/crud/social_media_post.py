from typing import List, Optional
from sqlmodel import Session, select
from src.models.social_media_post import SocialMediaPost, SocialMediaPostCreate, SocialMediaPostUpdate, PostStatus
from datetime import datetime

def create_social_media_post(db: Session, post: SocialMediaPostCreate) -> SocialMediaPost:
    db_post = SocialMediaPost.model_validate(post)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_social_media_post(db: Session, post_id: int) -> Optional[SocialMediaPost]:
    return db.get(SocialMediaPost, post_id)

def get_social_media_posts(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[SocialMediaPost]:
    query = select(SocialMediaPost)
    query = query.offset(skip).limit(limit)
    return list(db.exec(query))

def get_account_social_media_posts(
    db: Session,
    account_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[SocialMediaPost]:
    query = select(SocialMediaPost).where(SocialMediaPost.social_media_account_id == account_id)
    query = query.offset(skip).limit(limit)
    return list(db.exec(query))

def get_advertisement_social_media_posts(
    db: Session,
    advertisement_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[SocialMediaPost]:
    query = select(SocialMediaPost).where(SocialMediaPost.advertisement_id == advertisement_id)
    query = query.offset(skip).limit(limit)
    return list(db.exec(query))

def get_scheduled_posts(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[SocialMediaPost]:
    query = select(SocialMediaPost).where(
        SocialMediaPost.status == PostStatus.SCHEDULED,
        SocialMediaPost.scheduled_date > datetime.utcnow()
    )
    query = query.offset(skip).limit(limit)
    return list(db.exec(query))

def update_social_media_post(
    db: Session,
    post_id: int,
    post_update: SocialMediaPostUpdate
) -> Optional[SocialMediaPost]:
    db_post = get_social_media_post(db, post_id)
    if not db_post:
        return None
    
    post_data = post_update.model_dump(exclude_unset=True)
    for key, value in post_data.items():
        setattr(db_post, key, value)
    
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def delete_social_media_post(db: Session, post_id: int) -> bool:
    db_post = get_social_media_post(db, post_id)
    if not db_post:
        return False
    
    db.delete(db_post)
    db.commit()
    return True

def update_post_status(
    db: Session,
    post_id: int,
    status: PostStatus,
    platform_post_id: Optional[str] = None
) -> Optional[SocialMediaPost]:
    db_post = get_social_media_post(db, post_id)
    if not db_post:
        return None
    
    db_post.status = status
    if platform_post_id:
        db_post.platform_post_id = platform_post_id
    if status == PostStatus.PUBLISHED:
        db_post.post_date = datetime.utcnow()
    
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post 