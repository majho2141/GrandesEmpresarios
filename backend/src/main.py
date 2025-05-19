from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from src.routers.user import router as user_router
from src.routers.role import router as role_router
from src.routers.permission import router as permission_router
from src.routers.product import router as product_router
from src.routers.category import router as category_router
from src.routers.openai import router as openai_router
from src.config.settings import settings
from src.config.db import init_db
from sqlmodel import SQLModel

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Montar archivos estáticos
# app.mount("/assets", StaticFiles(directory="src/email-templates/assets/images"), name="assets")
os.makedirs("static/images/products", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routers
app.include_router(user_router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(role_router, prefix=f"{settings.API_V1_STR}/roles", tags=["roles"])
app.include_router(permission_router, prefix=f"{settings.API_V1_STR}/permissions", tags=["permissions"])
app.include_router(product_router, prefix=f"{settings.API_V1_STR}", tags=["products"])
app.include_router(category_router, prefix=f"{settings.API_V1_STR}", tags=["categories"])
app.include_router(openai_router, prefix=f"{settings.API_V1_STR}", tags=["openai"])

@app.on_event("startup")
def on_startup():
    """
    Inicializa la base de datos al iniciar la aplicación
    """
    init_db()

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de Grandes Empresarios"}
