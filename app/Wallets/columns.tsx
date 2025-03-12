"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
export type Position = {
  address: string;
  collateralType: string;
  collateralAmount: number;
  borrowed: number;
  healthFactor: number;
};

export const columns: ColumnDef<Position>[] = [
  {
    accessorKey: "address",
    header: "Wallet",
    cell: ({ row }) => {
      const address = row.getValue("address") as string;
      // Format address to show first 6 chars + ... + last 6 chars
      const formattedAddress = `${address.substring(
        0,
        6
      )}...${address.substring(address.length - 6)}`;
      return <span className="font-mono text-sm">{formattedAddress}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "collateralType",
    header: "Collateral Type",
    enableSorting: true,
  },
  {
    accessorKey: "collateralAmount",
    header: "Total Collateral",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("collateralAmount"));
      // Format as currency
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
      return <div>{formatted}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "borrowed",
    header: "Total Borrow",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("borrowed"));
      // Format as currency
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
      return <div>{formatted}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "healthFactor",
    header: "Health Factor",
    cell: ({ row }) => {
      const healthFactor = parseFloat(row.getValue("healthFactor"));
      
      // Determine color class based on health factor
      let bgColorClass = "bg-green-500/20 text-green-500 border-green-500/50";
      
      if (healthFactor < 1.3 && healthFactor >= 1.1) {
        bgColorClass = "bg-orange-500/20 text-orange-500 border-orange-500/50";
      } else if (healthFactor < 1.1) {
        bgColorClass = "bg-red-500/20 text-red-500 border-red-500/50";
      }
      
      return (
        <div className="flex justify-center">
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium ${bgColorClass} border`}
          >
            {healthFactor.toFixed(2)}
          </span>
        </div>
      );
    },
    enableSorting: true,
  },
];