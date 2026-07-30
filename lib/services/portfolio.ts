import { portfolio } from "../data/portfolio";
import { googleService } from "./google";
import { yahooService } from "./yahoo";
import { PortfolioHolding, PortfolioResponse } from "../../types/portfolio";

let cache: PortfolioResponse | null = null;
let lastFetched = 0;

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

class PortfolioService {
  async getPortfolio(): Promise<PortfolioResponse> {
    if (cache && Date.now() - lastFetched < CACHE_TIME) {
      console.log("Using Cache");
      return cache;
    }

    console.log("Fetching portfolio");

    const holdings: PortfolioHolding[] = [];

    let totalInvested = 0;
    let totalCurrent = 0;

    for (const holding of portfolio) {
      const [yahoo, google] = await Promise.all([
        yahooService.getCurrentPrice(holding.symbol, holding.exchange),
        googleService.getStockDetails(holding.symbol, holding.exchange),
      ]);
      const investedValue = holding.purchasePrice * holding.quantity;

      const currentValue = yahoo.cmp * holding.quantity;

      const profitLoss = currentValue - investedValue;

      const profitLossPercentage = (profitLoss / investedValue) * 100;

      holdings.push({
        ...holding,
        cmp: yahoo.cmp,
        peRatio: google.peRatio,
        latestEarnings: google.latestEarnings,
        investedValue,
        currentValue,
        profitLoss,
        profitLossPercentage,
      });
      totalInvested += investedValue;
      totalCurrent += currentValue;
    }

    const totalProfitLoss = totalCurrent - totalInvested;

    const totalProfitLossPercentage = (totalProfitLoss / totalInvested) * 100;

    const result: PortfolioResponse = {
      holdings,
      summary: {
        totalInvested,
        totalCurrent,
        totalProfitLoss,
        totalProfitLossPercentage,
      },
    };
    cache = result;
    lastFetched = Date.now();

    return result;
  }
}

export const portfolioService = new PortfolioService();
