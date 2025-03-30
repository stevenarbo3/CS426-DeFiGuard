"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
export type Position = {
    assetType: string;
    price: number;
    collateralAmount: number;
    totalBorrow: number;
    collateralAtRisk: number;
    walletsAtRisk: number;
    totalSupply: number;
    supplyChangePercent: number;
    borrowChangePercent: number;
    utilizationRate: number;
    utilizationChangePercent: number;
    collateralRiskChangePercent: number;
  };  

// Function to format numbers into K, M, B
function formatNumber(value: number): string {
    if (value >= 1e9) {
        return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
        return `${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
        return `${(value / 1e3).toFixed(2)}K`;
    } else {
        return value.toString();
    }
}

// Function to define the columns for the table
export const columns: ColumnDef<Position>[] = [
    {
        accessorKey: "assetType",
        header: "Asset",
        enableSorting: true,
        cell: ({ row }) => {
          const asset = row.getValue("assetType") as string;
          return (
            <Link href={`/individual_assets/${asset.toLowerCase()}`} className="text-blue-500 hover:underline">
              {asset}
            </Link>
          );
        },
      },
    {
        accessorKey: "price",
        header: "Price",
        enableSorting: true,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            // Use formatNumber to format large numbers
            const formatted = formatNumber(price);
            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: "collateralAmount",
        header: "Total Collateral",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("collateralAmount"));
            const formatted = formatNumber(amount);
            return <div>{formatted}</div>;
        },
        enableSorting: true,
    },
    {
        accessorKey: "totalBorrow",
        header: "Total Borrow Power",
        enableSorting: true,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalBorrow"));
            const formatted = formatNumber(amount);
            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: "collateralAtRisk",
        header: "Collateral at Risk",
        enableSorting: true,
        cell: ({ row }) => {
            const risk = parseFloat(row.getValue("collateralAtRisk"));
            const formatted = formatNumber(risk);
            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: "walletsAtRisk",
        header: "Wallets at Risk",
        enableSorting: true,
        cell: ({ row }) => {
            const risk = parseFloat(row.getValue("walletsAtRisk"));
            const formatted = formatNumber(risk);
            return <div>{formatted}</div>;
        },
    },
];

