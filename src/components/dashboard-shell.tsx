import { useEffect, useMemo, useState } from "react";
import { SectionCard } from "./section-card";
import { StatsCard } from "./stats-card";
import { PayBreakdownChart } from "./pay-breakdown-chart";
import { ShiftEditor } from "./shift-editor";
import { PaySettingsForm } from "./pay-settings-form";
import { PayPeriodForm } from "./pay-period-form";
import type { DashboardData, WeeklyShift } from "../types/dashboard";

type DashboardShellProps = {
  data: DashboardData;
};

const STORAGE_KEY = "workpulse-dashboard-state";

type StoredDashboardState = {
  shifts: WeeklyShift[];
  hourlyRate: number;
  paycheckReceived: number;
  previousPeriodHours: number;
  payPeriodStart: string;
  payPeriodEnd: string;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDateLabel(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(date);
}

function getInitialState(data: DashboardData): StoredDashboardState {
  if (typeof window === "undefined") {
    return {
      shifts: data.weeklyShifts,
      hourlyRate: data.hourlyRate,
      paycheckReceived: data.paycheckReceived,
      previousPeriodHours: data.previousPeriodHours,
      payPeriodStart: data.payPeriodStart,
      payPeriodEnd: data.payPeriodEnd,
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        shifts: data.weeklyShifts,
        hourlyRate: data.hourlyRate,
        paycheckReceived: data.paycheckReceived,
        previousPeriodHours: data.previousPeriodHours,
        payPeriodStart: data.payPeriodStart,
        payPeriodEnd: data.payPeriodEnd,
      };
    }

    const parsed = JSON.parse(raw) as Partial<StoredDashboardState>;

    return {
      shifts: parsed.shifts ?? data.weeklyShifts,
      hourlyRate: parsed.hourlyRate ?? data.hourlyRate,
      paycheckReceived: parsed.paycheckReceived ?? data.paycheckReceived,
      previousPeriodHours: parsed.previousPeriodHours ?? data.previousPeriodHours,
      payPeriodStart: parsed.payPeriodStart ?? data.payPeriodStart,
      payPeriodEnd: parsed.payPeriodEnd ?? data.payPeriodEnd,
    };
  } catch {
    return {
      shifts: data.weeklyShifts,
      hourlyRate: data.hourlyRate,
      paycheckReceived: data.paycheckReceived,
      previousPeriodHours: data.previousPeriodHours,
      payPeriodStart: data.payPeriodStart,
      payPeriodEnd: data.payPeriodEnd,
    };
  }
}

