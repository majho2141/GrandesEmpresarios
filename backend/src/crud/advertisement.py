from typing import List, Optional
from sqlmodel import Session, select
from datetime import date

from ..models.advertisement import Advertisement, AdvertisementCreate, AdvertisementUpdate, AdvertisementStatus

def create_advertisement(db: Session, advertisement: AdvertisementCreate) -> Advertisement:
    db_advertisement = Advertisement.model_validate(advertisement)
    db.add(db_advertisement)
    db.commit()
    db.refresh(db_advertisement)
    return db_advertisement

def get_advertisement(db: Session, advertisement_id: int) -> Optional[Advertisement]:
    return db.get(Advertisement, advertisement_id)

def get_enterprise_advertisements(
    db: Session,
    enterprise_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[Advertisement]:
    query = select(Advertisement).where(Advertisement.enterprise_id == enterprise_id)
    query = query.offset(skip).limit(limit)
    return list(db.exec(query))

def get_active_advertisements(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[Advertisement]:
    query = select(Advertisement).where(Advertisement.status == AdvertisementStatus.ACTIVE)
    query = query.offset(skip).limit(limit)
    return list(db.exec(query))

def update_advertisement(
    db: Session,
    advertisement_id: int,
    advertisement_update: AdvertisementUpdate
) -> Optional[Advertisement]:
    db_advertisement = get_advertisement(db, advertisement_id)
    if not db_advertisement:
        return None
    
    advertisement_data = advertisement_update.model_dump(exclude_unset=True)
    for key, value in advertisement_data.items():
        setattr(db_advertisement, key, value)
    
    db.add(db_advertisement)
    db.commit()
    db.refresh(db_advertisement)
    return db_advertisement

def delete_advertisement(db: Session, advertisement_id: int) -> bool:
    db_advertisement = get_advertisement(db, advertisement_id)
    if not db_advertisement:
        return False
    
    db.delete(db_advertisement)
    db.commit()
    return True

def increment_clicks(db: Session, advertisement_id: int) -> Optional[Advertisement]:
    db_advertisement = get_advertisement(db, advertisement_id)
    if not db_advertisement:
        return None
    
    db_advertisement.clicks += 1
    db.add(db_advertisement)
    db.commit()
    db.refresh(db_advertisement)
    return db_advertisement

def increment_impressions(db: Session, advertisement_id: int) -> Optional[Advertisement]:
    db_advertisement = get_advertisement(db, advertisement_id)
    if not db_advertisement:
        return None
    
    db_advertisement.impressions += 1
    db.add(db_advertisement)
    db.commit()
    db.refresh(db_advertisement)
    return db_advertisement

def update_advertisement_status(db: Session, advertisement_id: int, status: AdvertisementStatus) -> Optional[Advertisement]:
    db_advertisement = get_advertisement(db, advertisement_id)
    if not db_advertisement:
        return None
    
    db_advertisement.status = status
    db.add(db_advertisement)
    db.commit()
    db.refresh(db_advertisement)
    return db_advertisement 