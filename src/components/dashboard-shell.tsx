import { SectionCard } from "./section-card";
import { StatsCard } from "./stats-card";
import { PayBreakdownChart } from "./pay-breakdown-chart";
import type { DashboardData } from "../types/dashboard";
import { ScheduleUploadCard } from "./schedule-upload-card";

type DashboardShellProps = {
  data: DashboardData;
};

export function DashboardShell({ data }: DashboardShellProps) {
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
              <p className="mt-2 text-lg font-semibold text-zinc-900">{data.payPeriod}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {data.stats.map((item) => (
              <StatsCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
         <SectionCard
  title="Schedule Upload"
  subtitle="Upload your weekly image and prepare the schedule for review."
>
  <ScheduleUploadCard />
</SectionCard>

          <SectionCard
            title="Projection Summary"
            subtitle="Quick projections based on your current period."
          >
            <div className="grid gap-4">
              {data.summary.map((item) => (
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

        <SectionCard
          title="Paycheck Visual"
          subtitle="A visual breakdown of the current pay period."
        >
          <PayBreakdownChart data={data.payBreakdown} />
        </SectionCard>

        <SectionCard
          title="Weekly Shift Preview"
          subtitle="Detected shifts that can later be edited if someone arrived late or left early."
        >
          <div className="grid gap-3">
            {data.weeklyShifts.map((shift) => (
              <div
                key={shift.id}
                className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr] items-center rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm"
              >
                <span className="font-medium text-zinc-900">{shift.day}</span>
                <span className="text-zinc-600">{shift.start}</span>
                <span className="text-zinc-600">{shift.end}</span>
                <span className="text-right font-semibold text-zinc-900">{shift.hours}h</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}