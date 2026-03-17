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
  stats: StatCardItem[];
  summary: SummaryMetric[];
  weeklyShifts: WeeklyShift[];
  payBreakdown: PayBreakdownItem[];
};

export type UploadedScheduleImage = {
  fileName: string;
  previewUrl: string;
  fileType: string;
};