from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from src.crud import role as crud
from src.deps import SessionDep, get_current_superuser
from src.models.role import Role, RoleCreate, RoleRead, RoleUpdate
from src.models.permission import PermissionRead

router = APIRouter()

@router.get(
    "/",
    response_model=list[RoleRead],
    dependencies=[Depends(get_current_superuser)]
)
def read_roles(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Obtener lista de roles.
    """
    roles = crud.get_multi(session=session, skip=skip, limit=limit)
    return roles

@router.post(
    "/",
    response_model=RoleRead,
    dependencies=[Depends(get_current_superuser)]
)
def create_role(
    *,
    session: SessionDep,
    role_in: RoleCreate,
) -> Any:
    """
    Crear nuevo rol.
    """
    role = crud.get_by_name(session=session, name=role_in.name)
    if role:
        raise HTTPException(
            status_code=400,
            detail="Ya existe un rol con este nombre",
        )
    role = crud.create(session=session, obj_in=role_in)
    return role

@router.get(
    "/{role_id}",
    response_model=RoleRead,
    dependencies=[Depends(get_current_superuser)]
)
def read_role(
    *,
    session: SessionDep,
    role_id: int,
) -> Any:
    """
    Obtener rol por ID.
    """
    role = crud.get(session=session, id=role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    return role

@router.put(
    "/{role_id}",
    response_model=RoleRead,
    dependencies=[Depends(get_current_superuser)]
)
def update_role(
    *,
    session: SessionDep,
    role_id: int,
    role_in: RoleUpdate,
) -> Any:
    """
    Actualizar rol.
    """
    role = crud.get(session=session, id=role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    
    if role_in.name != role.name:
        existing_role = crud.get_by_name(session=session, name=role_in.name)
        if existing_role:
            raise HTTPException(
                status_code=400,
                detail="Ya existe un rol con este nombre",
            )
    
    updated_role = crud.update(session=session, db_obj=role, obj_in=role_in)
    return updated_role

@router.delete(
    "/{role_id}",
    dependencies=[Depends(get_current_superuser)]
)
def delete_role(
    *,
    session: SessionDep,
    role_id: int,
) -> Any:
    """
    Eliminar rol.
    """
    role = crud.get(session=session, id=role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    
    if role.name == "ADMIN":
        raise HTTPException(
            status_code=400,
            detail="No se puede eliminar el rol de administrador"
        )
    
    crud.delete(session=session, id=role_id)
    return {"message": "Rol eliminado correctamente"}

@router.get(
    "/{role_id}/permissions",
    response_model=List[PermissionRead],
    dependencies=[Depends(get_current_superuser)]
)
def read_role_permissions(
    *,
    session: SessionDep,
    role_id: int,
) -> Any:
    """
    Obtener permisos de un rol.
    """
    role = crud.get(session=session, id=role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    return role.permissions

@router.post(
    "/{role_id}/permissions/{permission_id}",
    dependencies=[Depends(get_current_superuser)]
)
def add_permission_to_role(
    *,
    session: SessionDep,
    role_id: int,
    permission_id: int,
) -> Any:
    """
    Agregar permiso a un rol.
    """
    success = crud.add_permission(
        session=session,
        role_id=role_id,
        permission_id=permission_id
    )
    if not success:
        raise HTTPException(
            status_code=404,
            detail="Rol o permiso no encontrado"
        )
    return {"message": "Permiso agregado correctamente"}

@router.delete(
    "/{role_id}/permissions/{permission_id}",
    dependencies=[Depends(get_current_superuser)]
)
def remove_permission_from_role(
    *,
    session: SessionDep,
    role_id: int,
    permission_id: int,
) -> Any:
    """
    Eliminar permiso de un rol.
    """
    success = crud.remove_permission(
        session=session,
        role_id=role_id,
        permission_id=permission_id
    )
    if not success:
        raise HTTPException(
            status_code=404,
            detail="Rol o permiso no encontrado"
        )
    return {"message": "Permiso eliminado correctamente"} 