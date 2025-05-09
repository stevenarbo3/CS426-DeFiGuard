import { StockChart } from "@/components/StockChart";
import StatBox from "@/components/StatBox";
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronRight } from "lucide-react";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


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
    description: "Total value at risk of liquidation in positions with health score below 1"
  },
  {
    title: "Total Collateral at Risk",
    value: 445000000,
    delta: 0.2,
    description: "Total value at risk of liquidation in positions with health score approaching liquidation"
  },
  {
    title: "Wallets at Risk",
    value: 20000,
    delta: 0.7,
    description: "Wallets holding positions with health score approaching liquidation"

  },
  {
    title: "Wallets Eligible for Liquidations",
    value: 4000,
    delta: 0.3,
    description: "Wallets holding positions with health score below 1"
  },
  {
    title: "Bad Debt",
    value: 362000,
    delta: -1.5,
    description: "Protocol bad debt, calculated as the sum of (borrow - collateral) over all wallets where health <1."
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

  const statBoxElements = mock_data.map((data,index) => {
    return (
      <React.Fragment key={data.title}>
        {index < 3 ?
          <Sheet>
              <SheetTrigger asChild className="cursor-pointer">
                <div className="flex gap-3">
                  <StatBox
                        key={data.title}
                        {...data}
                        value={`$${formatNumber(data.value)}`}
                    />
                    <ChevronRight className="h-5 w-5" />
                </div>
              </SheetTrigger>
                <SheetContent className="bg-[#0a0e17] text-white">
                  <SheetHeader>
                    <SheetTitle className="text-white">{data.title}</SheetTitle>
                    <SheetDescription>
                      Interactive graph goes here
                    </SheetDescription>
                  </SheetHeader>
              </SheetContent>
            </Sheet>
            :
            <div className="flex gap-2 flex-wrap items-start">

              <StatBox
                  {...data}
                  value={`$${formatNumber(data.value)}`}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex flex-start mt-1"><InfoIcon className="h-4 w-4"/></TooltipTrigger>
                  <TooltipContent>
                    <span className="text-base">{data.description}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
        }
      </React.Fragment>
    )
  })

  return (
      <div className="min-h-screen bg-[#0a0e17]">
        <main className="flex flex-col gap-10 text-white p-5 mx-auto max-w-7xl w-full ">
            <h1 className="text-5xl font-bold">Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

              {statBoxElements}
            </div>
            <div className="w-full overflow-x-auto">
              <StockChart 
                title="Total Value Locked"
                data={chartData}
                tooltipLabel="TVL"
                color="white"
              />
            </div>

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
