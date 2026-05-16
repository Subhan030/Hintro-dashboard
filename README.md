# Hintro Dashboard

A responsive mock dashboard built as a frontend assignment for Hintro, demonstrating live API integration, state management, and pixel-accurate UI implementation.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework with full type safety |
| Vite | Lightning-fast dev server & bundler |
| React Router v6 | Client-side routing |
| dayjs | Lightweight date formatting |
| CSS Custom Properties + CSS Modules | Scoped, token-driven styling - zero Tailwind |

---

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev       # → http://localhost:5173

# Production build
npm run build
```

---

## User Switching

The app supports two mock user states to demonstrate empty vs. populated UI:

| User | State | How to switch |
|---|---|---|
| `u1` | Empty state - no subscription, no sessions, no data | Click **[Switch to u2]** in the sidebar footer |
| `u2` | Active user - live API data (values randomised per request) | Click **[Switch to u1]** in the sidebar footer |

The selected user is persisted in `localStorage` and survives page refresh.

---

## Features

### Dashboard Page (`/`)
- **Greeting** - time-of-day personalised (Good morning / afternoon / evening)
- **Subscription Card** - plan name, billing cycle, colour-coded status badge
- **Usage Stats** - KB Files with animated progress bar, Vocab Terms, Notes count
- **Call Session Stats** - Total Sessions, Average Duration (formatted), AI Used, Last Session (relative date)
- **Recent Calls** - grouped by date with ordinal formatting (e.g. April 22nd)

### Call History Page (`/call-history`)
- Full table with columns: Client, Description, Participants (with "(You)" badge), Duration, Date, Status
- **Pagination** - "Load more" appends next batch
- **Mobile** - table collapses to card-style layout at < 640px

### Sidebar
- Persistent navigation with active link highlighting
- **Feedback** button opens a slide-in panel
- **Feedback History** displays past submission count
- Mobile: hidden by default, toggled via hamburger button with full-height drawer

### Feedback Panel
- Star rating (1–5, required) + optional text comment
- Saves to `localStorage` under key `hintro_feedback` as a JSON array
- Subsequent submissions append to the array; never overwrites

---

## API Integration

Base URL: `https://mock-backend-hintro.vercel.app`

All requests include `x-user-id: u1 | u2` header automatically via the API client.

| Endpoint | Used for |
|---|---|
| `GET /api/auth/profile` | User name, email in sidebar |
| `GET /api/auth/dashboard` | Subscription card + Usage stats |
| `GET /api/call-sessions/stats` | Call stats row on dashboard |
| `GET /api/call-sessions?limit=N` | Recent calls + Call History page |

---

## Duration Formatting

| Raw value | Display |
|---|---|
| `2211` seconds | `36m 51s` |
| `3871` seconds | `1h 4m` |
| `0` seconds | `0` |

---

## Assumptions & Deviations

- `averageDuration` from the API is interpreted as **seconds** and formatted via `formatDuration()`
- Feedback is stored entirely in `localStorage` - no backend call
- The "Watch Tutorial" button in the header is UI-only (no link target provided in spec)
- The dev user-switcher in the sidebar footer is intentionally visible for reviewer convenience
- Date headers in Recent Calls use ordinal formatting (`April 22nd`) via `dayjs` `advancedFormat` plugin
- CSS strictly uses design tokens (`var(--*)`) - zero hardcoded hex values in component files

---

## Project Structure

```
src/
├── api/              # Typed fetch client + endpoint functions
├── components/       # Shared: AppShell, Spinner, EmptyState
├── context/          # UserContext (u1 / u2 switcher)
├── features/
│   ├── dashboard/    # DashboardHeader, CallStatsRow, UsageStats, SubscriptionCard, RecentCalls
│   ├── call-sessions/ # CallHistory page
│   └── sidebar/      # Sidebar, FeedbackPanel
├── hooks/            # useApi, useFeedback
├── styles/           # tokens.css, reset.css
├── types/            # API response interfaces
└── utils/            # formatDuration, formatDate, formatRelativeDate
```
