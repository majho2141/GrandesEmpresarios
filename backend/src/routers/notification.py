from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session

from ..database import get_session
from ..models.notification import NotificationCreate, NotificationRead, NotificationUpdate
from ..crud import notification as notification_crud
from .auth import get_current_user
from ..models.user import User

router = APIRouter(
    prefix="/notifications",
    tags=["notifications"]
)

@router.post("/", response_model=NotificationRead)
def create_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return notification_crud.create_notification(db, notification)

@router.get("/", response_model=List[NotificationRead])
def read_notifications(
    skip: int = 0,
    limit: int = 100,
    unread_only: bool = False,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    notifications = notification_crud.get_user_notifications(
        db, 
        current_user.id, 
        skip=skip, 
        limit=limit,
        unread_only=unread_only
    )
    return notifications

@router.get("/{notification_id}", response_model=NotificationRead)
def read_notification(
    notification_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    notification = notification_crud.get_notification(db, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    if notification.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this notification")
    return notification

@router.patch("/{notification_id}", response_model=NotificationRead)
def update_notification(
    notification_id: int,
    notification_update: NotificationUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    notification = notification_crud.get_notification(db, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    if notification.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this notification")
    
    updated_notification = notification_crud.update_notification(
        db, 
        notification_id, 
        notification_update
    )
    return updated_notification

@router.delete("/{notification_id}")
def delete_notification(
    notification_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    notification = notification_crud.get_notification(db, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    if notification.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this notification")
    
    success = notification_crud.delete_notification(db, notification_id)
    if not success:
        raise HTTPException(status_code=400, detail="Could not delete notification")
    return {"message": "Notification deleted successfully"}

@router.post("/{notification_id}/read", response_model=NotificationRead)
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    notification = notification_crud.get_notification(db, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    if notification.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to mark this notification as read")
    
    updated_notification = notification_crud.mark_notification_as_read(db, notification_id)
    return updated_notification

@router.post("/read-all")
def mark_all_as_read(
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    count = notification_crud.mark_all_notifications_as_read(db, current_user.id)
    return {"message": f"Marked {count} notifications as read"} 