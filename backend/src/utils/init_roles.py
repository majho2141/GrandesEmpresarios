from sqlmodel import Session, select
from src.models.role import Role

def initialize_default_roles(session: Session) -> dict[str, Role]:
    """
    Inicializa los roles por defecto en la base de datos y devuelve
    un diccionario con los roles creados.
    """
    # Definir los roles predeterminados
    default_roles = {
        "ADMIN": "Administrador del sistema con acceso total",
        "EMPLOYEE": "Empleado con acceso a funciones laborales",
        "CLIENT": "Cliente con acceso limitado a funciones básicas"
    }
    
    # Diccionario para almacenar los roles creados
    roles_dict = {}
    
    # Crear o recuperar cada rol
    for role_name, description in default_roles.items():
        # Verificar si el rol ya existe
        role = session.exec(select(Role).where(Role.name == role_name)).first()
        
        # Si no existe, crearlo
        if not role:
            role = Role(name=role_name, description=description)
            session.add(role)
            session.commit()
            session.refresh(role)
        
        # Guardar el rol en el diccionario
        roles_dict[role_name] = role
    
    return roles_dict 