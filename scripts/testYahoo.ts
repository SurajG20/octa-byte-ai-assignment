import { yahooService } from "../lib/services/yahoo";

async function main() {
  const quote = await yahooService.getCurrentPrice("HDFCBANK", "NSE");

  console.log(quote);
}

main();
