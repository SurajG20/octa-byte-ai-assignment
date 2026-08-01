1. No official APIs for Yahoo or Google Finance

Both only provide web pages, not public APIs. I used the yahoo-finance2 library for Yahoo, and scraped Google Finance with Cheerio. The Google scraping is fragile — if Google changes the page layout, the extraction can break.

2. Slow and unreliable API responses
Each holding needs two API calls, so the initial load felt slow. I added a simple in-memory cache with a 5-minute expiry so repeat visits and the 15-second refresh mostly read from memory instead of hitting the APIs again. If an API call fails, the service falls back to the last cached values for that symbol.

3. Auto refresh was not running
The refresh component existed but was not mounted in the page, so nothing was refreshing. I traced it through the code, re-enabled it, and confirmed the page re-fetches every 15 seconds.

4. Scraping returns messy or missing data
Google sometimes blocks the request or returns no P/E ratio. I made the scraper null-safe — missing values show as "-" in the table instead of breaking the page.

5. Symbols differ between exchanges
Yahoo needs exchange suffixes (.NS for NSE, .BO for BSE) while Google uses the exchange name directly. I mapped the symbol based on the holding's exchange before calling each API.

6. Inconsistent number formatting
Raw API values rendered as ₹1141.2 in some places. I added a shared formatINR helper that formats in en-IN locale with 2 decimals, and used it across the table and sector cards.

7. Cache status is not obvious to the user
It was unclear whether the page was showing live or cached data. I added fromCache and cachedAt to the response, and the page now shows "Live Data" or "Cached (updated X minutes ago)".

8. Avoiding crashes on API failure
Yahoo errors used to throw and take down the whole page. I changed the services to return safe fallback values (cmp: 0, nulls) and the page shows a warning banner when data could not be refreshed.