from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List
from services.openai_service import generate_story_from_image

router = APIRouter(prefix="/generate-story", tags=["Story"])

@router.post("")
async def generate_story(
    images: List[UploadFile] = File(...),
    text: str = Form(None),
    mode: str = Form("story")
):
    valid_modes = ["story", "sns", "article", "caption", "ad"]

    if mode not in valid_modes:
        raise HTTPException(status_code=400, detail=f"Invalid mode. Choose from: {valid_modes}")

    if len(images) > 5:
        raise HTTPException(status_code=400, detail="You can upload up to 5 images.")

    result = await generate_story_from_image(images, text, mode)
    return result
