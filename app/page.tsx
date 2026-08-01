import SummaryCards from "@/components/SummaryCards";
import HoldingsTable from "@/components/HoldingsTable";
import { portfolioService } from "@/lib/services/portfolio";
import SectorCards from "@/components/SectorCards";
import AutoRefresh from "@/components/AutoRefresh";

export default async function Home() {
  const portfolio = await portfolioService.getPortfolio();

  const cachedMinutesAgo = portfolio.fromCache
    ? Math.max(1, Math.round((Date.now() - portfolio.cachedAt) / 60000))
    : 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <AutoRefresh />

      <div className="mx-auto max-w-7xl space-y-8 p-8">
        <header>
          <h1 className="text-4xl font-bold">Portfolio Dashboard</h1>

          <p className="mt-2 text-gray-600">
            Track your investments with live market data.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Last Updated: {portfolio.lastUpdated} • Auto refresh every 15
            seconds
            {portfolio.fromCache ? (
              <span className="text-green-600">
                {" "}
                🟢 Cached (updated {cachedMinutesAgo} minutes ago)
              </span>
            ) : (
              <span> • Live Data • Cached for 5 min</span>
            )}
          </p>

          {portfolio.fetchError && (
            <p className="mt-2 text-sm font-medium text-amber-600">
              Unable to fetch latest market data. Showing last cached values.
            </p>
          )}
        </header>

        <SummaryCards summary={portfolio.summary} />

        <SectorCards sectors={portfolio.sectors} />

        <HoldingsTable holdings={portfolio.holdings} />
      </div>
    </main>
  );
}
