from datetime import datetime
from typing import Optional
from enum import Enum
from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy import Text

class PostStatus(str, Enum):
    DRAFT = "DRAFT"
    SCHEDULED = "SCHEDULED"
    PUBLISHED = "PUBLISHED"
    FAILED = "FAILED"

class SocialMediaPostBase(SQLModel):
    content: str = Field(sa_type=Text)
    media_url: Optional[str] = Field(max_length=255, default=None)
    platform_post_id: Optional[str] = Field(max_length=100, default=None)
    post_date: Optional[datetime] = None
    scheduled_date: Optional[datetime] = None
    status: PostStatus = Field(default=PostStatus.DRAFT)
    target_audience: Optional[str] = Field(sa_type=Text, default=None)
    budget: Optional[float] = Field(default=0.0)
    social_media_account_id: int = Field(foreign_key="socialmediaaccount.id")
    advertisement_id: Optional[int] = Field(foreign_key="advertisement.id", default=None)

class SocialMediaPostCreate(SocialMediaPostBase):
    pass

class SocialMediaPostRead(SocialMediaPostBase):
    id: int

class SocialMediaPostUpdate(SQLModel):
    content: Optional[str] = None
    media_url: Optional[str] = None
    platform_post_id: Optional[str] = None
    post_date: Optional[datetime] = None
    scheduled_date: Optional[datetime] = None
    status: Optional[PostStatus] = None
    target_audience: Optional[str] = None
    budget: Optional[float] = None
    advertisement_id: Optional[int] = None

class SocialMediaPost(SocialMediaPostBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    social_media_account: "SocialMediaAccount" = Relationship(back_populates="posts")
    advertisement: Optional["Advertisement"] = Relationship(back_populates="social_media_posts") 