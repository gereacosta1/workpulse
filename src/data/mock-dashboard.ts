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
  weeklyShifts: [
    { id: "mon", day: "Monday", start: "9:00 AM", end: "5:00 PM", hours: 8 },
    { id: "tue", day: "Tuesday", start: "10:00 AM", end: "6:00 PM", hours: 8 },
    { id: "wed", day: "Wednesday", start: "9:00 AM", end: "4:30 PM", hours: 7.5 },
    { id: "thu", day: "Thursday", start: "9:30 AM", end: "5:30 PM", hours: 8 },
    { id: "fri", day: "Friday", start: "11:00 AM", end: "7:00 PM", hours: 8 },
    { id: "sat", day: "Saturday", start: "10:00 AM", end: "4:00 PM", hours: 6 },
  ],
};