import MetricBox from "../components/MetricBox";
import { StockChart } from "@/components/StockChart";

const mock_data = [
  {
    metric: "Total Supply",
    amount: "$26B",
    change: "⬆️",
    change_amount: "172M"
  },
  {
    metric: "Total Borrow",
    amount: "$10B",
    change: "⬆️",
    change_amount: "110M"
  },
  {
    metric: "Total Value Locked",
    amount: "$16B",
    change: "⬆️",
    change_amount: "62M"
  },
  {
    metric: "Value Eligible for Liquidations",
    amount: "$21K",
    change: "⬇️",
    change_amount: "2K"
  },
  {
    metric: "Total Collateral at Risk",
    amount: "$445M",
    change: "⬆️",
    change_amount: "65M"
  },
  {
    metric: "Wallets at Risk",
    amount: "$20k",
    change: "⬆️",
    change_amount: "1K"
  },
  {
    metric: "Wallets Eligible for Liquidations",
    amount: "4K",
    change: "⬆️",
    change_amount: "47"
  },
  {
    metric: "Bad Debt",
    amount: "$362K",
    change: "⬇️",
    change_amount: "311"
  },
]

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

export default function Home() {

  const metricBoxElements = mock_data.map(data => {
    return (
        <MetricBox
            key={data.metric}
            {...data}
        />
    )
  })

  return (
      <main className="flex flex-col gap-10 p-5 mx-auto max-w-7xl w-full">
          <h1 className="text-5xl font-bold text-gray-900">Overview</h1>
          <div className=" grid grid-cols-4 gap-5">
            {metricBoxElements}
          </div>
          <StockChart 
          title="Total Value Locked"
          data={chartData}
          tooltipLabel="TVL"
          color="#0ea5e9"/>
      </main>
  );
}
