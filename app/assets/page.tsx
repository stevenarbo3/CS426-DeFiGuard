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
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
    );
}