from fastapi import APIRouter, UploadFile, File, Form
from services.openai_service import generate_story_from_image

router = APIRouter(prefix="/generate-story", tags=["Story"])

@router.post("")
async def generate_story(
    image: UploadFile = File(...),
    context: str = Form(None),
    style: str = Form("emotional")
):
    result = await generate_story_from_image(image, context, style)
    return result
