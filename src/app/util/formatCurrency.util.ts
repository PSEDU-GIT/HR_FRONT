export const formatCurrency = (val: number | string | null | undefined): string => {
  if (val === null || val === undefined || val === '') return '';
  const num = typeof val === 'number' ? val : Number(String(val).replace(/,/g, ''));
  if (isNaN(num)) return '';
  return num.toLocaleString();
};

export const parseCurrencyNumber = (val: string): number => {
  if (!val) return 0;
  const clean = val.replace(/,/g, '');
  const num = Number(clean);
  return isNaN(num) ? 0 : num;
};
