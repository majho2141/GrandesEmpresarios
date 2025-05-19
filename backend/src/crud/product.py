from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from src.models.product import Product, Category, ProductCreate, ProductUpdate, CategoryCreate, CategoryUpdate, ProductStatus
from typing import List, Optional
from src.models.enterprise import Enterprise
from src.crud.base import CRUDBase
from fastapi import HTTPException, status
from src.crud import product_has_category as product_category_crud
from src.models.product_has_category import ProductHasCategory, ProductHasCategoryCreate

def create_product(db: Session, product: ProductCreate) -> Product:
    # Extraer las categorías del producto
    category_ids = product.category_ids
    product_data = product.model_dump(exclude={"category_ids"})
    
    # Crear el producto
    db_product = Product(**product_data)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    # Crear las relaciones con las categorías
    for category_id in category_ids:
        product_category_crud.create_product_category(
            db,
            ProductHasCategoryCreate(
                product_id=db_product.id,
                category_id=category_id
            )
        )
    
    # Cargar el producto completo con sus categorías
    return get_product(db, db_product.id)

def get_product(db: Session, product_id: int) -> Optional[Product]:
    query = select(Product).where(Product.id == product_id)
    query = query.options(
        selectinload(Product.enterprise),
        selectinload(Product.categories).selectinload(ProductHasCategory.category)
    )
    result = db.execute(query).first()
    if not result:
        return None
        
    product = result[0]
    return product

def get_products(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[Product]:
    query = select(Product)
    query = query.options(
        selectinload(Product.enterprise),
        selectinload(Product.categories).selectinload(ProductHasCategory.category)
    )
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    products = [r[0] for r in result]
    return products

def get_enterprise_products(
    db: Session,
    enterprise_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[Product]:
    query = select(Product).where(Product.enterprise_id == enterprise_id)
    query = query.options(
        selectinload(Product.enterprise),
        selectinload(Product.categories).selectinload(ProductHasCategory.category)
    )
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    products = [r[0] for r in result]
    return products

def update_product(
    db: Session,
    product_id: int,
    product_update: ProductUpdate
) -> Optional[Product]:
    db_product = get_product(db, product_id)
    if not db_product:
        return None
    
    # Actualizar las categorías si se proporcionan
    if product_update.category_ids is not None:
        # Eliminar todas las categorías existentes
        product_category_crud.delete_all_product_categories(db, product_id)
        
        # Crear las nuevas relaciones con categorías
        for category_id in product_update.category_ids:
            product_category_crud.create_product_category(
                db,
                ProductHasCategoryCreate(
                    product_id=product_id,
                    category_id=category_id
                )
            )
    
    # Actualizar los demás campos
    product_data = product_update.model_dump(exclude={"category_ids"}, exclude_unset=True)
    for key, value in product_data.items():
        setattr(db_product, key, value)
    
    db.add(db_product)
    db.commit()
    
    # Cargar el producto completo con sus categorías
    return get_product(db, product_id)

def delete_product(db: Session, product_id: int) -> bool:
    db_product = get_product(db, product_id)
    if not db_product:
        return False
    
    # Eliminar todas las relaciones con categorías
    product_category_crud.delete_all_product_categories(db, product_id)
    
    # Eliminar el producto
    db.delete(db_product)
    db.commit()
    return True

def update_product_status(
    db: Session,
    product_id: int,
    status: ProductStatus
) -> Optional[Product]:
    db_product = get_product(db, product_id)
    if not db_product:
        return None
    
    db_product.status = status
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def create_category(session: Session, category: CategoryCreate) -> Category:
    db_category = Category.model_validate(category)
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category

def get_category(session: Session, category_id: int) -> Optional[Category]:
    return session.get(Category, category_id)

def get_all_categories(session: Session) -> List[Category]:
    statement = select(Category)
    result = session.execute(statement).all()
    return [item[0] for item in result]

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
            selectinload(Product.categories).selectinload(ProductHasCategory.category)
        )
        result = db.execute(query).all()
        products = [item[0] for item in result]
        return products

    def get_all_products(self, db):
        query = select(Product)
        query = query.options(
            selectinload(Product.enterprise),
            selectinload(Product.categories).selectinload(ProductHasCategory.category)
        )
        result = db.execute(query).all()
        products = [item[0] for item in result]
        return products

product = CRUDProduct(Product) 