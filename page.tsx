import MetricBox from "./components/MetricBox/MetricBox";
import '../../styles/globals.css';


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
      <main className="flex flex-col p-5 gap-30">
          <h1 className="text-5xl font-bold text-gray-900">Overview</h1>
          <div className=" grid grid-cols-4 gap-5">
            {metricBoxElements}
          </div>
      </main>
  );
}
