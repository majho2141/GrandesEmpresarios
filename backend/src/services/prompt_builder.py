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
        line = f"- {p.name} ({p.category.name}): {p.description or 'No description'} | Price: ${p.public_price:.2f}"
        product_lines.append(line)

    prompt = header + "\n".join(product_lines)
    prompt += f"\n\nCreate a short and engaging promotional message that highlights the value of these products. The response should be written in {language}."
    return prompt
