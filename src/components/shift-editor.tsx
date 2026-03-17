import { useEffect, useMemo, useState } from "react";
import type { WeeklyShift } from "../types/dashboard";
import { calculateShiftHours } from "../utils/time";

type ShiftEditorProps = {
  initialShifts: WeeklyShift[];
  onShiftsChange?: (shifts: WeeklyShift[]) => void;
};

export function ShiftEditor({ initialShifts, onShiftsChange }: ShiftEditorProps) {
  const [shifts, setShifts] = useState<WeeklyShift[]>(initialShifts);

  function updateShift(
    shiftId: string,
    field: "start" | "end" | "breakMinutes",
    value: string
  ) {
    setShifts((currentShifts) =>
      currentShifts.map((shift) => {
        if (shift.id !== shiftId) return shift;

        const updatedShift = {
          ...shift,
          [field]: field === "breakMinutes" ? Number(value) : value,
        };

        return {
          ...updatedShift,
          hours: calculateShiftHours(
            updatedShift.start,
            updatedShift.end,
            updatedShift.breakMinutes
          ),
        };
      })
    );
  }

  useEffect(() => {
    onShiftsChange?.(shifts);
  }, [shifts, onShiftsChange]);

  const totalHours = useMemo(() => {
    return shifts.reduce((sum, shift) => sum + shift.hours, 0);
  }, [shifts]);

  return (
    <div className="grid gap-4">
      <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr_0.8fr] gap-3 px-2 text-xs uppercase tracking-[0.16em] text-zinc-500 md:grid">
        <span>Day</span>
        <span>Start</span>
        <span>End</span>
        <span>Break</span>
        <span className="text-right">Hours</span>
      </div>

      <div className="grid gap-3">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="grid gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 md:grid-cols-[1.2fr_1fr_1fr_1fr_0.8fr] md:items-center"
          >
            <div>
              <p className="text-sm font-medium text-zinc-900">{shift.day}</p>
            </div>

            <label className="grid gap-1">
              <span className="text-xs text-zinc-500 md:hidden">Start</span>
              <input
                type="time"
                value={shift.start}
                onChange={(event) => updateShift(shift.id, "start", event.target.value)}
                className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-violet-400"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-xs text-zinc-500 md:hidden">End</span>
              <input
                type="time"
                value={shift.end}
                onChange={(event) => updateShift(shift.id, "end", event.target.value)}
                className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-violet-400"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-xs text-zinc-500 md:hidden">Break (min)</span>
              <input
                type="number"
                min="0"
                step="5"
                value={shift.breakMinutes}
                onChange={(event) => updateShift(shift.id, "breakMinutes", event.target.value)}
                className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-violet-400"
              />
            </label>

            <div className="flex items-center justify-between md:block">
              <span className="text-xs text-zinc-500 md:hidden">Hours</span>
              <p className="text-right text-sm font-semibold text-zinc-900">{shift.hours}h</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-violet-200 bg-violet-50 px-4 py-4">
        <span className="text-sm font-medium text-zinc-700">Updated weekly total</span>
        <span className="text-lg font-semibold text-zinc-900">
          {Number(totalHours.toFixed(2))}h
        </span>
      </div>
    </div>
  );
}