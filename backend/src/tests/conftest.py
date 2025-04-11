import pytest
from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.pool import StaticPool
from src.core.config import settings

@pytest.fixture
def test_db():
    # Crear una base de datos en memoria para pruebas
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    return engine

@pytest.fixture
def session(test_db):
    # Crear una sesión para cada prueba
    with Session(test_db) as session:
        yield session

@pytest.fixture
def test_user_data():
    # Datos de prueba para un usuario
    return {
        "name": "Test User",
        "email": "test@example.com",
        "phone_number": "1234567890",
        "document_id": "123456789",
        "address": "Test Address",
        "document_verified": False,
        "password": "testpassword",
        "enterprise_id": 1
    } 