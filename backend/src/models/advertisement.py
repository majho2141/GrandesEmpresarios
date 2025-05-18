from datetime import date
from enum import Enum
from typing import Optional
from sqlmodel import Field, SQLModel, Relationship

class AdvertisementStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"
    EXPIRED = "expired"

class AdvertisementBase(SQLModel):
    title: str = Field(max_length=100)
    description: str = Field(max_length=255)
    start_date: date
    end_date: date
    cost: float
    status: AdvertisementStatus = Field(default=AdvertisementStatus.PENDING)
    enterprise_id: int = Field(foreign_key="enterprise.id")
    clicks: int = Field(default=0)
    impressions: int = Field(default=0)

class AdvertisementCreate(AdvertisementBase):
    pass

class AdvertisementRead(AdvertisementBase):
    id: int

class AdvertisementUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    cost: Optional[float] = None
    status: Optional[AdvertisementStatus] = None
    clicks: Optional[int] = None
    impressions: Optional[int] = None

class Advertisement(AdvertisementBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    enterprise: "Enterprise" = Relationship(back_populates="advertisements") 