"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
export type Position = {
  assetType: string;
  price: number;
  collateralAmount: number;
  totalBorrow: number;
  collateralAtRisk: number;
  walletsAtRisk: number;
};

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


export const columns: ColumnDef<Position>[] = [
    {
        accessorKey: "assetType",
        header: "Asset",
        enableSorting: true,
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

