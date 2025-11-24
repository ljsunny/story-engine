import os
from datetime import datetime
from typing import List
from utils.image_utils import image_to_base64

from openai import AsyncOpenAI
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

MODE_PROMPTS = {
    "story": """
Write an emotional, diary-like story inspired by the image.
Use creative interpretation, warm feelings, and expressive narrative.
""",

    "sns": """
Write a short and cute SNS-style caption (1–3 sentences).
Tone should be playful, casual, and emoji-friendly.
""",

    "article": """
Write an objective, analytical paragraph describing the image.
Avoid emotion and storytelling. Use a factual tone.
""",

    "caption": """
Write a purely visual description of what the image contains.
Do NOT add emotion, story, or interpretation.
""",

    "ad": """
Write a promotional advertisement caption based on the image.
Use attention-grabbing language, strong hooks, clear benefits, and a CTA.
Tone should be energetic, positive, and marketing-focused.
"""
}

async def generate_story_from_image(images: List, context: str, mode: str):
    prompt = MODE_PROMPTS[mode]

    # Convert images → base64
    base64_images = []
    for img in images:
        base64_images.append(await image_to_base64(img))

    # TODO: 실제 OpenAI Vision API 연결
    # 지금은 임시 Mock 응답
    return {
        "title": f"{mode.capitalize()} Mode Output",
        "story": f"This is a mock {mode} response. Real OpenAI output will appear here.",
        "mode": mode,
        "tags": ["demo", "mock"],
        "meta": {
            "created_at": datetime.utcnow().isoformat()
        }
    }
