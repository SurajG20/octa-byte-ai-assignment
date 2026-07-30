import { portfolio } from "../data/portfolio";
import { googleService } from "./google";
import { yahooService } from "./yahoo";

class PortfolioService {
  async getPortfolio() {
    const result = [];

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

      result.push({
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
    
    return {
      holdings: result,
      summary: {
        totalInvested,
        totalCurrent,
        totalProfitLoss,
        totalProfitLossPercentage,
      },
    };
  }
}

export const portfolioService = new PortfolioService();
