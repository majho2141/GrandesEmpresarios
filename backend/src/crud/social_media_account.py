from typing import List, Optional
from sqlmodel import Session, select
from src.models.social_media_account import SocialMediaAccount, SocialMediaAccountCreate, SocialMediaAccountUpdate
from datetime import datetime

def create_social_media_account(db: Session, account: SocialMediaAccountCreate) -> SocialMediaAccount:
    db_account = SocialMediaAccount.model_validate(account)
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account

def get_social_media_account(db: Session, account_id: int) -> Optional[SocialMediaAccount]:
    return db.get(SocialMediaAccount, account_id)

def get_social_media_accounts(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[SocialMediaAccount]:
    query = select(SocialMediaAccount)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def get_enterprise_social_media_accounts(
    db: Session,
    enterprise_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[SocialMediaAccount]:
    query = select(SocialMediaAccount).where(SocialMediaAccount.enterprise_id == enterprise_id)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def get_active_social_media_accounts(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[SocialMediaAccount]:
    query = select(SocialMediaAccount).where(SocialMediaAccount.status == True)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def update_social_media_account(
    db: Session,
    account_id: int,
    account_update: SocialMediaAccountUpdate
) -> Optional[SocialMediaAccount]:
    db_account = get_social_media_account(db, account_id)
    if not db_account:
        return None
    
    account_data = account_update.model_dump(exclude_unset=True)
    for key, value in account_data.items():
        setattr(db_account, key, value)
    
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account

def delete_social_media_account(db: Session, account_id: int) -> bool:
    db_account = get_social_media_account(db, account_id)
    if not db_account:
        return False
    
    db.delete(db_account)
    db.commit()
    return True

def update_last_connection(db: Session, account_id: int) -> Optional[SocialMediaAccount]:
    db_account = get_social_media_account(db, account_id)
    if not db_account:
        return None
    
    db_account.last_connection = datetime.utcnow()
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account 