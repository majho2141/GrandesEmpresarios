from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Annotated
from sqlmodel import Session
from src.crud import product as crud
from src.models.product import Product, ProductCreate, ProductRead, ProductUpdate, Category, CategoryCreate, CategoryRead, CategoryUpdate, ProductStatus
from src.deps import SessionDep, get_current_user, get_current_superuser
from src.models.user import User
from src.database import get_session

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

def check_product_access(current_user: User, enterprise_id: int):
    """
    Verifica si el usuario tiene acceso al producto de la empresa
    """
    if current_user.role.name == "ADMIN":
        return True
    if current_user.enterprise_id == enterprise_id:
        return True
    return False

@router.post("/", response_model=ProductRead)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que el usuario pertenece a la empresa
    if product.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to create products for this enterprise")
    
    # Verificar que todas las categorías existen
    for category_id in product.category_ids:
        category = crud.get_category(db, category_id)
        if not category:
            raise HTTPException(
                status_code=404,
                detail=f"Category with id {category_id} not found"
            )
    
    return crud.create_product(db, product)

@router.get("/", response_model=List[ProductRead])
def read_products(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session)
):
    products = crud.get_products(db, skip=skip, limit=limit)
    return products

@router.get("/enterprise/{enterprise_id}", response_model=List[ProductRead])
def read_enterprise_products(
    enterprise_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Verificar que el usuario pertenece a la empresa
    if enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this enterprise's products")
    
    products = crud.get_enterprise_products(db, enterprise_id, skip=skip, limit=limit)
    return products

@router.get("/{product_id}", response_model=ProductRead)
def read_product(
    product_id: int,
    db: Session = Depends(get_session)
):
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.patch("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Verificar que el usuario pertenece a la empresa
    if product.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this product")
    
    # Verificar que todas las categorías existen si se proporcionan
    if product_update.category_ids is not None:
        for category_id in product_update.category_ids:
            category = crud.get_category(db, category_id)
            if not category:
                raise HTTPException(
                    status_code=404,
                    detail=f"Category with id {category_id} not found"
                )
    
    updated_product = crud.update_product(db, product_id, product_update)
    return updated_product

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Verificar que el usuario pertenece a la empresa
    if product.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this product")
    
    success = crud.delete_product(db, product_id)
    if not success:
        raise HTTPException(status_code=400, detail="Could not delete product")
    return {"message": "Product deleted successfully"}

@router.patch("/{product_id}/status")
def update_product_status(
    product_id: int,
    status: ProductStatus,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Verificar que el usuario pertenece a la empresa
    if product.enterprise_id != current_user.enterprise_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this product's status")
    
    updated_product = crud.update_product_status(db, product_id, status)
    return {"message": "Product status updated successfully"}

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