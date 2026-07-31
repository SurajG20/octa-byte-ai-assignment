import SummaryCards from "@/components/SummaryCards";
import HoldingsTable from "@/components/HoldingsTable";
import { portfolioService } from "@/lib/services/portfolio";
import SectorCards from "@/components/SectorCards";
import AutoRefresh from "@/components/AutoRefresh";

export default async function Home() {
  const portfolio = await portfolioService.getPortfolio();

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
          </p>
        </header>

        <SummaryCards summary={portfolio.summary} />

        <SectorCards sectors={portfolio.sectors} />

        <HoldingsTable holdings={portfolio.holdings} />
      </div>
    </main>
  );
}
