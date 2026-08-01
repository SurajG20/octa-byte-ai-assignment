# Portfolio Dashboard

## About

A simple dashboard that shows my stock portfolio with live prices. The portfolio data is stored locally in the repo. The app fetches the current price of each stock, calculates profit/loss, and groups holdings by sector.

This was built as an assignment to practice server components, client components, and API integration in Next.js.

## Features

- Live CMP for every holding using Yahoo Finance
- P/E ratio and latest earnings from Google Finance
- Summary cards: total invested, current value, profit/loss, return
- Sector-wise breakdown
- Holdings table with sorting-ready columns (TanStack Table)
- Auto refresh every 15 seconds
- In-memory caching (5 minutes) to reduce API calls
- Loading skeleton while data is being fetched
- Graceful fallback when an API fails: shows last cached values

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- yahoo-finance2 (Yahoo Finance)
- Cheerio (scraping Google Finance)
- TanStack Table

## Technical Details & Challenges

- See [Technical.MD](TECHNICAL.MD) for the architecture, data flow, caching, and auto refresh.
- See [CHALLENGES.md](CHALLENGES.md) for the challenges faced and how they were solved.

## Project Structure

```
app/
  page.tsx            # main dashboard page
  loading.tsx         # loading skeleton
  error.tsx           # error page
components/
  SummaryCards.tsx    # summary cards
  SectorCards.tsx     # sector-wise cards
  HoldingsTable.tsx   # holdings table
  AutoRefresh.tsx     # refreshes page every 15s
lib/
  data/portfolio.ts   # static portfolio data
  services/           # Yahoo, Google, portfolio services
utils/
  formatMoney.ts      # number formatting helpers
```

## Installation

```bash
npm install
```

## Running the Project

```bash
npm run dev
```

Open http://localhost:3000.

## Notes

- Portfolio data is static and stored in `lib/data/portfolio.ts`.
- P/E ratio and latest earnings may be null if Google Finance blocks the request.
- If Yahoo Finance is down, the app shows the last cached price and displays a warning on the page.
- Cached data is stored in memory, so it resets when the server restarts.
