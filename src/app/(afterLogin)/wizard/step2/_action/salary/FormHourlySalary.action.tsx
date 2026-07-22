'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import {
  MAX_SALARY_AMOUNT,
  numberToKorean,
} from '@/app/(afterLogin)/wizard/step2/_state/salaryUtils';

export default function FormHourlySalaryAction() {
  const { wizHourlyRate, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizHourlyRate: state.step2.wizHourlyRate,
      setStep2: state.setStep2,
    })),
  );

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > MAX_SALARY_AMOUNT) {
      num = MAX_SALARY_AMOUNT;
    }
    setStep2({ wizHourlyRate: num });
  };

  const koreanText = numberToKorean(wizHourlyRate);

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <input
          type="text"
          value={wizHourlyRate === 0 ? '' : wizHourlyRate.toLocaleString()}
          onChange={handleSalaryChange}
          placeholder="10,320"
        />
        <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold">
          원
        </span>
      </div>
      {koreanText && <p className="text-text-side px-1 text-xs font-bold">{koreanText}</p>}
    </div>
  );
}
