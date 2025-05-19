from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Grandes Empresarios"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    POSTGRES_SERVER: str = "db"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "grandesempresarios"
    SQLALCHEMY_DATABASE_URI: str = "postgresql://postgres:postgres@db/grandesempresarios"

    class Config:
        case_sensitive = True

settings = Settings() 