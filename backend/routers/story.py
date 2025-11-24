from typing import List, Optional
from fastapi import APIRouter, UploadFile, File, Form
from services.openai_service import generate_story_from_image

router = APIRouter(prefix="/generate-story", tags=["Story"])

@router.post("")
async def generate_story(
    images: List[UploadFile] = File(...),
    text: Optional[str] = Form(None),
    style: str = Form("emotional")
):
    # For now use only first image (or modify service later)
    first_image = images[0] if images else None

    result = await generate_story_from_image(first_image, text, style)
    return result
