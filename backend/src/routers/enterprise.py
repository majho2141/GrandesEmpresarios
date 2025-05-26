from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
from src.deps import SessionDep, get_current_user
from src.models.enterprise import Enterprise, EnterpriseRead
from src.models.user import User

router = APIRouter()

@router.get("/enterprises", response_model=List[EnterpriseRead])
async def get_enterprises(
    session: SessionDep,
    current_user: User = Depends(get_current_user)
):
    """
    Get all enterprises. Requires authentication.
    """
    enterprises = session.exec(select(Enterprise)).all()
    return enterprises 