import { portfolioService } from "../lib/services/portfolio";

async function main() {
  try {
    const portfolio = await portfolioService.getPortfolio();
    console.table(portfolio.summary);
    console.table(portfolio.holdings);
  } catch (error) {
    console.error(error);
  }
}

main();
