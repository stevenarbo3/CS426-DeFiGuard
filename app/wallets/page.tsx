import { Metadata } from "next";
import { Position, columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Wallets | DeFiGuard",
  description: "Monitor wallet positions in the lending protocol",
};

async function getData(): Promise<Position[]> {
  return [
    {
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      collateralType: "ETH",
      collateralAmount: 15000,
      borrowed: 7500,
      healthFactor: 1.25,
    },
    {
      address: "0x1234567890AbCdEf1234567890AbCdEf12345678",
      collateralType: "ETH",
      collateralAmount: 42000,
      borrowed: 12000,
      healthFactor: 3.2,
    },
    {
      address: "0x9876543210AbCdEf9876543210AbCdEf98765432",
      collateralType: "ETH",
      collateralAmount: 8000,
      borrowed: 6000,
      healthFactor: 1.09,
    },
    {
      address: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf12",
      collateralType: "ETH",
      collateralAmount: 25000,
      borrowed: 5000,
      healthFactor: 4.5,
    },
    // Additional sample data
    {
      address: "0x8A9c4dfe8b9D8962B0cD2a3568B2878256452E89",
      collateralType: "WBTC",
      collateralAmount: 120000,
      borrowed: 50000,
      healthFactor: 2.1,
    },
    {
      address: "0x3F4e524d7B2B0fEE9153267A9E55D482f5508a52",
      collateralType: "ETH",
      collateralAmount: 9500,
      borrowed: 7000,
      healthFactor: 1.15,
    },
    {
      address: "0x72E96F2c3301f9dAFf4707F33012797ce0D764E4",
      collateralType: "USDC",
      collateralAmount: 35000,
      borrowed: 20000,
      healthFactor: 1.5,
    },
    {
      address: "0xBf3D6f830Ce263CAE987193982192Cd990442B53",
      collateralType: "ETH",
      collateralAmount: 18000,
      borrowed: 9000,
      healthFactor: 1.75,
    },
    {
      address: "0x4D8c2A3F5023A9208457Ba14108e815A67466fA9",
      collateralType: "WBTC",
      collateralAmount: 85000,
      borrowed: 30000,
      healthFactor: 2.45,
    },
    {
      address: "0xEE2847BfC114D1126fDF97e9e8b1b2f31aEd46A0",
      collateralType: "USDC",
      collateralAmount: 12000,
      borrowed: 10000,
      healthFactor: 1.05,
    },
    {
      address: "0x6A740cF61Dfb6d5d4862fE265989f12d1dbA3D3f",
      collateralType: "ETH",
      collateralAmount: 32000,
      borrowed: 15000,
      healthFactor: 1.85,
    },
    {
      address: "0x9f7A946d935c8Efc7A8329C0d894A69bA241345A",
      collateralType: "WBTC",
      collateralAmount: 67000,
      borrowed: 25000,
      healthFactor: 2.32,
    },
    {
      address: "0xB5B2c7da52d29fD46f171C0DE4B7E995D7960220",
      collateralType: "ETH",
      collateralAmount: 21000,
      borrowed: 14000,
      healthFactor: 1.3,
    },
    {
      address: "0x1aF5ED89BA33E45ABF5C5e9F9935927a5EB6a78d",
      collateralType: "USDC",
      collateralAmount: 27000,
      borrowed: 18000,
      healthFactor: 1.32,
    },
    {
      address: "0xF5D74B4A82C7e81bB69E2e4626d76694cB3F86f2",
      collateralType: "ETH",
      collateralAmount: 55000,
      borrowed: 20000,
      healthFactor: 2.4,
    },
    {
      address: "0x6108E64B9F10Ff1A8b60F8a7642d1f6eD187fF0E",
      collateralType: "WBTC",
      collateralAmount: 95000,
      borrowed: 40000,
      healthFactor: 2.1,
    },
    {
      address: "0xf72e8152C437ffd049bF501D5961efA72be7E912",
      collateralType: "ETH",
      collateralAmount: 13000,
      borrowed: 8000,
      healthFactor: 1.42,
    },
    {
      address: "0xAc8b3D5e3c38cdE5cBDB5126F5F678D91b7FbD38",
      collateralType: "USDC",
      collateralAmount: 46000,
      borrowed: 25000,
      healthFactor: 1.62,
    },
    {
      address: "0x95Db22235b3D62b7309179325FB8288843A6F32E",
      collateralType: "ETH",
      collateralAmount: 39000,
      borrowed: 22000,
      healthFactor: 1.55,
    },
    {
      address: "0x1bd3D8e2402a25C49c8825aF92927F3F5Ad3b15D",
      collateralType: "WBTC",
      collateralAmount: 110000,
      borrowed: 60000,
      healthFactor: 1.65,
    }
  ];
}

export default async function WalletsPage() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
