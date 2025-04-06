import secrets
from pydantic_settings import BaseSettings, SettingsConfigDict

from pydantic import computed_field


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )
    PROJECT_NAME: str = "grandesEmpresarios"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    DOMAIN: str = "localhost"

    
    #Frontend URL
    FRONTEND_URL: str = "http://localhost:3000"

    # Database settings
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_PORT: int
    POSTGRES_HOST: str

    @computed_field
    @property
    def POSTGRES_URI(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:3000", 
        "https://localhost:3000",
        "http://localhost.dev.com:3000", 
        "https://localhost.dev.com:3000"
    ]
    FIRST_SUPERUSER: str
    FIRST_SUPERUSER_PASSWORD: str

    SMTP_TLS: bool = True
    SMTP_SSL: bool = False
    SMTP_PORT: int = 587
    SMTP_HOST: str | None = None
    EMAILS_FROM_EMAIL: str | None = None
    EMAILS_FROM_NAME: str | None = None

    OAUTH_ACCESS_TOKEN: str
    OAUTH_REFRESH_TOKEN: str
    OAUTH_CLIENT_ID: str
    OAUTH_SECRET: str
    OAUTH_CODE: str

    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48


    # Server settings
    SERVER_HOST: str = "http://localhost:8000"
    
    # SMTP settings
    SMTP_PASSWORD: str | None = None


settings = Settings()
