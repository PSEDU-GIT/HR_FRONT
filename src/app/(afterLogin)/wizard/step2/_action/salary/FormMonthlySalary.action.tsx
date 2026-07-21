'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';

const MAX_AMOUNT = 1000000000; // 최대 10억원

function numberToKorean(num: number): string {
  if (!num || num <= 0) return '';
  if (num > MAX_AMOUNT) return '십억원';

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

export default function FormMonthlySalaryAction() {
  const { wizSalaryAmount, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizSalaryAmount: state.step2.wizSalaryAmount,
      setStep2: state.setStep2,
    })),
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > MAX_AMOUNT) {
      num = MAX_AMOUNT;
    }
    setStep2({ wizSalaryAmount: num });
  };

  const koreanText = numberToKorean(wizSalaryAmount);

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <input
          type="text"
          value={wizSalaryAmount === 0 ? '' : wizSalaryAmount.toLocaleString()}
          onChange={handleAmountChange}
          placeholder="0"
        />
        <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold">
          원
        </span>
      </div>
      {koreanText && <p className="text-text-side px-1 text-xs font-bold">{koreanText}</p>}
    </div>
  );
}
