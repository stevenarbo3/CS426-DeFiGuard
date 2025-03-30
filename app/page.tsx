import { StockChart } from "@/components/StockChart";
import StatBox from "@/components/StatBox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const mock_data = [
  {
    title: "Total Supply",
    value: 26000000000,
    delta: 1.62,
  },
  {
    title: "Total Borrow",
    value: 10000000000,
    delta: 5.3,
  },
  {
    title: "Total Value Locked",
    value: 16000000000,
    delta: 2.4,
  },
  {
    title: "Value Eligible for Liquidations",
    value: 21000,
    delta: -4.2,
  },
  {
    title: "Total Collateral at Risk",
    value: 445000000,
    delta: 0.2,
  },
  {
    title: "Wallets at Risk",
    value: 20000,
    delta: 0.7,

  },
  {
    title: "Wallets Eligible for Liquidations",
    value: 4000,
    delta: 0.3,
  },
  {
    title: "Bad Debt",
    value: 362000,
    delta: -1.5,
  }
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

  const statBoxElements = mock_data.map(data => {
    return (
          <Sheet key={data.title}>
              <SheetTrigger asChild className="cursor-pointer">
              <StatBox
                    key={data.title}
                    {...data}
                    value={`$${formatNumber(data.value)}`}
                />
              </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription>
                      Interactive Graph goes here
                    </SheetDescription>
                  </SheetHeader>
              </SheetContent>
            </Sheet>
    )
  })

  return (
      <div className="min-h-screen bg-[#0a0e17]">
        <main className="flex flex-col gap-10 text-white p-5 mx-auto max-w-7xl w-full ">
            <h1 className="text-5xl font-bold">Overview</h1>
            <div className=" grid grid-cols-4 gap-5">
              {statBoxElements}
            </div>
            <StockChart 
            title="Total Value Locked"
            data={chartData}
            tooltipLabel="TVL"
            color="white"/>
        </main>
      </div>
  );
}

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