export function DashboardShell({ data }: DashboardShellProps) {
  const initialState = getInitialState(data);

  const [shifts, setShifts] = useState<WeeklyShift[]>(initialState.shifts);
  const [hourlyRate, setHourlyRate] = useState<number>(initialState.hourlyRate);
  const [paycheckReceived, setPaycheckReceived] = useState<number>(initialState.paycheckReceived);
  const [previousPeriodHours, setPreviousPeriodHours] = useState<number>(
    initialState.previousPeriodHours
  );
  const [payPeriodStart, setPayPeriodStart] = useState<string>(initialState.payPeriodStart);
  const [payPeriodEnd, setPayPeriodEnd] = useState<string>(initialState.payPeriodEnd);

  useEffect(() => {
    const stateToStore: StoredDashboardState = {
      shifts,
      hourlyRate,
      paycheckReceived,
      previousPeriodHours,
      payPeriodStart,
      payPeriodEnd,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToStore));
  }, [
    shifts,
    hourlyRate,
    paycheckReceived,
    previousPeriodHours,
    payPeriodStart,
    payPeriodEnd,
  ]);

  const weeklyHours = useMemo(() => {
    return shifts.reduce((sum, shift) => sum + shift.hours, 0);
  }, [shifts]);

  const biweeklyHours = useMemo(() => {
    return weeklyHours * 2;
  }, [weeklyHours]);

  const estimatedGross = useMemo(() => {
    return biweeklyHours * hourlyRate;
  }, [biweeklyHours, hourlyRate]);

  const deductionDifference = useMemo(() => {
    return Math.max(estimatedGross - paycheckReceived, 0);
  }, [estimatedGross, paycheckReceived]);

  const monthlyEstimate = estimatedGross * 2;
  const sixMonthProjection = monthlyEstimate * 6;
  const yearlyProjection = monthlyEstimate * 12;

  const hoursDifference = biweeklyHours - previousPeriodHours;

  const periodLabelText =
    payPeriodStart && payPeriodEnd
      ? `${formatDateLabel(payPeriodStart)} - ${formatDateLabel(payPeriodEnd)}`
      : data.payPeriod;

  const stats = [
    {
      id: "hours",
      label: "Biweekly Hours",
      value: `${Number(biweeklyHours.toFixed(2))}h`,
      helperText: `${hoursDifference >= 0 ? "+" : ""}${Number(hoursDifference.toFixed(2))}h from last period`,
    },
    {
      id: "gross",
      label: "Estimated Gross",
      value: formatCurrency(estimatedGross),
      helperText: `Based on $${hourlyRate}/hr`,
    },
    {
      id: "check",
      label: "Paycheck Received",
      value: formatCurrency(paycheckReceived),
      helperText: `${formatCurrency(deductionDifference)} difference`,
    },
  ];

  const summary = [
    { id: "monthly", label: "Monthly Estimate", value: formatCurrency(monthlyEstimate) },
    { id: "sixMonths", label: "6 Month Projection", value: formatCurrency(sixMonthProjection) },
    { id: "yearly", label: "12 Month Projection", value: formatCurrency(yearlyProjection) },
  ];

  const payBreakdown = [
    { id: "gross", label: "Estimated Gross", amount: estimatedGross },
    { id: "received", label: "Received", amount: paycheckReceived },
    { id: "deductions", label: "Deductions", amount: deductionDifference },
  ];

  return (
    <main className="min-h-screen px-5 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
                WorkPulse
              </span>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
                Smart work hours, clean payroll insights
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                Upload a weekly schedule, review hours, estimate gross pay, compare it with
                your paycheck, and visualize everything in one clean dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {data.periodLabel}
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">{periodLabelText}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {stats.map((item) => (
              <StatsCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionCard
            title="Shift Editor"
            subtitle="Review and adjust each shift if someone arrived late, left early, or took a break."
          >
            <ShiftEditor initialShifts={shifts} onShiftsChange={setShifts} />
          </SectionCard>

          <div className="grid gap-6">
            <SectionCard
              title="Pay Settings"
              subtitle="Adjust the core financial values for this pay period."
            >
              <PaySettingsForm
                hourlyRate={hourlyRate}
                paycheckReceived={paycheckReceived}
                previousPeriodHours={previousPeriodHours}
                onHourlyRateChange={setHourlyRate}
                onPaycheckReceivedChange={setPaycheckReceived}
                onPreviousPeriodHoursChange={setPreviousPeriodHours}
              />
            </SectionCard>

            <SectionCard
              title="Pay Period"
              subtitle="Set the start and end dates for the current pay cycle."
            >
              <PayPeriodForm
                startDate={payPeriodStart}
                endDate={payPeriodEnd}
                onStartDateChange={setPayPeriodStart}
                onEndDateChange={setPayPeriodEnd}
              />
            </SectionCard>

            <SectionCard
              title="Projection Summary"
              subtitle="Quick projections based on your current period."
            >
              <div className="grid gap-4">
                {summary.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4"
                  >
                    <span className="text-sm text-zinc-500">{item.label}</span>
                    <span className="text-lg font-semibold text-zinc-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        <SectionCard
          title="Paycheck Visual"
          subtitle="A visual breakdown of the current pay period."
        >
          <PayBreakdownChart data={payBreakdown} />
        </SectionCard>
      </div>
    </main>
  );
}