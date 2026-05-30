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
- **Guest App (/guest)** — Home, AI Concierge chat (multilingual + voice mic + auto-split in demo), Requests tracker, Recommendations modal, Profile, proactive rain-nudge popup.
- **Staff App (/staff)** — Dashboard with KPIs + Next-Best-Action + AI-ranked queue, Task Queue with filters, polymorphic Task Detail, Route map, AI shift handover.
- **Admin Dashboard (/admin)** — Sidebar nav, GM Daily Digest, 4 KPI cards, charts, anomaly callouts, drill cards to RCA / Simulation / Forecast, Live Operations table, AI Insights.
- **Cross-App Demo (/demo)** — Two phones + laptop side-by-side, 8-phase auto-walking storyline with spotlight focus.

## Iteration 2 Changes (2026-02)
- **Guest** — "Ticket Raised!" success modal with green check + summary appears after sending a concierge message, then auto-redirects to My Requests after ~2.4s.
- **Staff** — Department badge now on every task card. Task Detail is polymorphic per `task.kind`:
  - **Towel / Water** → "Items to deliver" + 3-step Delivery flow.
  - **Food** → "Order details" + 4-step Service flow.
  - **Checkout** → 7-item Checkout Checklist (mini-bar / damage / keys / folio / luggage / PMS).
  - **AC / Maintenance** → 5-step AI Diagnostic Checklist.
  - **Wi-Fi** → 3-step Quick Fix steps.
- **Staff "Raise for Guest"** flow: floating FAB on Dashboard + Queue → bottom sheet with room picker, request-type chips (Towel / Water / Food / Maint / Amenity / Other) and note → submits a new task into the queue + green success toast.
- **Admin sidebar** trimmed to 5 items (removed Rooms + Settings).
- **Admin Staff** view rebuilt as **AI Performance Pulse** — per-staff cards with SLA / CSAT / burnout risk / sentiment dot / AI coaching note + Coach button.
- **Admin Analytics** view rebuilt as **AI Narrative Insights** — 3 confidence-scored narrative cards, Revenue × CSAT composed chart, Guest journey funnel, stacked sentiment trend.
- **LiveOps** rows updated to match new task taxonomy (Towel Request / Water Bottle / Food Placed / Checkout).

## Testing
- `testing_agent_v3` iteration 1: **frontend 100% pass**, 17/17 checkpoints.
- `testing_agent_v3` iteration 2: **frontend 100% pass**, 9/9 checkpoints, 0 bugs.

## Prioritized Backlog
- **P1** Optional: replace scripted concierge with real Emergent LLM call (Claude/GPT) for live Q&A demos.
- **P1** Persist requests to MongoDB so cross-session demos retain state.
- **P2** Add admin Rooms + Staff modules (currently placeholder).
- **P2** Add export-to-PDF on GM Daily Digest for sharing with investors.
- **P3** Add white-label theming so the prototype can be re-skinned per hotel chain.

## Next Tasks
- Awaiting investor feedback round; ready for live pitch.
