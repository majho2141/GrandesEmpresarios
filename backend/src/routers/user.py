from typing import Any, Annotated
from datetime import timedelta
from pathlib import Path
from src.config.security import ALGORITHM
from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.responses import JSONResponse
from sqlmodel import col, delete, func, select, Session
from pydantic import BaseModel
import jinja2
import jwt

from src.crud import user as crud
from src.crud import enterprise as enterprise_crud
from src.config.db import get_session
from src.config.security import create_access_token, create_password_reset_token, verify_password_reset_token, get_password_hash
from src.utils.email import send_email, generate_email_verification_token, verify_email_token
from src.models.role import Role

from src.config.settings import settings

from src.deps import (
    SessionDep,
    get_current_user,
    get_current_superuser
)

from src.models.user import User, UserCreate, UserRead, UserReadWithDetails, UserUpdate

class LoginRequest(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

router = APIRouter()

# Password reset request model
class PasswordResetRequest(BaseModel):
    email: str

# Password reset confirmation model
class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str

class EmailVerificationRequest(BaseModel):
    token: str

class PasswordChangeRequest(BaseModel):
    old_password: str
    new_password: str

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest, session: SessionDep):
    """
    Login para obtener el token de acceso
    """
    user = crud.authenticate_user(
        session=session, email=login_data.email, password=login_data.password
    )
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Correo o contraseña incorrectos"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=401,
            detail="Usuario no activo. Por favor contacte al administrador."
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.document_id,
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me", response_model=UserReadWithDetails)
async def get_current_user_info(
    current_user: Annotated[User, Depends(get_current_user)]
):
    """
    Obtener información del usuario actual incluyendo rol y empresa
    """
    return current_user

