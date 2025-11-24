from fastapi import APIRouter

router = APIRouter(prefix="/health-check", tags=["Health"])

@router.get("")
def health_check():
    return {"status": "ok"}
