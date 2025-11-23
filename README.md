# story-engine

좋아! 아래는 **영어 + 한국어 혼합 버전 README.md** 초안이야.
GitHub에 그대로 붙여 넣으면 깔끔하게 보이도록 구성해뒀어.
필요하면 이미지, 배지, 설치 방법 등 더 추가할 수 있어.

---

# 📘 **Contextual Story Engine**

*AI-powered image-based story generator*
이미지 기반 AI 스토리 자동 생성 서비스

---

## 📝 **Overview | 프로젝트 개요**

**Contextual Story Engine** is an AI-powered web/app service that automatically generates stories, titles, and hashtags from uploaded images using **OpenAI Vision + GPT models**.
사용자가 이미지를 업로드하면, OpenAI Vision과 GPT 모델을 활용해 **제목 / 스토리 / 해시태그**를 자동 생성해주는 서비스입니다.

Designed as a fast and lightweight MVP with **no database**, optimized for quick deployment and iteration.
DB 없이 동작하는 **가벼운 MVP 구조**로 설계되어 빠른 개발과 배포가 가능합니다.

---

## ✨ **Features | 주요 기능**

### 🔹 Image Upload (Web & Mobile)

웹/앱에서 이미지 업로드 후 스토리 자동 생성

### 🔹 AI-based Story Generation

OpenAI Vision + GPT로 이미지 분석 및 스토리 생성

### 🔹 Title + Story + Hashtag 자동 생성

제목 / 본문 / 해시태그까지 자동 생성

### 🔹 Multiple Style Presets

여러 스타일 지원

* emotional
* simple
* funny
* brand tone

### 🔹 Semi-automatic SNS Sharing

SNS에 바로 붙여넣을 수 있도록 자동 텍스트 복사
(반자동 공유 방식, 정책 위반 없음)

### 🔹 No DB (MVP)

데이터베이스 없이 동작 → 속도 빠르고 운영 비용 최소화

---

## 🛠 **Tech Stack | 기술 스택**

### **Backend (백엔드)**

* FastAPI
* Python
* OpenAI API (Vision + GPT)

### **Frontend Web (웹)**

* Next.js (React)
* Tailwind CSS

### **Mobile App (앱)**

* React Native (Expo)

### **Infra**

* Vercel (Web)
* Railway (Backend)
* Expo Go (Mobile)

---

## 🧩 **Architecture | 시스템 구조**

```
User (Web / App)
     ↓
Frontend (Next.js / React Native)
     ↓ FormData (image + context)
FastAPI Backend
     ↓
OpenAI GPT + Vision
     ↓
Generated Story (title + body + tags)
     ↓
SNS Semi-Auto Sharing
```

---

## 🔗 **API Endpoints | API 명세**

### **POST /generate-story**

Generate a story from an uploaded image.
이미지 기반 스토리 생성

**Request (FormData)**

* image (binary)
* context (optional)
* style (optional)

**Response (JSON)**

```json
{
  "title": "A Warm Afternoon Moment",
  "story": "Under the soft sunlight, a cup of coffee...",
  "tags": ["coffee", "daily", "aesthetic"],
  "image_preview": "https://...",
  "meta": {
    "style": "emotional",
    "created_at": "2025-11-23T12:00:00Z"
  }
}
```

---

### **POST /recommend-tags**

Return auto-generated hashtags.
해시태그 추천

---

### **GET /health-check**

Return basic server status.
서버 정상 상태 체크

```json
{ "status": "ok" }
```

---

## 📁 **Project Structure | 프로젝트 구조**

```
story-engine/
│
├── backend/                 # FastAPI backend
│   ├── main.py
│   ├── routers/
│   ├── services/
│   ├── models/
│   └── requirements.txt
│
├── web/                     # Next.js frontend
│   ├── app/ or pages/
│   ├── components/
│   └── package.json
│
├── app/                     # React Native (Expo)
│   ├── App.js
│   ├── screens/
│   ├── components/
│   └── package.json
│
└── docs/                    # Documentation (기획, API, 설계)
```

---

## 🚀 **Getting Started | 시작하기**

### **1) Backend**

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### **2) Web**

```
cd web
npm install
npm run dev
```

### **3) Mobile**

```
cd app
npm install
expo start
```

---

## 📌 **Roadmap | 개발 로드맵**

* [ ] Improve story style presets
* [ ] Add optional login + history saving (with DB)
* [ ] Add multi-image story generation
* [ ] Add theme-based templates for Instagram posts
* [ ] Auto-publishing (if platform opens API)

---

## 💬 **Credits & Contact**

Created by: ** Jisun Lee **
with help from AI assistants (ChatGPT, Cursor, Lovable)

---


