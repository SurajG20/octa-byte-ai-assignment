# Technical Document

## Overview

A portfolio dashboard built with Next.js App Router. It shows holdings with live prices, profit/loss, and sector-wise distribution. Portfolio data is stored in a local file, and live data is fetched from public finance sources.

## Project Structure

- `app/page.tsx` — main dashboard page (server component)
- `app/loading.tsx` — loading skeleton
- `components/` — summary cards, sector cards, holdings table, auto refresh
- `lib/data/portfolio.ts` — static portfolio data
- `lib/services/` — Yahoo, Google, and Portfolio services
- `utils/` — number formatting helpers

## Data Flow

1. The page calls `portfolioService.getPortfolio()`.
2. For each holding, the service fetches CMP from Yahoo Finance and P/E ratio plus latest earnings from Google Finance.
3. The service combines both responses and calculates invested value, current value, gain/loss, and portfolio percentage.
4. The result is passed to the UI components.

## API Integration

- **Yahoo Finance**: used through the `yahoo-finance2` package to get the current market price (CMP) for each symbol.
- **Google Finance**: the stock page is scraped using Cheerio to extract P/E ratio and latest earnings from the page text.

## Caching

A simple in-memory cache stores the full portfolio response for 5 minutes. Within that window, the service returns cached data and skips the API calls. This reduces load on the external APIs.

## Auto Refresh

The page has an `AutoRefresh` client component that calls `router.refresh()` every 15 seconds. This re-runs the server component and re-fetches data if the cache has expired.

## Error Handling

- Yahoo or Google failures are caught per holding.
- On failure, the service falls back to the last cached values for that symbol.
- The page shows a warning banner when data is stale, but the app never crashes.
- A missing P/E ratio or earnings value shows as "-" in the table.

## Challenges

See [CHALLENGES.md](CHALLENGES.md) for the challenges faced and how they were solved.
