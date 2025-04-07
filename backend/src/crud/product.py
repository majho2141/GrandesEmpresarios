from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from src.models.product import Product, Category, ProductCreate, ProductUpdate, CategoryCreate, CategoryUpdate
from typing import List, Optional
from src.models.enterprise import Enterprise
from src.crud.base import CRUDBase
from fastapi import HTTPException, status

def create_product(session: Session, product: ProductCreate, enterprise_id: int) -> Product:
    # Verificar si la categoría existe
    category = session.get(Category, product.category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id {product.category_id} not found"
        )
    
    product_data = product.model_dump()
    product_data["enterprise_id"] = enterprise_id
    db_product = Product(**product_data)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

def get_product(session: Session, product_id: int) -> Product:
    return session.get(Product, product_id)

def get_products_by_enterprise(session: Session, enterprise_id: int) -> List[Product]:
    return product.get_products_by_enterprise(session, enterprise_id)

def update_product(session: Session, product_id: int, product: ProductUpdate) -> Product:
    db_product = session.get(Product, product_id)
    if not db_product:
        return None
    product_data = product.dict(exclude_unset=True)
    for key, value in product_data.items():
        setattr(db_product, key, value)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

def delete_product(session: Session, product_id: int) -> bool:
    db_product = session.get(Product, product_id)
    if not db_product:
        return False
    session.delete(db_product)
    session.commit()
    return True

def create_category(session: Session, category: CategoryCreate) -> Category:
    db_category = Category.from_orm(category)
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category

def get_category(session: Session, category_id: int) -> Optional[Category]:
    return session.get(Category, category_id)

def get_all_categories(session: Session) -> List[Category]:
    statement = select(Category)
    return session.exec(statement).all()

def update_category(session: Session, category_id: int, category: CategoryUpdate) -> Optional[Category]:
    db_category = session.get(Category, category_id)
    if not db_category:
        return None
    
    category_data = category.model_dump(exclude_unset=True)
    for key, value in category_data.items():
        setattr(db_category, key, value)
    
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category

def delete_category(session: Session, category_id: int) -> bool:
    category = session.get(Category, category_id)
    if not category:
        return False
    session.delete(category)
    session.commit()
    return True

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get_products_by_enterprise(self, db, enterprise_id: int):
        query = select(Product).where(Product.enterprise_id == enterprise_id)
        query = query.options(
            selectinload(Product.enterprise),
            selectinload(Product.category)
        )
        return db.exec(query).all()

    def get_all_products(self, db):
        query = select(Product)
        query = query.options(
            selectinload(Product.enterprise),
            selectinload(Product.category)
        )
        return db.exec(query).all()

product = CRUDProduct(Product) 