@router.get("/users/{document_id}", response_model=UserReadWithDetails)
async def get_user_by_document(
    document_id: str,
    session: SessionDep,
    current_user: Annotated[User, Depends(get_current_superuser)]
):
    """
    Obtener usuario por número de documento (solo administradores)
    """
    user = crud.get_user_by_document(session=session, document_id=document_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    return user

@router.post("/register", response_model=UserRead)
async def create_user(user: UserCreate, session: SessionDep):
    """
    Registrar nuevo usuario
    """
    # Verificar si el correo ya está registrado
    db_user = crud.get_user_by_email(session=session, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
    # Verificar si el documento ya está registrado
    db_user = crud.get_user_by_document(session=session, document_id=user.document_id)
    if db_user:
        raise HTTPException(status_code=400, detail="El documento ya está registrado")
    
    try:
        # Si hay datos de empresa, crear la empresa primero
        if user.enterprise:
            # Verificar si el NIT ya está registrado
            existing_enterprise = enterprise_crud.get_enterprise_by_nit(session=session, nit=user.enterprise.NIT)
            if existing_enterprise:
                raise HTTPException(status_code=400, detail="El NIT ya está registrado")
            
            # Crear la empresa
            enterprise = enterprise_crud.create_enterprise(session=session, enterprise=user.enterprise)
            
            # Asignar el ID de la empresa al usuario
            user.enterprise_id = enterprise.id
            
            # Asignar rol de EMPLOYEE
            employee_role = session.exec(select(Role).where(Role.name == "EMPLOYEE")).first()
            if not employee_role:
                raise HTTPException(status_code=500, detail="El rol EMPLOYEE no existe")
            user.role_id = employee_role.id
        else:
            # Si no hay datos de empresa, asignar rol de CLIENT
            client_role = session.exec(select(Role).where(Role.name == "CLIENT")).first()
            if not client_role:
                raise HTTPException(status_code=500, detail="El rol CLIENT no existe")
            user.role_id = client_role.id
        
        # Crear el usuario
        new_user = crud.create_user(session=session, user_create=user)
        
        # Generar código de verificación
        verification_code = crud.generate_verification_code(session=session, email=new_user.email)
        
        # Enviar email de verificación
        env = jinja2.Environment(
            loader=jinja2.FileSystemLoader("src/email-templates/build/")
        )
        template = env.get_template("verify_email.html")
        
        html_content = template.render(
            project_name=settings.PROJECT_NAME,
            username=new_user.name,
            verification_code=verification_code
        )
        
        result = send_email(
            to_email=new_user.email,
            subject=f"{settings.PROJECT_NAME} - Verifica tu correo electrónico",
            html_content=html_content
        )
        
        if not result:
            print("Error al enviar el correo de verificación")
        
        return new_user
        
    except Exception as e:
        # Si ocurre un error, hacer rollback de la transacción
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error al crear el usuario: {str(e)}"
        )

@router.put("/users/{document_id}", response_model=UserRead)
async def update_user(
    document_id: str,
    user_update: UserUpdate,
    session: SessionDep,
    current_user: Annotated[User, Depends(get_current_user)]
):
    """
    Actualizar usuario
    """
    if not current_user.role.name == "ADMIN" and current_user.document_id != document_id:
        raise HTTPException(
            status_code=403,
            detail="No tienes permiso para actualizar este usuario"
        )
    
    updated_user = crud.update_user(
        session=session,
        document_id=document_id,
        user_update=user_update
    )
    if not updated_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return updated_user

@router.delete("/users/{document_id}")
async def delete_user(
    document_id: str,
    session: SessionDep,
    current_user: Annotated[User, Depends(get_current_superuser)]
):
    """
    Eliminar usuario (solo superusuarios)
    """
    if current_user.document_id == document_id:
        raise HTTPException(
            status_code=400,
            detail="No puedes eliminar tu propia cuenta"
        )
    
    success = crud.delete_user(session=session, document_id=document_id)
    if not success:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    return {"message": "Usuario eliminado correctamente"}

@router.post("/verify-code")
async def verify_code(email: str, code: str, session: SessionDep):
    if not crud.verify_code(session=session, email=email, code=code):
        raise HTTPException(status_code=400, detail="Invalid or expired code")
    
    db_user = crud.get_user_by_email(session=session, email=email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_user.is_active = True
    session.add(db_user)
    session.commit()
    
    return JSONResponse(
        status_code=200,
        content={"message": "Email verified successfully"}
    )

@router.post("/resend-code")
async def resend_code(email: str, session: SessionDep):
    user = crud.get_user_by_email(session=session, email=email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.is_active:
        raise HTTPException(status_code=400, detail="User already verified")
    
    try:
        # Generar nuevo código de verificación
        verification_code = crud.generate_verification_code(session=session, email=email)
        
        # Cargar y renderizar plantilla de email
        env = jinja2.Environment(
            loader=jinja2.FileSystemLoader("src/email-templates/build/")
        )
        template = env.get_template("verify_email.html")
        
        html_content = template.render(
            project_name=settings.PROJECT_NAME,
            username=user.name,
            verification_code=verification_code
        )
        
        # Enviar email de verificación
        result = send_email(
            to_email=email,
            subject=f"{settings.PROJECT_NAME} - Verifica tu correo electrónico",
            html_content=html_content
        )
        
        if not result:
            raise HTTPException(
                status_code=500,
                detail="Error al enviar el correo de verificación"
            )
        
        return JSONResponse(
            status_code=200,
            content={"message": "Correo de verificación enviado correctamente"}
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error al enviar correo de verificación: {str(e)}"
        )

@router.post("/password-reset/request")
async def request_password_reset(request: PasswordResetRequest, session: SessionDep):
    """
    Solicitar restablecimiento de contraseña
    """
    user = crud.get_user_by_email(session=session, email=request.email)
    if not user:
        return JSONResponse(
            status_code=200,
            content={"message": "Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña"}
        )
    
    try:
        token = create_password_reset_token(user.document_id)
        
        # Cargar y renderizar plantilla de email
        env = jinja2.Environment(
            loader=jinja2.FileSystemLoader("src/email-templates/build/")
        )
        
        template = env.get_template("reset_password.html")
        
        html_content = template.render(
            project_name=settings.PROJECT_NAME,
            username=user.name,
            token=token
        )
        
        # Enviar email de restablecimiento
        result = send_email(
            to_email=user.email,
            subject="Restablecimiento de Contraseña",
            html_content=html_content
        )
        
        if not result:
            print(f"Error al enviar correo de restablecimiento a {user.email}")
            raise HTTPException(
                status_code=500,
                detail="Error al enviar el correo de restablecimiento"
            )
        
        return JSONResponse(
            status_code=200,
            content={"message": "Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña"}
        )
    except Exception as e:
        print(f"Error al enviar correo de restablecimiento: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al procesar la solicitud de restablecimiento de contraseña"
        )

@router.post("/password-reset/confirm")
async def confirm_password_reset(reset_data: PasswordResetConfirm, session: SessionDep):
    """
    Confirmar restablecimiento de contraseña
    """
    document_id = verify_password_reset_token(reset_data.token)
    if not document_id:
        raise HTTPException(status_code=400, detail="Token inválido o expirado")
    
    user = crud.get_user_by_document(session=session, document_id=document_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Update password
    user.password = get_password_hash(reset_data.new_password)
    session.add(user)
    session.commit()
    
    return JSONResponse(
        status_code=200,
        content={"message": "Contraseña actualizada correctamente"}
    )

@router.post("/verify-email")
async def verify_email(verification_data: EmailVerificationRequest, session: SessionDep):
    """
    Verificar el correo electrónico mediante token
    """
    try:
        # Verificar token y obtener email
        email = verify_email_token(verification_data.token)
        
        # Buscar usuario por email
        user = crud.get_user_by_email(session=session, email=email)
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
        # Activar usuario
        if user.is_active:
            return {"message": "El correo ya ha sido verificado anteriormente"}
        
        user.is_active = True
        session.add(user)
        session.commit()
        
        return {"message": "Correo verificado correctamente"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Token inválido: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al verificar correo: {str(e)}")

@router.get("/users", response_model=list[UserReadWithDetails])
async def get_all_users(
    session: SessionDep,
    current_user: Annotated[User, Depends(get_current_superuser)]
):
    """
    Obtener todos los usuarios del sistema (solo administradores)
    """
    users = crud.get_all_users(session=session)
    return users

@router.post("/test-email")
async def test_email(email: str):
    """
    Endpoint para probar el envío de correos electrónicos
    """
    try:
        # Configuración básica del correo
        subject = f"{settings.PROJECT_NAME} - Prueba de correo electrónico"
        
        # Contenido HTML simple del correo
        html_content = f"""
        <html>
        <body>
            <h1>Prueba de correo electrónico</h1>
            <p>Este es un correo de prueba enviado desde {settings.PROJECT_NAME}.</p>
            <p>Si estás viendo este mensaje, la configuración de correo electrónico está funcionando correctamente.</p>
            <p>Configuración SMTP actual:</p>
            <ul>
                <li>Host: {settings.SMTP_HOST}</li>
                <li>Puerto: {settings.SMTP_PORT}</li>
                <li>Remitente: {settings.EMAILS_FROM_EMAIL}</li>
                <li>TLS: {settings.SMTP_TLS}</li>
                <li>SSL: {settings.SMTP_SSL}</li>
            </ul>
        </body>
        </html>
        """
        
        # Enviar correo
        result = send_email(
            to_email=email,
            subject=subject,
            html_content=html_content
        )
        
        if result:
            return {"message": f"Correo de prueba enviado correctamente a {email}"}
        else:
            return {"message": "Error al enviar el correo. Revisa los logs del servidor para más detalles."}
    except Exception as e:
        raise HTTPException(    
            status_code=500,
            detail=f"Error al enviar correo de prueba: {str(e)}"
        )

@router.patch("/change-password")
async def change_password(
    password_data: PasswordChangeRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    """
    Cambiar la contraseña del usuario actual.
    Se requiere la contraseña anterior para verificar.
    """
    # Verificar la contraseña actual
    if not crud.verify_user_password(
        session=session,
        user_id=current_user.document_id,
        password=password_data.old_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Contraseña actual incorrecta"
        )
    
    # Actualizar la contraseña
    try:
        current_user.password = get_password_hash(password_data.new_password)
        session.add(current_user)
        session.commit()
        return {"message": "Contraseña actualizada correctamente"}
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail="Error al actualizar la contraseña"
        )

@router.patch("/admin/change-user-password/{document_id}")
async def admin_change_user_password(
    document_id: str,
    new_password: str,
    current_user: Annotated[User, Depends(get_current_superuser)],
    session: SessionDep
):
    """
    Cambiar la contraseña de cualquier usuario (solo administradores)
    """
    # Buscar el usuario
    user = crud.get_user_by_document(session=session, document_id=document_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )
    
    # Actualizar la contraseña
    try:
        user.password = get_password_hash(new_password)
        session.add(user)
        session.commit()
        return {"message": f"Contraseña del usuario {user.name} actualizada correctamente"}
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail="Error al actualizar la contraseña"
        )

