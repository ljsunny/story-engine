from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.health import router as health_router
from routers.story import router as story_router

app = FastAPI(
    title="Contextual Story Engine API",
    description="AI-powered story generation from images",
    version="0.1.0",
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 단계에서는 전체 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(health_router)
app.include_router(story_router)


@app.get("/")
def root():
    return {"message": "Contextual Story Engine Backend is running!"}
