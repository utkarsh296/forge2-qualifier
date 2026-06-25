\# Forge 2 Qualifier — Kanban Board



A Trello-style Kanban board built with Laravel API + React (Vite).



\## Live URL

(Vercel URL — coming soon)



\## Models Used

\- OpenClaw: google/gemini-2.5-flash

\- Hermes: google/gemini-2.5-flash



\## Run Locally



\### Backend

```bash

cd backend

composer install

cp .env.example .env

php artisan key:generate

touch database/database.sqlite

php artisan migrate

php artisan serve

```



\### Frontend

```bash

cd frontend

npm install

npm run dev

```



\## Agent Loop

\- Human posts goal in #sprint-main

\- Hermes (brain) plans and assigns tasks

\- OpenClaw (hands) writes and runs code

\- Results reported back in Slack

