from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Annotated, List
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from src.models.user import User
from src.models.product import Product
from src.models.enterprise import Enterprise
from src.deps import get_current_user, SessionDep
from src.services.openai_client import generate_text, generate_image
from src.services.prompt_builder import build_ad_prompt, build_image_ad_prompt
from src.crud import ad as crud_ad
import os
import requests
import uuid


router = APIRouter(prefix="/ai", tags=["AI"])

class TextGenerationResponse(BaseModel):
    content: str

class AdGenerationRequest(BaseModel):
    product_ids: List[int]
    language: str = "español"

class ImageGenerationRequest(BaseModel):
    product_id: int
    discount: int = 20

class ImageGenerationResponse(BaseModel):
    image_url: str
    local_path: str

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

@router.post("/generate-image", response_model=ImageGenerationResponse)
async def generate_ad_image(
    request: ImageGenerationRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    # Obtener el producto
    product = session.exec(
        select(Product).where(
            Product.id == request.product_id,
            Product.enterprise_id == current_user.enterprise_id
        ).options(
            selectinload(Product.categories),
            selectinload(Product.enterprise)
        )
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado.")

    enterprise = product.enterprise
    if not enterprise:
        raise HTTPException(status_code=404, detail="Emprendimiento no encontrado.")

    # Construir el prompt para la imagen
    prompt = build_image_ad_prompt(
        enterprise=enterprise,
        product=product,
        discount=request.discount
    )

    # Generar la imagen
    image_url = await generate_image(prompt)

    # Descargar y guardar la imagen localmente
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        
        # Crear nombre único para el archivo
        filename = f"ad_{product.id}_{uuid.uuid4().hex[:8]}.png"
        local_path = f"static/images/generated/{filename}"
        
        # Asegurar que el directorio existe
        os.makedirs("static/images/generated", exist_ok=True)
        
        # Guardar la imagen
        with open(local_path, "wb") as f:
            f.write(response.content)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al guardar la imagen: {str(e)}")

    return ImageGenerationResponse(
        image_url=image_url,
        local_path=local_path
    )


