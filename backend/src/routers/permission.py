from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from src.crud import permission as crud
from src.deps import SessionDep, get_current_superuser
from src.models.permission import Permission, PermissionCreate, PermissionRead, PermissionUpdate

router = APIRouter()

@router.get(
    "/",
    response_model=list[PermissionRead],
    dependencies=[Depends(get_current_superuser)]
)
def read_permissions(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Obtener lista de permisos.
    """
    permissions = crud.get_multi(session=session, skip=skip, limit=limit)
    return permissions

@router.post(
    "/",
    response_model=PermissionRead,
    dependencies=[Depends(get_current_superuser)]
)
def create_permission(
    *,
    session: SessionDep,
    permission_in: PermissionCreate,
) -> Any:
    """
    Crear nuevo permiso.
    """
    permission = crud.get_by_name(session=session, name=permission_in.name)
    if permission:
        raise HTTPException(
            status_code=400,
            detail="Ya existe un permiso con este nombre",
        )
    permission = crud.create(session=session, obj_in=permission_in)
    return permission

@router.get(
    "/{permission_id}",
    response_model=PermissionRead,
    dependencies=[Depends(get_current_superuser)]
)
def read_permission(
    *,
    session: SessionDep,
    permission_id: int,
) -> Any:
    """
    Obtener permiso por ID.
    """
    permission = crud.get(session=session, id=permission_id)
    if not permission:
        raise HTTPException(status_code=404, detail="Permiso no encontrado")
    return permission

@router.put(
    "/{permission_id}",
    response_model=PermissionRead,
    dependencies=[Depends(get_current_superuser)]
)
def update_permission(
    *,
    session: SessionDep,
    permission_id: int,
    permission_in: PermissionUpdate,
) -> Any:
    """
    Actualizar permiso.
    """
    permission = crud.get(session=session, id=permission_id)
    if not permission:
        raise HTTPException(status_code=404, detail="Permiso no encontrado")
    
    if permission_in.name != permission.name:
        existing_permission = crud.get_by_name(session=session, name=permission_in.name)
        if existing_permission:
            raise HTTPException(
                status_code=400,
                detail="Ya existe un permiso con este nombre",
            )
    
    updated_permission = crud.update(session=session, db_obj=permission, obj_in=permission_in)
    return updated_permission

@router.delete(
    "/{permission_id}",
    dependencies=[Depends(get_current_superuser)]
)
def delete_permission(
    *,
    session: SessionDep,
    permission_id: int,
) -> Any:
    """
    Eliminar permiso.
    """
    permission = crud.get(session=session, id=permission_id)
    if not permission:
        raise HTTPException(status_code=404, detail="Permiso no encontrado")
    
    crud.delete(session=session, id=permission_id)
    return {"message": "Permiso eliminado correctamente"} 