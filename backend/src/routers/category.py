from fastapi import APIRouter, Depends, HTTPException
from typing import List, Annotated
from sqlmodel import Session
from src.crud import product as crud
from src.models.product import Category, CategoryCreate, CategoryRead, CategoryUpdate
from src.deps import SessionDep, get_current_superuser
from src.models.user import User

router = APIRouter()

@router.post("/categories", response_model=CategoryRead)
async def create_category(
    category: CategoryCreate,
    current_user: Annotated[User, Depends(get_current_superuser)],
    session: SessionDep
):
    """
    Crear una nueva categoría (solo administradores)
    """
    return crud.create_category(session=session, category=category)

@router.get("/categories", response_model=List[CategoryRead])
async def get_all_categories(session: SessionDep):
    """
    Obtener todas las categorías
    """
    return crud.get_all_categories(session=session)

@router.get("/categories/{category_id}", response_model=CategoryRead)
async def get_category(
    category_id: int,
    session: SessionDep
):
    """
    Obtener una categoría por ID
    """
    category = crud.get_category(session=session, category_id=category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return category

@router.patch("/categories/{category_id}", response_model=CategoryRead)
async def update_category(
    category_id: int,
    category: CategoryUpdate,
    current_user: Annotated[User, Depends(get_current_superuser)],
    session: SessionDep
):
    """
    Actualizar una categoría (solo administradores)
    """
    return crud.update_category(session=session, category_id=category_id, category=category)

@router.delete("/categories/{category_id}")
async def delete_category(
    category_id: int,
    current_user: Annotated[User, Depends(get_current_superuser)],
    session: SessionDep
):
    """
    Eliminar una categoría (solo administradores)
    """
    success = crud.delete_category(session=session, category_id=category_id)
    if not success:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return {"message": "Categoría eliminada correctamente"} 