from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

class SocialMediaAccountBase(SQLModel):
    platform_name: str = Field(max_length=50)
    account_name: str = Field(max_length=100)
    access_token: str = Field(max_length=255)
    token_expires_at: datetime
    enterprise_id: int = Field(foreign_key="enterprise.id")
    status: bool = Field(default=True)
    last_connection: datetime = Field(default_factory=datetime.utcnow)

class SocialMediaAccountCreate(SocialMediaAccountBase):
    pass

class SocialMediaAccountRead(SocialMediaAccountBase):
    id: int

class SocialMediaAccountUpdate(SQLModel):
    platform_name: Optional[str] = None
    account_name: Optional[str] = None
    access_token: Optional[str] = None
    token_expires_at: Optional[datetime] = None
    status: Optional[bool] = None
    last_connection: Optional[datetime] = None

class SocialMediaAccount(SocialMediaAccountBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    enterprise: "Enterprise" = Relationship(back_populates="social_media_accounts")
    posts: List["SocialMediaPost"] = Relationship(back_populates="social_media_account") 