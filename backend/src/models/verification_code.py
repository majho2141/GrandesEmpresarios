from datetime import datetime
from sqlmodel import Field, SQLModel

class VerificationCode(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    email: str = Field(index=True)
    code: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = Field(default=True) 