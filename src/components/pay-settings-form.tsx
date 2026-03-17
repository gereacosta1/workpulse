import type { ChangeEvent } from "react";

type PaySettingsFormProps = {
  hourlyRate: number;
  paycheckReceived: number;
  previousPeriodHours: number;
  onHourlyRateChange: (value: number) => void;
  onPaycheckReceivedChange: (value: number) => void;
  onPreviousPeriodHoursChange: (value: number) => void;
};

export function PaySettingsForm({
  hourlyRate,
  paycheckReceived,
  previousPeriodHours,
  onHourlyRateChange,
  onPaycheckReceivedChange,
  onPreviousPeriodHoursChange,
}: PaySettingsFormProps) {
  function handleNumberChange(
    event: ChangeEvent<HTMLInputElement>,
    onChange: (value: number) => void
  ) {
    const nextValue = Number(event.target.value);
    onChange(Number.isNaN(nextValue) ? 0 : nextValue);
  }

  return (
    <div className="grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-700">Hourly rate</span>
        <input
          type="number"
          min="0"
          step="0.5"
          value={hourlyRate}
          onChange={(event) => handleNumberChange(event, onHourlyRateChange)}
          className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-400"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-700">Paycheck received</span>
        <input
          type="number"
          min="0"
          step="1"
          value={paycheckReceived}
          onChange={(event) => handleNumberChange(event, onPaycheckReceivedChange)}
          className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-400"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-700">Previous period hours</span>
        <input
          type="number"
          min="0"
          step="0.5"
          value={previousPeriodHours}
          onChange={(event) => handleNumberChange(event, onPreviousPeriodHoursChange)}
          className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-400"
        />
      </label>
    </div>
  );
}