'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import FormHourlySalaryAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/FormHourlySalary.action';
import { AlertTriangle } from 'lucide-react';

export default function Step2SalaryHourlyArea() {
  const { wizHourlyRate, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizHourlyRate: state.step2.wizHourlyRate,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const isBelowMinimum = wizHourlyRate > 0 && wizHourlyRate < 10320;

  return (
    <div className="space-y-3 pt-2">
      <div>
        <div className="flex items-center gap-2">
          <legend className="text-text-side text-xs leading-none font-extrabold tracking-widest uppercase">
            시간당 지급할 시급은 얼마인가요?
          </legend>
          {isBelowMinimum && (
            <button
              type="button"
              onClick={() => setHighlightAdvisory('hourlyBelowMinimum')}
              className="group flex cursor-pointer items-center gap-1 text-xs leading-none font-bold text-rose-600 transition-colors"
            >
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span className="underline-offset-2 group-hover:underline">최저임금법 위반 위험</span>
            </button>
          )}
        </div>
        <p className="text-text-sub mt-1.5 text-11 leading-relaxed font-medium">
          * 2026년 법정 최저시급: 10,320원
        </p>
      </div>

      <FormHourlySalaryAction />
    </div>
  );
}
