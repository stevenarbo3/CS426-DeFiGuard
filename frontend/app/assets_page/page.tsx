import { Metadata } from "next";
import { Position, columns } from "./columns";
import { DataTable } from "./data-table";
import { getData } from './data';

export const metadata: Metadata = {
  title: "Wallets | DeFiGuard",
  description: "Monitor wallet positions in the lending protocol",
};

export default async function AssetsPage() {
    const data = await getData();
    return (
      <div className="min-h-screen bg-[#0a0e17]">
        <main className="flex flex-col text-white p-5 mx-auto max-w-7xl w-full">
          <h1 className="text-5xl font-bold ">Assets</h1>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </div>
        
    );
}