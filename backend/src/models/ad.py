from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from pydantic import BaseModel


class AdGenerated(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user_id: int = Field(foreign_key="user.id")
    enterprise_id: int = Field(foreign_key="enterprise.id")

    user: Optional["User"] = Relationship(back_populates="ads")
    enterprise: Optional["Enterprise"] = Relationship(back_populates="ads")


class AdGeneratedRead(BaseModel):
    id: int
    content: str
    created_at: datetime

    class Config:
        orm_mode = True
