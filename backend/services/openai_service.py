from utils.image_utils import image_to_base64

async def generate_story_from_image(image, context, style):
    img_base64 = await image_to_base64(image)

    # TODO: OpenAI Vision + GPT 연결
    # 지금은 테스트용 Mock 응답
    return {
        "title": "Sample Story Title",
        "story": "This is a sample generated story.",
        "tags": ["sample", "demo", "story"],
        "image_preview": "",
        "meta": {
            "style": style,
            "created_at": "2025-01-01T00:00:00Z"
        }
    }
