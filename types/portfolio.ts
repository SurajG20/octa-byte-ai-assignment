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
  peRatio: number;
  latestEarnings: string;
}

// frontend showcase
export interface PortfolioData {
  id: number;
  stockName: string;
  symbol: string;
  exchange: "NSE" | "BSE";
  sector: string;
  purchasePrice: number;
  quantity: number;

  investment: number;
  portfolioPercentage: number;

  cmp: number;
  currentValue: number;
  gainLoss: number;

  peRatio: number;
  latestEarnings: string;
}
