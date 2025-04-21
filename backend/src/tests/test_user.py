import pytest
from src.models.user import User
from src.crud.user import create_user, get_user_by_email, get_user_by_document

def test_create_user(session, test_user_data):
    # Crear un usuario
    user = create_user(session, test_user_data)
    
    # Verificar que el usuario se creó correctamente
    assert user.id is not None
    assert user.email == test_user_data["email"]
    assert user.name == test_user_data["name"]
    assert user.phone_number == test_user_data["phone_number"]
    assert user.document_id == test_user_data["document_id"]
    assert user.address == test_user_data["address"]
    assert user.document_verified == test_user_data["document_verified"]
    assert user.enterprise_id == test_user_data["enterprise_id"]

def test_get_user_by_email(session, test_user_data):
    # Crear un usuario primero
    create_user(session, test_user_data)
    
    # Buscar el usuario por email
    user = get_user_by_email(session, test_user_data["email"])
    
    # Verificar que se encontró el usuario correcto
    assert user is not None
    assert user.email == test_user_data["email"]

def test_get_user_by_document(session, test_user_data):
    # Crear un usuario primero
    create_user(session, test_user_data)
    
    # Buscar el usuario por documento
    user = get_user_by_document(session, test_user_data["document_id"])
    
    # Verificar que se encontró el usuario correcto
    assert user is not None
    assert user.document_id == test_user_data["document_id"]

def test_user_not_found(session):
    # Intentar buscar un usuario que no existe
    user = get_user_by_email(session, "nonexistent@example.com")
    assert user is None
    
    user = get_user_by_document(session, "999999999")
    assert user is None 