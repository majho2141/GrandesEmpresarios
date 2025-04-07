from enum import Enum
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from src.models.enterprise import EnterpriseRead

class ProductStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    DISCONTINUED = "discontinued"

class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=100)
    description: Optional[str] = Field(max_length=255, default=None)

    products: list["Product"] = Relationship(back_populates="category")

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

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=45)
    description: Optional[str] = Field(max_length=255, default=None)
    status: ProductStatus = Field(default=ProductStatus.ACTIVE)
    stock: int = Field(default=0)
    production_cost: float = Field(default=0.0)
    public_price: float = Field(default=0.0)
    thumbnail: Optional[str] = Field(max_length=45, default=None)
    bar_code: Optional[str] = Field(max_length=45, default=None)
    minimal_safe_stock: int = Field(default=0)
    discount: float = Field(default=0.0)
    enterprise_id: int = Field(foreign_key="enterprise.id")
    category_id: int = Field(foreign_key="category.id")

    enterprise: "Enterprise" = Relationship(back_populates="products")
    category: Category = Relationship(back_populates="products")

class ProductCreate(SQLModel):
    name: str
    description: Optional[str] = None
    status: ProductStatus = ProductStatus.ACTIVE
    stock: int = 0
    production_cost: float = 0.0
    public_price: float = 0.0
    thumbnail: Optional[str] = None
    bar_code: Optional[str] = None
    minimal_safe_stock: int = 0
    discount: float = 0.0
    category_id: int

class ProductRead(SQLModel):
    id: int
    name: str
    description: Optional[str]
    status: ProductStatus
    stock: int
    production_cost: float
    public_price: float
    thumbnail: Optional[str]
    bar_code: Optional[str]
    minimal_safe_stock: int
    discount: float
    enterprise_id: int
    category_id: int
    enterprise: "EnterpriseRead"
    category: CategoryRead

class ProductUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProductStatus] = None
    stock: Optional[int] = None
    production_cost: Optional[float] = None
    public_price: Optional[float] = None
    thumbnail: Optional[str] = None
    bar_code: Optional[str] = None
    minimal_safe_stock: Optional[int] = None
    discount: Optional[float] = None
    category_id: Optional[int] = None 