from typing import Optional
from sqlmodel import Field, SQLModel, Relationship

class ProductHasCategoryBase(SQLModel):
    product_id: int = Field(foreign_key="product.id")
    category_id: int = Field(foreign_key="category.id")

class ProductHasCategoryCreate(ProductHasCategoryBase):
    pass

class ProductHasCategoryRead(ProductHasCategoryBase):
    id: int

class ProductHasCategory(ProductHasCategoryBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product: "Product" = Relationship(back_populates="categories")
    category: "Category" = Relationship(back_populates="products") 