from typing import Any
from datetime import timedelta
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import col, delete, func, select
from pydantic import BaseModel
import jinja2

from src.crud import user as crud
from src.config.db import get_session
from src.config.security import create_access_token
from src.utils.email import send_email, generate_email_verification_token, verify_email_token

from src.config.settings import settings

from src.deps import (
    SessionDep,
)

from src.models.user import User, UserCreate, UserResponse

class LoginRequest(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest, session: SessionDep):
    user = crud.authenticate_user(
        session=session, email=login_data.email, password=login_data.password
    )
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    if not user.is_active:
        raise HTTPException(status_code=401, detail="Please verify your email first")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.email, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users", response_model=list[UserResponse])
async def get_users(session: SessionDep):
    return crud.get_all_users(session=session)


@router.get("/users/{email}", response_model=UserResponse)
async def get_user_by_email(email: str, session: SessionDep):
    user = crud.get_user_by_email(session=session, email=email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/register", response_model=UserResponse)
async def create_user(user: UserCreate, session: SessionDep):
    db_user = crud.get_user_by_email(session=session, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user with is_active=False
    new_user = crud.create_user(session=session, user_create=user)
    
    # Generate verification code
    verification_code = crud.generate_verification_code(session=session, email=new_user.email)
    
    # Load and render email template
    with open(Path("src/email-templates/build/verify_email.html")) as f:
        template = jinja2.Template(f.read())
    
    html_content = template.render(
        project_name=settings.PROJECT_NAME,
        verification_code=verification_code
    )
    
    # Send verification email
    send_email(
        to_email=new_user.email,
        subject=f"{settings.PROJECT_NAME} - Verify your account",
        html_content=html_content
    )
    
    return JSONResponse(
        status_code=200,
        content={"message": "User registered successfully. Please check your email for verification code."}
    )

@router.post("/verify-code")
async def verify_code(email: str, code: str, session: SessionDep):
    if not crud.verify_code(session=session, email=email, code=code):
        raise HTTPException(status_code=400, detail="Invalid or expired code")
    
    user = crud.get_user_by_email(session=session, email=email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = True
    session.add(user)
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
    
    # Generate new verification code
    verification_code = crud.generate_verification_code(session=session, email=email)
    
    # Load and render email template
    with open(Path("src/email-templates/build/verify_email.html")) as f:
        template = jinja2.Template(f.read())
    
    html_content = template.render(
        project_name=settings.PROJECT_NAME,
        verification_code=verification_code
    )
    
    # Send verification email
    send_email(
        to_email=email,
        subject=f"{settings.PROJECT_NAME} - New verification code",
        html_content=html_content
    )
    
    return JSONResponse(
        status_code=200,
        content={"message": "New verification code sent successfully"}
    )

@router.delete("/users/{email}")
async def delete_user(email: str, session: SessionDep):
    user = crud.get_user_by_email(session=session, email=email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    crud.delete_user(session=session, email=email)
    return JSONResponse(
        status_code=200,
        content={"message": f"User with email {email} deleted successfully"}
    )

@router.put("/users/{email}", response_model=UserResponse)
async def update_user(email: str, user: UserCreate, session: SessionDep):
    db_user = crud.get_user_by_email(session=session, email=email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user = crud.update_user(session=session, email=email, user_update=user)
    return JSONResponse(
        status_code=200,
        content={"message": "User updated successfully", "user": updated_user.model_dump()}
    )






