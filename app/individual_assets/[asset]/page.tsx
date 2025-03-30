import { notFound } from "next/navigation";
import { getData } from "@/app/assets_page/data";

type AssetPageProps = {
  params: { asset: string };
};

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
      {/* Build out rest of layout using chart/components */}
    </main>
  );
}

export async function generateStaticParams() {
  const data = await getData();

  return data.map((asset: { assetType: string; }) => ({
    asset: asset.assetType.toLowerCase(),
  }));
}

  
