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
    header: "Particulars",
  },
  {
    accessorKey: "purchasePrice",
    header: "Purchase Price",
    cell: ({ getValue }) => `₹${getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "quantity",
    header: "Quantity (Qty)",
  },
  {
    accessorKey: "investedValue",
    header: "Investment",
    cell: ({ getValue }) => `₹${getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "portfolioPercentage",
    header: "Portfolio (%)",
    cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
  },
  {
    accessorKey: "exchange",
    header: "NSE/BSE",
  },
  {
    accessorKey: "cmp",
    header: "CMP",
    cell: ({ getValue }) => `₹${getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "currentValue",
    header: "Present Value",
    cell: ({ getValue }) => `₹${getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "profitLoss",
    header: "Gain/Loss",
    cell: ({ row }) => {
      const value = row.original.profitLoss;

      return (
        <span
          className={
            value >= 0
              ? "font-medium text-green-600"
              : "font-medium text-red-600"
          }
        >
          ₹
          {value.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "peRatio",
    header: "P/E Ratio",
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return value ?? "-";
    },
  },
  {
    accessorKey: "latestEarnings",
    header: "Latest Earnings",
    cell: ({ getValue }) => getValue<string | null>() ?? "-",
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
