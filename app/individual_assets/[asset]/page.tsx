import { notFound } from "next/navigation";
import { getData } from "@/app/assets_page/data";
import { StockChart } from "@/components/StockChart";

type AssetPageProps = {
  params: { asset: string };
};

const chartData = [
    { date: "03/01", value: 18.2 },
    { date: "03/03", value: 19.8 },
    { date: "03/05", value: 17.9 },
    { date: "03/07", value: 18.3 },
    { date: "03/09", value: 17.5 },
    { date: "03/11", value: 16.8 },
    { date: "03/13", value: 17.2 },
    { date: "03/15", value: 17.0 },
    { date: "03/17", value: 17.3 },
    { date: "03/19", value: 17.5 },
    { date: "03/21", value: 18.1 },
    { date: "03/23", value: 19.2 },
    { date: "03/25", value: 18.7 },
  ]

export async function generateStaticParams() {
    const data = await getData();
  
    return data.map((asset: { assetType: string; }) => ({
      asset: asset.assetType.toLowerCase(),
    }));
  }

export default async function AssetPage({ params }: AssetPageProps) {
  const data = await getData(); // fetch all assets

  const assetId = params.asset.toLowerCase();

    const asset = data.find(
    (a) => a.assetType.toLowerCase() === assetId
    );

  if (!asset) return notFound();

  return (
    <main className="min-h-screen bg-[#0a0e17] text-white p-6 space-y-6">
      <h1 className="text-4xl font-bold">{asset.assetType}</h1>
      <p>Price: ${asset.price.toLocaleString()}</p>
      <p>Total Collateral: ${asset.collateralAmount.toLocaleString()}</p>
      <StockChart 
        title="Cross-Chain Exposure"
        data={chartData}
        tooltipLabel="CCE"
        color="#0ea5e9"/>
    </main>
  );
}
  
