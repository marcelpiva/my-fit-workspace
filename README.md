# MyFit Workspace

White-label fitness platform for personal trainers, coaches, gyms, and fitness professionals.

## Overview

MyFit is a comprehensive fitness platform that allows professionals to:
- Create and manage workout plans
- Build nutrition/diet plans
- Track client progress (photos, measurements, performance)
- Communicate via real-time chat
- Process payments and subscriptions
- Offer their services through a marketplace

Users can have multiple roles (student, trainer, coach, gym owner) and belong to multiple organizations simultaneously.

## Repository Structure

```
myfit/
├── app/          # Flutter mobile app (myfit-app)
├── api/          # FastAPI backend (myfit-api)
├── web/          # Landing page - Next.js (myfit-web)
├── docs/         # Documentation (myfit-docs)
└── assets/       # Shared brand assets
```

## Technology Stack

| Component | Technology |
|-----------|------------|
| Mobile App | Flutter 3.x, Riverpod, go_router |
| Backend | FastAPI, PostgreSQL, Redis, Celery |
| Landing Page | Next.js 14, Tailwind CSS, shadcn/ui |
| AI | OpenAI/Claude API |
| Payments | Stripe, PagSeguro, Asaas |

## Getting Started

### Prerequisites

- Flutter SDK 3.x
- Python 3.11+
- Node.js 20+
- PostgreSQL 16
- Redis 7

### Setup

```bash
# Clone the workspace
git clone https://github.com/marcelpiva/myfit-workspace.git
cd myfit-workspace

# Setup Flutter app
cd app
flutter pub get

# Setup API
cd ../api
python -m venv .venv
source .venv/bin/activate  # or `.venv\Scripts\activate` on Windows
pip install -e ".[dev]"

# Setup Web
cd ../web
npm install
```

### Running

```bash
# Run Flutter app
cd app && flutter run

# Run API
cd api && uvicorn src.main:app --reload

# Run Web
cd web && npm run dev
```

## Design System

### Colors

| Token | Light | Dark |
|-------|-------|------|
| Primary | #f53321 | #ff513c |
| Secondary | #00a0b1 | #00c2d4 |
| Accent | #00a927 | #00d13b |
| Background | #f8fafe | #010207 |

### Typography

- Font: Manrope (Google Fonts)
- Weights: 400, 500, 600, 700

## Domain

- **Production**: https://myfitplatform.com
- **API**: https://api.myfitplatform.com
- **App**: https://app.myfitplatform.com

## License

Proprietary - All rights reserved.
