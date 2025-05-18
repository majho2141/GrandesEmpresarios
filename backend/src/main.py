from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from src.routers.user import router as user_router
from src.routers.role import router as role_router
from src.routers.permission import router as permission_router
from src.routers.product import router as product_router
from src.routers.category import router as category_router
from src.routers.auth import router as auth_router
from src.routes.notification import router as notification_router
from src.routers.address import router as address_router
from src.routers.order import router as order_router
from src.routers.order_detail import router as order_detail_router
from src.routers.advertisement import router as advertisement_router
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
app.mount("/assets", StaticFiles(directory="src/email-templates/assets/images"), name="assets")

# Include routers
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(user_router, prefix=f"{settings.API_V1_STR}/users", tags=["users"])
app.include_router(role_router, prefix=f"{settings.API_V1_STR}/roles", tags=["roles"])
app.include_router(permission_router, prefix=f"{settings.API_V1_STR}/permissions", tags=["permissions"])
app.include_router(product_router, prefix=f"{settings.API_V1_STR}/products", tags=["products"])
app.include_router(category_router, prefix=f"{settings.API_V1_STR}/categories", tags=["categories"])
app.include_router(notification_router, prefix=f"{settings.API_V1_STR}/notifications", tags=["notifications"])
app.include_router(address_router, prefix=f"{settings.API_V1_STR}/addresses", tags=["addresses"])
app.include_router(order_router, prefix=f"{settings.API_V1_STR}/orders", tags=["orders"])
app.include_router(order_detail_router, prefix=f"{settings.API_V1_STR}/order-details", tags=["order-details"])
app.include_router(advertisement_router, prefix=f"{settings.API_V1_STR}/advertisements", tags=["advertisements"])

@app.on_event("startup")
def on_startup():
    """
    Inicializa la base de datos al iniciar la aplicación
    """
    init_db()

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de Grandes Empresarios"}
