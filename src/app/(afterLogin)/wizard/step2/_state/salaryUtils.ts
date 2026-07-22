export const MAX_SALARY_AMOUNT = 1000000000; // 최대 10억원

export function numberToKorean(num: number): string {
  if (!num || num <= 0) return '';
  if (num > MAX_SALARY_AMOUNT) return '십억원';

  const units = ['', '만', '억', '조'];
  const smallUnits = ['', '십', '백', '천'];
  const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];

  let result = '';
  let unitIdx = 0;
  let temp = num;

  while (temp > 0) {
    const part = temp % 10000;
    if (part > 0) {
      let partStr = '';
      let pTemp = part;
      for (let i = 0; i < 4; i++) {
        const d = pTemp % 10;
        if (d > 0) {
          const digitName = i > 0 && d === 1 ? '' : digits[d];
          partStr = digitName + smallUnits[i] + partStr;
        }
        pTemp = Math.floor(pTemp / 10);
      }
      result = partStr + units[unitIdx] + result;
    }
    temp = Math.floor(temp / 10000);
    unitIdx++;
  }

  return result + '원';
}
