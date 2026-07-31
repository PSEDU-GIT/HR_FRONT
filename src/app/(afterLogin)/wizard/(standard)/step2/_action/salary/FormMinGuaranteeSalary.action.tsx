'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import {
  MAX_SALARY_AMOUNT,
  numberToKorean,
} from '@/app/(afterLogin)/wizard/(standard)/step2/_state/salaryUtils';

const DEFAULT_MIN_GUARANTEE = 1883297;

export default function FormMinGuaranteeSalaryAction() {
  const { wizMinGuaranteeAmount, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount ?? DEFAULT_MIN_GUARANTEE,
      setStep2: state.setStep2,
    })),
  );

  const handleMinGuaranteeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > MAX_SALARY_AMOUNT) {
      num = MAX_SALARY_AMOUNT;
    }
    setStep2({ wizMinGuaranteeAmount: num });
  };

  const koreanText = numberToKorean(wizMinGuaranteeAmount);

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <input
          type="text"
          value={
            wizMinGuaranteeAmount === 0
              ? ''
              : wizMinGuaranteeAmount.toLocaleString()
          }
          onChange={handleMinGuaranteeChange}
          placeholder="1,883,297"
        />
        <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold">
          원
        </span>
      </div>
      {koreanText && <p className="text-text-side px-1 text-xs font-bold">{koreanText}</p>}
    </div>
  );
}
