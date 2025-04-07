from sqlmodel import Session, select
from src.models.enterprise import Enterprise, EnterpriseCreate

def create_enterprise(*, session: Session, enterprise: EnterpriseCreate) -> Enterprise:
    db_enterprise = Enterprise(**enterprise.model_dump())
    session.add(db_enterprise)
    session.commit()
    session.refresh(db_enterprise)
    return db_enterprise

def get_enterprise_by_nit(*, session: Session, nit: str) -> Enterprise | None:
    return session.exec(select(Enterprise).where(Enterprise.NIT == nit)).first()

def get_enterprise_by_id(*, session: Session, enterprise_id: int) -> Enterprise | None:
    return session.exec(select(Enterprise).where(Enterprise.id == enterprise_id)).first() 