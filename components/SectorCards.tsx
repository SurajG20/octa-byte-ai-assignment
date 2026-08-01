import { SectorSummary } from "@/types/portfolio";
import { formatINR } from "@/utils/formatMoney";

interface SectorCardsProps {
  sectors: SectorSummary[];
}

export default function SectorCards({ sectors }: SectorCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {sectors.map((sector) => (
        <div
          key={sector.sector}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <h3 className="text-lg font-semibold">{sector.sector}</h3>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Invested</span>
              <span>₹{sector.invested.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Current</span>
              <span>₹{sector.current.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">P/L</span>

              <span
                className={
                  sector.profitLoss >= 0
                    ? "font-semibold text-green-600"
                    : "font-semibold text-red-600"
                }
              >
                ₹{sector.profitLoss.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
