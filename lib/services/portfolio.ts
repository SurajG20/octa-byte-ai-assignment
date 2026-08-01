import { portfolio } from "../data/portfolio";
import { googleService, GoogleQuote } from "./google";
import { yahooService, YahooQuote } from "./yahoo";
import { PortfolioHolding, PortfolioResponse, SectorSummary } from "../../types/portfolio";

let cache: PortfolioResponse | null = null;
let lastFetched = 0;

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

class PortfolioService {
  async getPortfolio(): Promise<PortfolioResponse> {
    if (cache && Date.now() - lastFetched < CACHE_TIME) {
      console.log("Using Cache");
      return {
        ...cache,
        fromCache: true,
        cachedAt: lastFetched,
      };
    }

    console.log("Fetching portfolio");

    const holdings: PortfolioHolding[] = [];
    let fetchError = false;

    let totalInvested = 0;
    let totalCurrent = 0;

    for (const holding of portfolio) {
      let yahoo: YahooQuote;
      let google: GoogleQuote;

      try {
        [yahoo, google] = await Promise.all([
          yahooService.getCurrentPrice(holding.symbol, holding.exchange),
          googleService.getStockDetails(holding.symbol, holding.exchange),
        ]);
      } catch (error) {
        console.error(`Failed to fetch data for ${holding.symbol}:`, error);
        fetchError = true;

        const cached = cache?.holdings.find(
          (h) => h.symbol === holding.symbol,
        );

        if (cached) {
          yahoo = { symbol: holding.symbol, cmp: cached.cmp };
          google = {
            symbol: holding.symbol,
            peRatio: cached.peRatio,
            latestEarnings: cached.latestEarnings,
          };
        } else {
          yahoo = { symbol: holding.symbol, cmp: holding.purchasePrice };
          google = {
            symbol: holding.symbol,
            peRatio: null,
            latestEarnings: null,
          };
        }
      }

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
        portfolioPercentage: 0,
      });
      totalInvested += investedValue;
      totalCurrent += currentValue;
    }

    for (const holding of holdings) {
      holding.portfolioPercentage =
        (holding.investedValue / totalInvested) * 100;
    }

    const sectorMap: Record<string, SectorSummary> = {};

    for (const holding of holdings) {
      if (!sectorMap[holding.sector]) {
        sectorMap[holding.sector] = {
          sector: holding.sector,
          invested: 0,
          current: 0,
          profitLoss: 0,
        };
      }

      sectorMap[holding.sector].invested += holding.investedValue;
      sectorMap[holding.sector].current += holding.currentValue;
      sectorMap[holding.sector].profitLoss += holding.profitLoss;
    }

    const sectors = Object.values(sectorMap);
    const totalProfitLoss = totalCurrent - totalInvested;

    const totalProfitLossPercentage = (totalProfitLoss / totalInvested) * 100;

    const result = {
      holdings,
      summary: {
        totalInvested,
        totalCurrent,
        totalProfitLoss,
        totalProfitLossPercentage,
      },
      sectors,
      lastUpdated: new Date().toLocaleTimeString(),
      fromCache: false,
      cachedAt: Date.now(),
      fetchError,
    };
    cache = result;
    lastFetched = Date.now();

    return result;
  }
}

export const portfolioService = new PortfolioService();
