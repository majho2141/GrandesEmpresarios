from sqlmodel import Session
from src.models.ad import AdGenerated
from datetime import datetime

def save_ad(session: Session, content: str, user_id: int, enterprise_id: int) -> AdGenerated:
    ad = AdGenerated(
        content=content,
        user_id=user_id,
        enterprise_id=enterprise_id,
        created_at=datetime.utcnow()
    )
    session.add(ad)
    session.commit()
    session.refresh(ad)
    return ad
