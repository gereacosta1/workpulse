import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur">
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-zinc-500">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}