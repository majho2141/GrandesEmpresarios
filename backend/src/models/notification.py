from datetime import datetime, UTC
from enum import Enum
from typing import Optional
from sqlmodel import Field, SQLModel, Relationship

class NotificationType(str, Enum):
    SYSTEM = "system"
    ALERT = "alert"
    INFO = "info"
    WARNING = "warning"

class NotificationBase(SQLModel):
    title: str = Field(max_length=100)
    message: str = Field(max_length=500)
    created_date: datetime = Field(default_factory=lambda: datetime.now(UTC))
    read: bool = Field(default=False)
    notification_type: NotificationType
    user_id: int = Field(foreign_key="user.id")
    related_id: Optional[int] = Field(default=None)

class NotificationCreate(NotificationBase):
    pass

class NotificationRead(NotificationBase):
    id: int

class NotificationUpdate(SQLModel):
    title: Optional[str] = None
    message: Optional[str] = None
    read: Optional[bool] = None
    notification_type: Optional[NotificationType] = None
    related_id: Optional[int] = None

class Notification(NotificationBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: "User" = Relationship(back_populates="notifications")

