import { notFound } from "next/navigation";
import { getData } from "@/app/assets_page/data";
import { StockChart } from "@/components/StockChart";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AssetPageProps = {
  params: { asset: string };
};

// Mock data for the chart
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
];

// Function to handle fetching async data from the data page
export async function generateStaticParams() {
  const data = await getData();
  return data.map((asset) => ({
    asset: asset.assetType.toLowerCase(),
  }));
}

export default async function AssetPage({ params }: AssetPageProps) {
    // Fetch data and grab the asset ID
  const data = await getData();
  const assetId = params.asset.toLowerCase();

    // Find the asset data based on the asset ID
  const asset = data.find((a) => a.assetType.toLowerCase() === assetId);
  if (!asset) return notFound();

  return (
    <div className="min-h-screen bg-[#0a0e17]">
        <main className="min-h-screen bg-[#0a0e17] text-white px-8 py-10 space-y-10 max-w-7xl w-full mx-auto">
            {/* Header section */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
            <Link href="/assets_page">
                <ArrowLeft className="text-white hover:text-gray-300" />
            </Link>
            {/* Logo placeholder for the time being, can update late with logos for each asset */}
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">Ξ</div>
            <h1 className="text-4xl font-bold">{asset.assetType}</h1>
            </div>
            <div className="text-right">
            <p className="text-sm text-gray-400">Current Price</p>
            <p className="text-xl font-semibold">${asset.price.toLocaleString()}</p>
            {/* Placeholder change, need up update the mock data */}
            <p className="text-sm text-red-500">▼ 1.52%</p>
            </div>
        </div>

        {/* Stats grid for supply, borrow, utilization, and collateral at risk */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatBox title="Total Supply" value={`$${formatNumber(asset.totalSupply)}`} delta={asset.supplyChangePercent} />
            <StatBox title="Total Borrow" value={`$${formatNumber(asset.totalBorrow)}`} delta={asset.borrowChangePercent} />
            <StatBox
            title="Utilization Rate"
            value={`${asset.utilizationRate.toFixed(2)}%`}
            delta={asset.utilizationChangePercent}
            positive
            />
            <StatBox
            title="Collateral at Risk"
            value={`$${formatNumber(asset.collateralAtRisk)}`}
            delta={asset.collateralRiskChangePercent}
            />
        </section>

        {/* Chart section, can expand with more charts and more chart data */}
        <StockChart
            title="Cross-Chain Exposure"
            data={chartData}
            tooltipLabel="CCE"
            color="#0ea5e9"
        />
        </main>
    </div>
  );
}


// Creation of a statbox component to display the stats, can lift higher up later
function StatBox({
  title,
  value,
  delta,
  positive,
}: {
  title: string;
  value: string;
  delta: number;
  positive?: boolean;
}) {
  const isPositive = delta >= 0;
  const color = isPositive ? "text-green-400" : "text-red-500";
  const arrow = isPositive ? "▲" : "▼";
  return (
    <div>
      <p className="text-sm text-gray-400">{title.toUpperCase()}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${color}`}>{arrow} {Math.abs(delta).toFixed(2)}%</p>
    </div>
  );
}

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

  
