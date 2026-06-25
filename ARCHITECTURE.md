\# Architecture



\## Agents

\- \*\*OpenClaw\*\* (The Hands): Writes code, runs commands, reports in #agent-coder

\- \*\*Hermes\*\* (The Brain): Plans tasks, remembers context, assigns work, runs cron jobs



\## Slack Channels

\- #sprint-main: Human talks to Hermes

\- #agent-coder: OpenClaw works here

\- #agent-log: Raw agent activity logs



\## Model Routing

\- Hermes (planning): google/gemini-2.5-flash — large context, good reasoning

\- OpenClaw (coding): google/gemini-2.5-flash — handles code generation well



\## Stack

\- Backend: Laravel 12 + SQLite

\- Frontend: React + Vite

\- Agents: OpenClaw + Hermes

\- Channel: Slack (Socket Mode)

