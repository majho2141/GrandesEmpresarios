from typing import Generator, Annotated
from sqlmodel import Session
from fastapi import Depends

from src.config.db import get_session

SessionDep = Annotated[Session, Depends(get_session)]