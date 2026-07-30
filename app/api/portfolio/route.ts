import { NextResponse } from "next/server";
import { portfolioService } from "@/lib/services/portfolio";

export async function GET() {
  try {
    const portfolio = await portfolioService.getPortfolio();

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch portfolio",
      },
      {
        status: 500,
      },
    );
  }
}
