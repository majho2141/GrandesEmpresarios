from sqlmodel import SQLModel, Session, create_engine
from sqlalchemy import text
from src.config.settings import settings

# Usar PostgreSQL con la URI de la configuración
engine = create_engine(
    settings.POSTGRES_URI,
    echo=True  # Para ver las consultas SQL en los logs
)

def init_db():
    """
    Inicializa la base de datos creando todas las tablas necesarias.
    """
    from src.models.user import User
    from src.models.role import Role
    from src.models.permission import Permission
    from src.models.permission_has_role import PermissionHasRole
    from src.models.product import Product, Category
    from src.utils.init_roles import initialize_default_roles
    from src.utils.initialize_sample_data import initialize_sample_data
    
    # Crear todas las tablas
    SQLModel.metadata.create_all(engine)
    
    # Inicializar roles por defecto
    with Session(engine) as session:
        initialize_default_roles(session)
        add_address_column(session)
        initialize_sample_data(session)

def get_session():
    with Session(engine) as session:
        yield session

def add_address_column(session: Session) -> None:
    # Verificar si la columna address existe en la tabla user
    try:
        session.execute(text('SELECT address FROM "user" LIMIT 1'))
    except Exception:
        # Si no existe, agregarla
        session.execute(text('ALTER TABLE "user" ADD COLUMN address VARCHAR(255)'))
        session.commit()
