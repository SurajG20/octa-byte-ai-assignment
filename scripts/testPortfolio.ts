import { portfolioService } from "../lib/services/portfolio";

async function main() {
  try {
  const portfolio = await portfolioService.getPortfolio();

  console.log(portfolio.sectors);
  } catch (error) {
    console.error(error);
  }
}

main();
