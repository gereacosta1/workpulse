import type { ChangeEvent } from "react";

type PayPeriodFormProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

export function PayPeriodForm({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: PayPeriodFormProps) {
  function handleDateChange(
    event: ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) {
    onChange(event.target.value);
  }

  return (
    <div className="grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-700">Start date</span>
        <input
          type="date"
          value={startDate}
          onChange={(event) => handleDateChange(event, onStartDateChange)}
          className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-400"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-700">End date</span>
        <input
          type="date"
          value={endDate}
          onChange={(event) => handleDateChange(event, onEndDateChange)}
          className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-400"
        />
      </label>
    </div>
  );
}