from pydantic import BaseModel, EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: str | None = None

class VerifyCodeRequest(BaseModel):
    email: EmailStr
    code: str

class TokenVerificationResponse(BaseModel):
    is_valid: bool
    user_id: int | None = None
    message: str | None = None 