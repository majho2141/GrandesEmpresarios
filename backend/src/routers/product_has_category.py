from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.database import get_session
from src.models.product_has_category import ProductHasCategoryCreate, ProductHasCategoryRead
from src.crud import product_has_category as crud
from src.routers.auth import get_current_user
from src.models.user import User

router = APIRouter(
    prefix="/product-categories",
    tags=["product-categories"]
)

@router.post("/", response_model=ProductHasCategoryRead)
def create_product_category(
    product_category: ProductHasCategoryCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.create_product_category(db, product_category)

@router.get("/product/{product_id}", response_model=List[ProductHasCategoryRead])
def read_product_categories(
    product_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session)
):
    return crud.get_product_categories(db, product_id, skip, limit)

@router.get("/category/{category_id}", response_model=List[ProductHasCategoryRead])
def read_category_products(
    category_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session)
):
    return crud.get_category_products(db, category_id, skip, limit)

@router.delete("/{product_id}/{category_id}")
def delete_product_category(
    product_id: int,
    category_id: int,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    success = crud.delete_product_category(db, product_id, category_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product-Category relationship not found")
    return {"message": "Product-Category relationship deleted successfully"} 