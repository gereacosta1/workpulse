export function timeStringToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) return 0;

  return hours * 60 + minutes;
}

export function calculateShiftHours(start: string, end: string, breakMinutes: number) {
  const startMinutes = timeStringToMinutes(start);
  const endMinutes = timeStringToMinutes(end);

  const totalMinutes = endMinutes - startMinutes - breakMinutes;

  if (totalMinutes <= 0) return 0;

  return Number((totalMinutes / 60).toFixed(2));
}