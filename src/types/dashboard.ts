export type StatCardItem = {
  id: string;
  label: string;
  value: string;
  helperText?: string;
};

export type SummaryMetric = {
  id: string;
  label: string;
  value: string;
};

export type WeeklyShift = {
  id: string;
  day: string;
  start: string;
  end: string;
  breakMinutes: number;
  hours: number;
};

export type PayBreakdownItem = {
  id: string;
  label: string;
  amount: number;
};

export type DashboardData = {
  periodLabel: string;
  payPeriod: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  hourlyRate: number;
  paycheckReceived: number;
  previousPeriodHours: number;
  weeklyShifts: WeeklyShift[];
};

export type UploadedScheduleImage = {
  fileName: string;
  previewUrl: string;
  fileType: string;
};