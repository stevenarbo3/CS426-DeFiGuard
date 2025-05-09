export default function StatBox({
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