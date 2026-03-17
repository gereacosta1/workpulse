import { DashboardShell } from "../components/dashboard-shell";
import { mockDashboardData } from "../data/mock-dashboard";

export function DashboardPage() {
  return <DashboardShell data={mockDashboardData} />;
}