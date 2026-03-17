export default function App() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
          <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
            WorkPulse
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900">
            Smart work hours, clean payroll insights
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
            Upload a weekly schedule, review hours, estimate gross pay, compare it with your paycheck,
            and visualize everything in a premium dashboard.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-500">Biweekly Hours</p>
              <p className="mt-2 text-3xl font-semibold text-zinc-900">74.5h</p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-500">Estimated Gross</p>
              <p className="mt-2 text-3xl font-semibold text-zinc-900">$1,490</p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-500">Paycheck Received</p>
              <p className="mt-2 text-3xl font-semibold text-zinc-900">$1,248</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}