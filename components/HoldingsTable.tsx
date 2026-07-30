"use client";

import { PortfolioHolding } from "@/types/portfolio";
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
    header: "Stock",
  },
  {
    accessorKey: "quantity",
    header: "Qty",
  },
  {
    accessorKey: "purchasePrice",
    header: "Avg Price",
    cell: ({ getValue }) => `₹${getValue<number>()}`,
  },
  {
    accessorKey: "cmp",
    header: "CMP",
    cell: ({ getValue }) => `₹${getValue<number>()}`,
  },
  {
    accessorKey: "investedValue",
    header: "Invested",
    cell: ({ getValue }) => `₹${getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "portfolioPercentage",
    header: "Portfolio %",
    cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
  },
  {
    accessorKey: "currentValue",
    header: "Current",
    cell: ({ getValue }) => `₹${getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "profitLoss",
    header: "P/L",
    cell: ({ row }) => {
      const value = row.original.profitLoss;

      return (
        <span className={value >= 0 ? "text-green-600" : "text-red-600"}>
          ₹{value.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "profitLossPercentage",
    header: "P/L %",
    cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
  },
  {
    accessorKey: "peRatio",
    header: "P/E",
  },
  {
    accessorKey: "latestEarnings",
    header: "EPS",
  },
];

export default function HoldingsTable({ holdings }: HoldingsTableProps) {
  const table = useReactTable({
    data: holdings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b px-4 py-3 text-left font-semibold"
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
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-b px-4 py-3">
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
