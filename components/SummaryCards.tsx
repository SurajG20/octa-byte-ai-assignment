import { PortfolioSummary } from "@/types/portfolio";
import { formatMoney } from "@/utils/formatMoney";
interface SummaryCardsProps {
  summary: PortfolioSummary;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="rounded-lg border p-4 shadow">
        <h2 className="text-sm text-gray-500">Total Invested</h2>
        <p className="text-2xl font-bold">
          ₹{formatMoney(summary.totalInvested)}
        </p>
      </div>

      <div className="rounded-lg border p-4 shadow">
        <h2 className="text-sm text-gray-500">Current Value</h2>
        <p className="text-2xl font-bold">
          ₹{summary.totalCurrent.toLocaleString()}
        </p>
      </div>

      <div className="rounded-lg border p-4 shadow">
        <h2 className="text-sm text-gray-500">Profit / Loss</h2>
        <p
          className={`text-2xl font-bold ${
            summary.totalProfitLoss >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₹{summary.totalProfitLoss.toLocaleString()}
        </p>
      </div>

      <div className="rounded-lg border p-4 shadow">
        <h2 className="text-sm text-gray-500">Return</h2>
        <p
          className={`text-2xl font-bold ${
            summary.totalProfitLossPercentage >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {summary.totalProfitLossPercentage.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
