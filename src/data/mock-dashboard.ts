import type { DashboardData } from "../types/dashboard";

export const mockDashboardData: DashboardData = {
  periodLabel: "Current pay period",
  payPeriod: "Mar 03 - Mar 16",
  hourlyRate: 20,
  paycheckReceived: 1248,
  previousPeriodHours: 70,
  weeklyShifts: [
    { id: "mon", day: "Monday", start: "09:00", end: "17:00", breakMinutes: 0, hours: 8 },
    { id: "tue", day: "Tuesday", start: "10:00", end: "18:00", breakMinutes: 0, hours: 8 },
    { id: "wed", day: "Wednesday", start: "09:00", end: "16:30", breakMinutes: 0, hours: 7.5 },
    { id: "thu", day: "Thursday", start: "09:30", end: "17:30", breakMinutes: 0, hours: 8 },
    { id: "fri", day: "Friday", start: "11:00", end: "19:00", breakMinutes: 0, hours: 8 },
    { id: "sat", day: "Saturday", start: "10:00", end: "16:00", breakMinutes: 0, hours: 6 },
  ],
};