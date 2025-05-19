import pytest
from fastapi import HTTPException
from src.routers.user import login
from src.config.security import get_password_hash
from datetime import timedelta

# Datos del usuario válido
VALID_USER_EMAIL = "apasta1438@gmail.com"
VALID_USER_PASSWORD = "prueba123"
HASHED_PASSWORD = get_password_hash(VALID_USER_PASSWORD)

@pytest.fixture
def mock_user():
    class MockUser:
        def __init__(self):
            self.id = 1
            self.name = "Test User"
            self.email = VALID_USER_EMAIL
            self.password = HASHED_PASSWORD
            self.phone_number = "1234567890"
            self.document_id = "123456789"
            self.address = "Test Address"
            self.is_active = True
            self.role_id = None
            self.enterprise_id = None

    return MockUser()

@pytest.fixture
def mock_session(mock_user):
    class MockSession:
        def __init__(self):
            self.user = mock_user
            self.return_none = False
        
        def query(self, *args):
            return self
        
        def filter(self, *args):
            return self
        
        def first(self):
            if self.return_none:
                return None
            return self.user
        
        def exec(self, *args):
            return self
            
        def where(self, *args):
            return self

    return MockSession()

@pytest.mark.asyncio
async def test_login_success(mock_session):
    """Prueba un login exitoso con credenciales válidas"""
    class LoginRequest:
        def __init__(self, email, password):
            self.email = email
            self.password = password

    login_data = LoginRequest(email=VALID_USER_EMAIL, password=VALID_USER_PASSWORD)
    result = await login(login_data, mock_session)
    
    assert isinstance(result, dict)
    assert "access_token" in result
    assert "token_type" in result
    assert result["token_type"] == "bearer"

@pytest.mark.asyncio
async def test_login_wrong_password(mock_session):
    """Prueba un login con contraseña incorrecta"""
    class LoginRequest:
        def __init__(self, email, password):
            self.email = email
            self.password = password

    login_data = LoginRequest(email=VALID_USER_EMAIL, password="wrong_password")
    with pytest.raises(HTTPException) as exc_info:
        await login(login_data, mock_session)
    assert exc_info.value.status_code == 401
    assert exc_info.value.detail == "Correo o contraseña incorrectos"

@pytest.mark.asyncio
async def test_login_user_not_found(mock_session):
    """Prueba un login con un usuario que no existe"""
    class LoginRequest:
        def __init__(self, email, password):
            self.email = email
            self.password = password

    mock_session.return_none = True
    login_data = LoginRequest(email="noexiste@example.com", password=VALID_USER_PASSWORD)
    with pytest.raises(HTTPException) as exc_info:
        await login(login_data, mock_session)
    assert exc_info.value.status_code == 401
    assert exc_info.value.detail == "Correo o contraseña incorrectos"

@pytest.mark.asyncio
async def test_login_inactive_user(mock_session, mock_user):
    """Prueba un login con un usuario inactivo"""
    class LoginRequest:
        def __init__(self, email, password):
            self.email = email
            self.password = password

    mock_user.is_active = False
    login_data = LoginRequest(email=VALID_USER_EMAIL, password=VALID_USER_PASSWORD)
    with pytest.raises(HTTPException) as exc_info:
        await login(login_data, mock_session)
    assert exc_info.value.status_code == 401
    assert exc_info.value.detail == "Usuario no activo. Por favor contacte al administrador."

@pytest.mark.asyncio
async def test_login_empty_credentials(mock_session):
    """Prueba un login con credenciales vacías"""
    class LoginRequest:
        def __init__(self, email, password):
            self.email = email
            self.password = password

    login_data = LoginRequest(email="", password="")
    with pytest.raises(HTTPException) as exc_info:
        await login(login_data, mock_session)
    assert exc_info.value.status_code == 401
    assert exc_info.value.detail == "Correo o contraseña incorrectos"

@pytest.mark.asyncio
async def test_login_very_long_password(mock_session):
    """Prueba un login con una contraseña muy larga"""
    class LoginRequest:
        def __init__(self, email, password):
            self.email = email
            self.password = password

    very_long_password = "a" * 1000  # Contraseña de 1000 caracteres
    login_data = LoginRequest(email=VALID_USER_EMAIL, password=very_long_password)
    with pytest.raises(HTTPException) as exc_info:
        await login(login_data, mock_session)
    assert exc_info.value.status_code == 401
    assert exc_info.value.detail == "Correo o contraseña incorrectos" 