from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Annotated, List
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from src.models.user import User
from src.models.product import Product
from src.models.enterprise import Enterprise
from src.deps import get_current_user, SessionDep
from src.services.openai_client import generate_text
from src.services.prompt_builder import build_ad_prompt
from src.crud import ad as crud_ad


router = APIRouter(prefix="/ai", tags=["AI"])

class TextGenerationResponse(BaseModel):
    content: str

class AdGenerationRequest(BaseModel):
    product_ids: List[int]
    language: str = "español"

@router.post("/generate-ad", response_model=TextGenerationResponse)
async def generate_ad_copy(
    request: AdGenerationRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    products = session.exec(
        select(Product).where(
            Product.id.in_(request.product_ids),
            Product.enterprise_id == current_user.enterprise_id
        ).options(
            selectinload(Product.categories),
            selectinload(Product.enterprise)
        )
    ).all()

    if not products:
        raise HTTPException(status_code=404, detail="No se encontraron productos para generar publicidad.")

    enterprise = products[0].enterprise
    if any(p.enterprise_id != enterprise.id for p in products):
        raise HTTPException(status_code=400, detail="Todos los productos deben pertenecer al mismo emprendimiento.")

    prompt = build_ad_prompt(enterprise=enterprise, products=products, language=request.language)
    content = await generate_text(prompt)
        # Guardar anuncio generado
    crud_ad.save_ad(
        session=session,
        content=content,
        user_id=current_user.id,
        enterprise_id=enterprise.id
    )

    return TextGenerationResponse(content=content)


