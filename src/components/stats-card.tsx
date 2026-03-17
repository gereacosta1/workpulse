import type { StatCardItem } from "../types/dashboard";

type StatsCardProps = {
  item: StatCardItem;
};

export function StatsCard({ item }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
      <p className="text-sm text-zinc-500">{item.label}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-900">{item.value}</p>
      {item.helperText ? (
        <p className="mt-2 text-sm text-zinc-500">{item.helperText}</p>
      ) : null}
    </div>
  );
}