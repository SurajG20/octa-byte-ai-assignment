// holdings
export interface PortfolioStock {
  id: number;
  stockName: string;
  symbol: string;
  exchange: "NSE" | "BSE";
  sector: string;
  purchasePrice: number;
  quantity: number;
}

// fetch from apis.
export interface LiveStockData {
  symbol: string;
  cmp: number;
  peRatio: number | null;
  latestEarnings: string | null;
}

// frontend showcase
export interface PortfolioHolding {
  id: number;
  stockName: string;
  symbol: string;
  exchange: "NSE" | "BSE";
  sector: string;
  purchasePrice: number;
  quantity: number;

  investedValue: number;
  currentValue: number;

  profitLoss: number;
  profitLossPercentage: number;

  cmp: number;
  peRatio: number | null;
  latestEarnings: string | null;
}

export interface PortfolioSummary {
  totalInvested: number;
  totalCurrent: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
}

export interface PortfolioResponse {
  holdings: PortfolioHolding[];
  summary: PortfolioSummary;
}
