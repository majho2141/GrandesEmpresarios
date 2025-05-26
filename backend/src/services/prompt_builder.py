from src.models.product import Product
from src.models.enterprise import Enterprise
from typing import List

def build_ad_prompt(
    enterprise: Enterprise,
    products: List[Product],
    language: str = "español"
) -> str:
    header = (
        f"You are a marketing expert. Write a persuasive advertising message for the following small business:\n\n"
        f"Business name: {enterprise.name}\n"
        f"Description: {enterprise.description or 'No description provided'}\n"
        f"Address: {enterprise.address or 'N/A'}\n"
        f"Phone: {enterprise.phone_number or 'N/A'}\n\n"
        f"Here are the products to promote:\n"
    )

    product_lines = []
    for p in products:
        line = f"- {p.name}: {p.description or 'No description'} | Price: ${p.public_price:.2f}"
        product_lines.append(line)

    prompt = header + "\n".join(product_lines)
    prompt += f"\n\nCreate a short and engaging promotional message that highlights the value of these products. The response should be written in {language}."
    return prompt

def build_image_ad_prompt(
    enterprise: Enterprise,
    product: Product,
    discount: int = 20
) -> str:
    prompt = (
        f"La imagen muestra un banner publicitario de formato cuadrado (1000x1000 píxeles) de la marca "
        f"{enterprise.name}, pensado para redes sociales. En la parte superior aparece el texto promocional "
        f"\"{discount}% de descuento, ahora a $ {product.public_price:.2f}\" resaltado de forma llamativa. En el centro, se destaca una "
        f"imagen del producto {product.name} {product.description or 'producto de calidad'} como elemento principal. El diseño está "
        f"decorado con elementos gráficos relacionados con el producto para atraer la atención del público. En la "
        f"parte inferior, se incluye el logotipo de {enterprise.name} y un texto de llamada a la acción. El estilo "
        f"general es moderno, atractivo y persuasivo, reflejando la identidad de marca de {enterprise.name}, con un "
        f"fondo degradado vistoso."
    )
    return prompt
