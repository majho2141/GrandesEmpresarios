from typing import List, Optional
from sqlmodel import Session, select
from datetime import datetime

from ..models.notification import Notification, NotificationCreate, NotificationUpdate

def create_notification(db: Session, notification: NotificationCreate) -> Notification:
    db_notification = Notification.model_validate(notification)
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

def get_notification(db: Session, notification_id: int) -> Optional[Notification]:
    return db.get(Notification, notification_id)

def get_user_notifications(
    db: Session, 
    user_id: int, 
    skip: int = 0, 
    limit: int = 100,
    unread_only: bool = False
) -> List[Notification]:
    query = select(Notification).where(Notification.user_id == user_id)
    if unread_only:
        query = query.where(Notification.read == False)
    query = query.offset(skip).limit(limit)
    return list(db.exec(query))

def update_notification(
    db: Session, 
    notification_id: int, 
    notification_update: NotificationUpdate
) -> Optional[Notification]:
    db_notification = get_notification(db, notification_id)
    if not db_notification:
        return None
    
    notification_data = notification_update.dict(exclude_unset=True)
    for key, value in notification_data.items():
        setattr(db_notification, key, value)
    
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

def delete_notification(db: Session, notification_id: int) -> bool:
    db_notification = get_notification(db, notification_id)
    if not db_notification:
        return False
    
    db.delete(db_notification)
    db.commit()
    return True

def mark_notification_as_read(db: Session, notification_id: int) -> Optional[Notification]:
    db_notification = get_notification(db, notification_id)
    if not db_notification:
        return None
    
    db_notification.read = True
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

def mark_all_notifications_as_read(db: Session, user_id: int) -> int:
    notifications = get_user_notifications(db, user_id, unread_only=True)
    for notification in notifications:
        notification.read = True
        db.add(notification)
    db.commit()
    return len(notifications) 