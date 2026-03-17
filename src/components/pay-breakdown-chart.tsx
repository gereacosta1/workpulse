import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { PayBreakdownItem } from "../types/dashboard";

type PayBreakdownChartProps = {
  data: PayBreakdownItem[];
};

const COLORS = ["#18181b", "#8b5cf6", "#d4d4d8"];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PayBreakdownChart({ data }: PayBreakdownChartProps) {
  const totalReceived = data.find((item) => item.id === "received")?.amount ?? 0;

  return (
    <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-center">
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={96}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">
          Pay Breakdown
        </p>

        <p className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900">
          {formatCurrency(totalReceived)}
        </p>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Clean visual comparison between estimated gross pay, actual received paycheck,
          and the total difference deducted from the period.
        </p>

        <div className="mt-6 grid gap-3">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-zinc-600">{item.label}</span>
              </div>

              <span className="text-sm font-semibold text-zinc-900">
                {formatCurrency(item.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}