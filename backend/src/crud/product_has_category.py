from typing import List, Optional
from sqlmodel import Session, select

from ..models.product_has_category import ProductHasCategory, ProductHasCategoryCreate

def create_product_category(db: Session, product_category: ProductHasCategoryCreate) -> ProductHasCategory:
    db_product_category = ProductHasCategory.model_validate(product_category)
    db.add(db_product_category)
    db.commit()
    db.refresh(db_product_category)
    return db_product_category

def get_product_categories(
    db: Session,
    product_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[ProductHasCategory]:
    query = select(ProductHasCategory).where(ProductHasCategory.product_id == product_id)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def get_category_products(
    db: Session,
    category_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[ProductHasCategory]:
    query = select(ProductHasCategory).where(ProductHasCategory.category_id == category_id)
    query = query.offset(skip).limit(limit)
    result = db.execute(query)
    return [r[0] for r in result]

def delete_product_category(db: Session, product_id: int, category_id: int) -> bool:
    query = select(ProductHasCategory).where(
        ProductHasCategory.product_id == product_id,
        ProductHasCategory.category_id == category_id
    )
    result = db.execute(query).first()
    if not result:
        return False
    
    product_category = result[0]
    db.delete(product_category)
    db.commit()
    return True

def delete_all_product_categories(db: Session, product_id: int) -> bool:
    query = select(ProductHasCategory).where(ProductHasCategory.product_id == product_id)
    result = db.execute(query).all()
    if not result:
        return False
    
    for row in result:
        product_category = row[0]
        db.delete(product_category)
    db.commit()
    return True

def delete_all_category_products(db: Session, category_id: int) -> bool:
    query = select(ProductHasCategory).where(ProductHasCategory.category_id == category_id)
    result = db.execute(query).all()
    if not result:
        return False
    
    for row in result:
        category_product = row[0]
        db.delete(category_product)
    db.commit()
    return True 