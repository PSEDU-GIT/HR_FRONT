export function calcPeriodLabel(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return '';
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  if (diffMs < 0) return '';
  const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  if (years > 0 && months > 0) return `${years}년 ${months}개월`;
  if (years > 0) return `${years}년`;
  if (months > 0) return `${months}개월`;
  return `${totalDays}일`;
}

export function calcPeriodDays(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;
  return (
    Math.round(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
    ) + 1
  );
}

export function calculateDailyHours(start: string, end: string, breakStr: string): number {
  if (!start || !end) return 0;
  const [sH, sM] = start.split(':').map(Number);
  const [eH, eM] = end.split(':').map(Number);
  const totalMinutes = eH * 60 + eM - (sH * 60 + sM);
  let breakMinutes = 0;
  if (breakStr === '30분') breakMinutes = 30;
  else if (breakStr === '1시간') breakMinutes = 60;
  else if (breakStr === '1.5시간') breakMinutes = 90;
  else if (breakStr === '2시간') breakMinutes = 120;
  const rawHours = Math.max(0, (totalMinutes - breakMinutes) / 60);
  return Math.floor(rawHours * 100) / 100;
}
