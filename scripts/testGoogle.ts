import { googleService } from "../lib/services/google";

async function main() {
  const data = await googleService.getStockDetails("HDFCBANK", "NSE");

  console.log(data);
}

main();
