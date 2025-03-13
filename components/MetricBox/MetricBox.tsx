import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
interface MetricBoxProps {
    metric: string;
    amount: string;
    change: string;
    change_amount: string;
}

export default function MetricBox(props: MetricBoxProps) {
    return (
        <Sheet>
            <SheetTrigger className="flex flex-col justify-between items-start cursor-pointer bg-gray-100 p-2 gap-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <h3>{props.metric}</h3>
                <div className="flex items-center gap-3">
                    <span className="font-bold text-xl">{props.amount}</span>
                    <span className={props.change === "⬆️" ? "text-green-500" : "text-red-500"}>{props.change} {props.change_amount}</span>
                </div>
            </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{props.metric}</SheetTitle>
                  <SheetDescription>
                    Interactive Graph goes here
                  </SheetDescription>
                </SheetHeader>
            </SheetContent>
          </Sheet>
    )
}