export const formatPhoneNumber = (value?: string | null): string => {
  if (!value) return '';
  const raw = value.replace(/[^0-9]/g, '');
  if (!raw) return value || '';

  if (raw.length === 11) {
    return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
  }
  if (raw.length === 10) {
    if (raw.startsWith('02')) {
      return `${raw.slice(0, 2)}-${raw.slice(2, 6)}-${raw.slice(6, 10)}`;
    }
    return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
  }
  if (raw.length === 9) {
    return `${raw.slice(0, 2)}-${raw.slice(2, 5)}-${raw.slice(5, 9)}`;
  }
  if (raw.length === 8) {
    return `${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
  }
  if (raw.length > 3 && raw.length <= 7) {
    return `${raw.slice(0, 3)}-${raw.slice(3)}`;
  }
  return value;
};
