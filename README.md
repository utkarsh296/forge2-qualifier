# Forge 2 Qualifier — Kanban Board

A Trello-style Kanban board built with Laravel API + React (Vite).

## Live URL
Coming soon (Vercel deployment)

## Models Used
- OpenClaw (hands): google/gemini-2.5-flash
- Hermes (brain): google/gemini-2.5-flash

## Run Locally

### Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

### Frontend
cd frontend
npm install
npm run dev

## Agent Loop
- Human posts goal in #sprint-main
- Hermes (brain) plans and assigns tasks
- OpenClaw (hands) writes and runs code
- Results reported back in Slack channels