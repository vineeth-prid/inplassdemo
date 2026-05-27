# iNPLASS — Investor Prototype PRD

## Original Problem Statement
Build a high-fidelity, investor-ready prototype for **iNPLASS — The NextGen Hotel Management Solution**, an AI-powered hospitality platform.  Three integrated apps: **Guest App** (mobile), **Staff App** (mobile), **Admin / HOP Dashboard** (web). 16 screens across 3 surfaces, with a scripted cross-app "Play Investor Demo" auto-walk.

## User Choices (Round 1, 2026-02)
- AI features → **scripted mock responses** (no live LLM).
- Demo button → **auto-walking Play Demo** (timed transitions).
- Scope → **all 16 screens** built in v1.
- Persistence → **in-memory mock data**, no MongoDB writes.
- Logo → use uploaded `Inplass Logo.png` on splash + headers.

## Architecture
- Frontend only: React 19 + Tailwind + shadcn/ui primitives + Recharts + Framer Motion.
- Backend left at starter `/api/` only — no business endpoints (mock data is client-side in `/app/frontend/src/data/mockData.js`).
- Routing: `/` Splash, `/guest`, `/staff`, `/admin`, `/demo` (cross-app viewer).
- Demo orchestration via React Context (`DemoContext`) with 8-phase timeline driving all three apps simultaneously inside scaled device frames.

## User Personas
- **Guest** John Kelly (Platinum, Room 412) – uses Guest mobile app.
- **Staff** Linda Martinez (Housekeeping Supervisor) – uses Staff mobile app.
- **GM** (anon) – uses Admin / HOP web dashboard.

## Core Requirements (static)
- Brand palette strictly honored (#5B2C91 primary, #F47B20 accent).
- AI features visually badged with ✨ sparkle for investor clarity.
- Every interactive element has `data-testid`.
- Responsive: mobile apps render inside iPhone-style frames; admin is desktop-first (1440px).

## What's Been Implemented (2026-02)
- **Splash (/)** — Logo, "AI orchestrates every guest moment / Let's Hotel" hero, Play Investor Demo CTA, 3 app entry cards.
- **Guest App (/guest)** — Home (welcome + 2×2 quick actions + featured carousel), AI Concierge chat (multilingual toggle EN/ES/FR/AR/中文, voice mic pulse, auto-split tickets in demo), Requests tracker (3 cards w/ SLA + progress), Recommendations modal (itinerary + restaurants + commute), Profile, and a proactive AI rain-nudge popup.
- **Staff App (/staff)** — Dashboard (KPI 12/2/18 + Next-Best-Action hero card + AI-ranked queue), Task Queue with filter chips, Task Detail bottom-sheet w/ auto checklist + photo QA + AI Copilot chat, Route map with optimized path + bundling insight, AI-generated Shift Handover summary.
- **Admin Dashboard (/admin)** — Sidebar nav, GM Daily Digest hero, 4 KPI cards, live request volume area chart, department donut, complaint horizontal bar, Floor 4 AC pattern callout, drill cards to Root Cause, What-If Simulation (sliders), Forecast Heatmap, Live Operations table with search + filters + SLA color rows, AI Insights with anomalies + recommended actions.
- **Cross-App Demo (/demo)** — Two scaled phone frames + laptop frame side-by-side, 8-phase scripted storyline (John types → AI splits → Linda gets task → GM dashboard updates → task complete → tracker updates → pattern surfaces), auto-advances with spotlight focus animation, restart/pause/play controls.

## Testing
- `testing_agent_v3` iteration 1: **frontend 100% pass**, 0 bugs, 17/17 feature checkpoints verified, no console errors.

## Prioritized Backlog
- **P1** Optional: replace scripted concierge with real Emergent LLM call (Claude/GPT) for live Q&A demos.
- **P1** Persist requests to MongoDB so cross-session demos retain state.
- **P2** Add admin Rooms + Staff modules (currently placeholder).
- **P2** Add export-to-PDF on GM Daily Digest for sharing with investors.
- **P3** Add white-label theming so the prototype can be re-skinned per hotel chain.

## Next Tasks
- Awaiting investor feedback round; ready for live pitch.
