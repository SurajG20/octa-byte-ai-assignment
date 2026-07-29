import * as cheerio from "cheerio";

export interface GoogleQuote {
  symbol: string;
  peRatio: number | null;
  latestEarnings: string | null;
}

class GoogleService {
  private readonly headers = {
    "User-Agent": "Mozilla/5.0",
  };

  private findValue(text: string, label: string): string | null {
    const match = text.match(
      new RegExp(`${label}\\s*₹?\\s*(\\d+\\.\\d{2})`, "i"),
    );

    return match?.[1] ?? null;
  }

  async getStockDetails(
    symbol: string,
    exchange: "NSE" | "BSE",
  ): Promise<GoogleQuote> {
    try {
      const response = await fetch(
        `https://www.google.com/finance/quote/${symbol}:${exchange}`,
        {
          headers: this.headers,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Google Finance page.");
      }

      const html = await response.text();
      const text = cheerio.load(html)("body").text();

      const peRatio = this.findValue(text, "P/E ratio");
      const latestEarnings = this.findValue(text, "EPS");

      return {
        symbol,
        peRatio: peRatio ? Number(peRatio) : null,
        latestEarnings,
      };
    } catch (error) {
      console.error("Google Finance Error:", error);

      return {
        symbol,
        peRatio: null,
        latestEarnings: null,
      };
    }
  }
}

export const googleService = new GoogleService();
