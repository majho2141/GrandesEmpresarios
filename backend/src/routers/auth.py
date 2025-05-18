from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from src.deps import SessionDep, get_current_user
from src.models.user import User
from src.models.auth import Token, VerifyCodeRequest, TokenVerificationResponse
from src.crud import user as crud
from src.config.security import create_access_token, verify_token
from src.core.config import settings
from src.utils.email import send_email
import random
import string

router = APIRouter()


@router.post("/verify-code", response_model=Token)
async def verify_code(
    request: VerifyCodeRequest,
    session: SessionDep
):
    """
    Verify the code sent to the user's email and return a token if valid.
    """
    user = crud.get_user_by_email(session, request.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if user.verification_code != request.code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid verification code"
        )

    # Clear the verification code after successful verification
    user.verification_code = None
    session.add(user)
    session.commit()

    return {
        "access_token": create_access_token(user.id),
        "token_type": "bearer"
    }


@router.post("/verify-token", response_model=TokenVerificationResponse)
async def verify_token_endpoint(
    token_data: Token,
    session: SessionDep
):
    """
    Verify if a JWT token is valid and return user information.
    """
    try:
        payload = verify_token(token_data.access_token)
        if payload is None:
            return TokenVerificationResponse(
                is_valid=False,
                message="Invalid token"
            )

        user_id = int(payload.get("sub"))
        user = crud.get_user(session, user_id)

        if not user:
            return TokenVerificationResponse(
                is_valid=False,
                message="User not found"
            )

        return TokenVerificationResponse(
            is_valid=True,
            user_id=user_id,
            message="Token is valid"
        )
    except Exception as e:
        return TokenVerificationResponse(
            is_valid=False,
            message=str(e)
        )