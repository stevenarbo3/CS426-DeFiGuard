"use client"

import { Download } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

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

const chartConfig = {
  value: {
    label: "Value",
    color: "#0ea5e9",
  },
} satisfies ChartConfig

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border border-gray-700 bg-[#0f172a] px-4 py-3 shadow-xl">
        <div className="mb-1 text-sm font-medium text-gray-400">{label}</div>
        <div className="text-base font-bold">
          <span className="text-gray-300">TVL: </span>
          <span className="text-[#0ea5e9]">${payload[0].value}B</span>
        </div>
      </div>
    )
  }
  return null
}

export function TVLChart() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <Card className="h-[60vh] w-[90vw] rounded-xl border border-gray-800 bg-[#0a0e17] text-white shadow-md">
        <CardHeader className="flex flex-row items-center justify-between p-5">
          <CardTitle className="text-xl font-bold">Total Value Locked</CardTitle>
        </CardHeader>
        <CardContent className="relative h-[calc(100%-70px)] p-0">
          <div className="h-full w-full px-5 pb-5">
            <div className="h-full w-full rounded-lg border border-gray-800 p-3">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid horizontal={true} vertical={false} stroke="#333" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                      tickFormatter={(value) => `$${value}B`}
                      domain={[0, 21]}
                      ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
                      width={50}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{
                        stroke: "#666",
                        strokeDasharray: "3 3",
                        strokeWidth: 1,
                      }}
                      wrapperStyle={{ zIndex: 100, outline: "none" }}
                      position={{ y: 0 }}
                    />
                    <Line
                      type="linear"
                      dataKey="value"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 5, fill: "#0ea5e9", stroke: "#0a0e17", strokeWidth: 2 }}
                      isAnimationActive={true}
                      animationDuration={500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

