import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export interface YahooQuote {
  symbol: string;
  cmp: number;
}

class YahooService {
  async getCurrentPrice(
    symbol: string,
    exchange: "NSE" | "BSE",
  ): Promise<YahooQuote> {
    const yahooSymbol = `${symbol}.${exchange === "NSE" ? "NS" : "BO"}`;

    try {
      const result = await yahooFinance.quote(yahooSymbol);

      if (result.regularMarketPrice == null) {
        throw new Error("Market price not found");
      }

      return {
        symbol,
        cmp: result.regularMarketPrice,
      };
    } catch (error) {
      console.error("Yahoo Finance Error:", error);
      throw new Error(`Failed to fetch current price for ${symbol}`);
    }
  }
}

export const yahooService = new YahooService();
