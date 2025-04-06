from sqlmodel import Session, create_engine, select, SQLModel
from src.config.settings import settings

# Usar PostgreSQL con la URI de la configuración
engine = create_engine(settings.POSTGRES_URI)


def get_session():
    with Session(engine) as session:
        yield session


def init_db(session: Session):
    # Crea todas las tablas
    SQLModel.metadata.create_all(engine)
