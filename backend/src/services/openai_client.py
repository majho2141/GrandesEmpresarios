import os
from fastapi import HTTPException
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class OpenAIContentResponse(BaseModel):
    content: str

async def generate_text(prompt: str, system_message: str = "You are a marketing assistant.") -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text generation failed: {str(e)}")

async def generate_image(prompt: str) -> str:
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            n=1,
            size="1024x1024"
        )
        return response.data[0].url
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image generation failed: {str(e)}")