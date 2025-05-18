from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import date
from .user import User
from .product import Product


class ReviewBase(SQLModel):
    rating: int = Field()
    comment: str = Field(max_length=500)
    review_date: date = Field(default_factory=date.today)
    user_id: str = Field(max_length=20)
    product_id: int = Field()



class ReviewCreate(ReviewBase):
    pass

class ReviewRead(ReviewBase):
    id: int

class ReviewUpdate(SQLModel):
    rating: Optional[int] = None
    comment: Optional[str] = None
    review_date: Optional[date] =None
    user_id: Optional[str] = None
    product_id: Optional[int] = None


class Review(ReviewBase, table = True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: User = Relationship(back_populates="reviews")
    product: Product = Relationship(back_populates="reviews")
