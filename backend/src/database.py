from sqlmodel import SQLModel, Session, create_engine
from sqlalchemy.orm import sessionmaker
from src.core.config import settings

engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URI,
    pool_pre_ping=True,
    pool_recycle=300,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

def init_db():
    SQLModel.metadata.create_all(engine) 