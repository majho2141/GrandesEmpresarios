import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from src.main import app
from src.config.db import get_session
from src.models.user import User
from src.config.security import get_password_hash
import os

# Datos del usuario válido
VALID_USER_EMAIL = "apasta1438@gmail.com"
VALID_USER_PASSWORD = "prueba123"
HASHED_PASSWORD = get_password_hash(VALID_USER_PASSWORD)

# Configuración de la base de datos de prueba
TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DATABASE_URL)

@pytest.fixture(scope="session")
def test_db():
    SQLModel.metadata.create_all(engine)
    yield engine
    SQLModel.metadata.drop_all(engine)
    if os.path.exists("./test.db"):
        os.remove("./test.db")

@pytest.fixture
def session(test_db):
    with Session(test_db) as session:
        yield session

@pytest.fixture
def client(session):
    def override_get_session():
        yield session
    
    app.dependency_overrides[get_session] = override_get_session
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()

@pytest.fixture
def test_user(session):
    # Limpiar la tabla de usuarios antes de cada prueba
    session.query(User).delete()
    session.commit()
    
    user = User(
        name="Test User",
        email=VALID_USER_EMAIL,
        password=HASHED_PASSWORD,
        phone_number="1234567890",
        document_id="123456789",
        address="Test Address",
        is_active=True
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@pytest.mark.asyncio
async def test_login_success(client, test_user):
    """Prueba un login exitoso con credenciales válidas"""
    response = client.post(
        "/api/v1/users/login",
        json={
            "email": VALID_USER_EMAIL,
            "password": VALID_USER_PASSWORD
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "token_type" in data
    assert data["token_type"] == "bearer"

@pytest.mark.asyncio
async def test_login_wrong_password(client, test_user):
    """Prueba un login con contraseña incorrecta"""
    response = client.post(
        "/api/v1/users/login",
        json={
            "email": VALID_USER_EMAIL,
            "password": "wrong_password"
        }
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Correo o contraseña incorrectos"

@pytest.mark.asyncio
async def test_login_wrong_email(client):
    """Prueba un login con un email que no existe"""
    response = client.post(
        "/api/v1/users/login",
        json={
            "email": "noexiste@example.com",
            "password": VALID_USER_PASSWORD
        }
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Correo o contraseña incorrectos"

@pytest.mark.asyncio
async def test_login_inactive_user(client, session, test_user):
    """Prueba un login con un usuario inactivo"""
    test_user.is_active = False
    session.add(test_user)
    session.commit()

    response = client.post(
        "/api/v1/users/login",
        json={
            "email": VALID_USER_EMAIL,
            "password": VALID_USER_PASSWORD
        }
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Usuario no activo. Por favor contacte al administrador."

def test_protected_route_with_token(client, test_user):
    # Primero obtener el token
    login_response = client.post(
        "/api/v1/users/login",
        json={
            "email": VALID_USER_EMAIL,
            "password": VALID_USER_PASSWORD
        }
    )
    token = login_response.json()["access_token"]
    
    # Intentar acceder a una ruta protegida
    response = client.get(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == VALID_USER_EMAIL

def test_protected_route_without_token(client):
    response = client.get("/api/v1/users/me")
    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated" 