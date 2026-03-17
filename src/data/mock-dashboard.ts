import type { DashboardData } from "../types/dashboard";

export const mockDashboardData: DashboardData = {
  periodLabel: "Current pay period",
  payPeriod: "Mar 03 - Mar 16",
  stats: [
    {
      id: "hours",
      label: "Biweekly Hours",
      value: "74.5h",
      helperText: "+4.5h from last period",
    },
    {
      id: "gross",
      label: "Estimated Gross",
      value: "$1,490",
      helperText: "Based on $20/hr",
    },
    {
      id: "check",
      label: "Paycheck Received",
      value: "$1,248",
      helperText: "$242 difference",
    },
  ],
  summary: [
    { id: "monthly", label: "Monthly Estimate", value: "$2,980" },
    { id: "sixMonths", label: "6 Month Projection", value: "$17,880" },
    { id: "yearly", label: "12 Month Projection", value: "$35,760" },
  ],
  payBreakdown: [
    { id: "gross", label: "Estimated Gross", amount: 1490 },
    { id: "received", label: "Received", amount: 1248 },
    { id: "deductions", label: "Deductions", amount: 242 },
  ],
  weeklyShifts: [
    { id: "mon", day: "Monday", start: "09:00", end: "17:00", breakMinutes: 0, hours: 8 },
    { id: "tue", day: "Tuesday", start: "10:00", end: "18:00", breakMinutes: 0, hours: 8 },
    { id: "wed", day: "Wednesday", start: "09:00", end: "16:30", breakMinutes: 0, hours: 7.5 },
    { id: "thu", day: "Thursday", start: "09:30", end: "17:30", breakMinutes: 0, hours: 8 },
    { id: "fri", day: "Friday", start: "11:00", end: "19:00", breakMinutes: 0, hours: 8 },
    { id: "sat", day: "Saturday", start: "10:00", end: "16:00", breakMinutes: 0, hours: 6 },
  ],
};