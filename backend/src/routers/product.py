from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Annotated
from sqlmodel import Session
from src.crud import product as crud
from src.models.product import Product, ProductCreate, ProductRead, ProductUpdate, Category, CategoryCreate, CategoryRead, CategoryUpdate
from src.deps import SessionDep, get_current_user, get_current_superuser
from src.models.user import User
from src.database import get_session

router = APIRouter()

def check_product_access(current_user: User, enterprise_id: int):
    """
    Verifica si el usuario tiene acceso al producto de la empresa
    """
    if current_user.role.name == "ADMIN":
        return True
    if current_user.enterprise_id == enterprise_id:
        return True
    return False

@router.post("/products", response_model=ProductRead)
async def create_product(
    product: ProductCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    """
    Crear un nuevo producto.
    Solo administradores o usuarios de la misma empresa pueden crear productos.
    """
    # Verificar que el usuario tenga una empresa asociada
    if not current_user.enterprise_id:
        raise HTTPException(
            status_code=403,
            detail="No tienes una empresa asociada para crear productos"
        )
    
    # Crear el producto con el enterprise_id del usuario
    return crud.create_product(session=session, product=product, enterprise_id=current_user.enterprise_id)

@router.get("/products/{product_id}", response_model=ProductRead)
async def get_product(
    product_id: int,
    session: SessionDep
):
    """
    Obtener un producto por ID.
    Solo administradores o usuarios de la misma empresa pueden ver el producto.
    """
    product = crud.get_product(session=session, product_id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product

@router.get("/products/enterprise/{enterprise_id}", response_model=List[ProductRead])
async def get_products_by_enterprise(
    enterprise_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    """
    Obtener todos los productos de una empresa.
    Solo administradores o usuarios de la misma empresa pueden ver los productos.
    """
    if not check_product_access(current_user, enterprise_id):
        raise HTTPException(
            status_code=403,
            detail="No tienes permiso para ver los productos de esta empresa"
        )
    
    return crud.get_products_by_enterprise(session=session, enterprise_id=enterprise_id)

@router.patch("/products/{product_id}", response_model=ProductRead)
async def update_product(
    product_id: int,
    product: ProductUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    """
    Actualizar un producto.
    Solo administradores o usuarios de la misma empresa pueden actualizar el producto.
    """
    db_product = crud.get_product(session=session, product_id=product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    if not check_product_access(current_user, db_product.enterprise_id):
        raise HTTPException(
            status_code=403,
            detail="No tienes permiso para actualizar este producto"
        )
    
    return crud.update_product(session=session, product_id=product_id, product=product)

@router.delete("/products/{product_id}")
async def delete_product(
    product_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    """
    Eliminar un producto.
    Solo administradores o usuarios de la misma empresa pueden eliminar el producto.
    """
    db_product = crud.get_product(session=session, product_id=product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    if not check_product_access(current_user, db_product.enterprise_id):
        raise HTTPException(
            status_code=403,
            detail="No tienes permiso para eliminar este producto"
        )
    
    success = crud.delete_product(session=session, product_id=product_id)
    if not success:
        raise HTTPException(status_code=500, detail="Error al eliminar el producto")
    
    return {"message": "Producto eliminado correctamente"}

# Endpoints para categorías (solo administradores)
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

@router.get("/products", response_model=List[ProductRead])
async def get_all_products(
    session: SessionDep
):
    """
    Get all products in the system.
    """
    return crud.product.get_all_products(session) 