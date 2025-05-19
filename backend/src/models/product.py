from enum import Enum
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from src.models.enterprise import EnterpriseRead

class ProductStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    DISCONTINUED = "discontinued"

class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=100)
    description: Optional[str] = Field(max_length=255, default=None)

    products: List["ProductHasCategory"] = Relationship(back_populates="category")

class CategoryCreate(SQLModel):
    name: str
    description: Optional[str] = None

class CategoryRead(SQLModel):
    id: int
    name: str
    description: Optional[str]

class CategoryUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None

class ProductBase(SQLModel):
    name: str = Field(max_length=100)
    description: str = Field(max_length=500)
    price: float
    stock: int
    enterprise_id: int = Field(foreign_key="enterprise.id")

class ProductCreate(ProductBase):
    category_ids: List[int]

class ProductRead(ProductBase):
    id: int
    status: ProductStatus
    production_cost: float
    public_price: float
    thumbnail: Optional[str]
    bar_code: Optional[str]
    minimal_safe_stock: int
    discount: float
    enterprise_id: int
    enterprise: EnterpriseRead
    categories: List[CategoryRead]

class ProductUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    status: Optional[ProductStatus] = None
    production_cost: Optional[float] = None
    public_price: Optional[float] = None
    thumbnail: Optional[str] = None
    bar_code: Optional[str] = None
    minimal_safe_stock: Optional[int] = None
    discount: Optional[float] = None
    category_ids: Optional[List[int]] = None

class Product(ProductBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    status: ProductStatus = Field(default=ProductStatus.ACTIVE)
    production_cost: float = Field(default=0.0)
    public_price: float = Field(default=0.0)
    thumbnail: Optional[str] = Field(max_length=45, default=None)
    bar_code: Optional[str] = Field(max_length=45, default=None)
    minimal_safe_stock: int = Field(default=0)
    discount: float = Field(default=0.0)
    enterprise: "Enterprise" = Relationship(back_populates="products")
    order_details: List["OrderDetail"] = Relationship(back_populates="product")
    categories: List["ProductHasCategory"] = Relationship(back_populates="product") 