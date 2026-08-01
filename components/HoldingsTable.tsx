"use client";

import { PortfolioHolding } from "@/types/portfolio";
import { formatINR } from "@/utils/formatMoney";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface HoldingsTableProps {
  holdings: PortfolioHolding[];
}

const columns: ColumnDef<PortfolioHolding>[] = [
  {
    accessorKey: "stockName",
    header: "Particulars",
  },
  {
    accessorKey: "purchasePrice",
    header: () => <div className="text-right">Purchase Price</div>,
    cell: ({ getValue }) => (
      <div className="text-right">₹{formatINR(getValue<number>())}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Quantity (Qty)</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<number>()}</div>
    ),
  },
  {
    accessorKey: "investedValue",
    header: () => <div className="text-right">Investment</div>,
    cell: ({ getValue }) => (
      <div className="text-right">₹{formatINR(getValue<number>())}</div>
    ),
  },
  {
    accessorKey: "portfolioPercentage",
    header: () => <div className="text-right">Portfolio (%)</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<number>().toFixed(2)}%</div>
    ),
  },
  {
    accessorKey: "exchange",
    header: "NSE/BSE",
  },
  {
    accessorKey: "cmp",
    header: () => <div className="text-right">CMP</div>,
    cell: ({ getValue }) => (
      <div className="text-right">₹{formatINR(getValue<number>())}</div>
    ),
  },
  {
    accessorKey: "currentValue",
    header: () => <div className="text-right">Present Value</div>,
    cell: ({ getValue }) => (
      <div className="text-right">₹{formatINR(getValue<number>())}</div>
    ),
  },
  {
    accessorKey: "profitLoss",
    header: () => <div className="text-right">Gain/Loss</div>,
    cell: ({ row }) => {
      const value = row.original.profitLoss;

      return (
        <div
          className={`text-right font-medium ${
            value >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₹{formatINR(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "peRatio",
    header: () => <div className="text-right">P/E Ratio</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<number | null>() ?? "-"}</div>
    ),
  },
  {
    accessorKey: "latestEarnings",
    header: () => <div className="text-right">Latest Earnings</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<string | null>() ?? "-"}</div>
    ),
  },
];
export default function HoldingsTable({ holdings }: HoldingsTableProps) {
  const table = useReactTable({
    data: holdings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-h-162.5 overflow-auto rounded-lg border">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b px-4 py-3 text-sm font-semibold text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-b px-4 py-3 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
