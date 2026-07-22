'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import FormHourlySalaryAction from '@/app/(afterLogin)/wizard/step2/_action/salary/FormHourlySalary.action';
import { AlertTriangle } from 'lucide-react';

export default function Step2SalaryHourlyArea() {
  const { wizHourlyRate, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizHourlyRate: state.step2.wizHourlyRate,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const isBelowMinimum = wizHourlyRate < 10320;

  return (
    <div className="space-y-3 pt-2">
      <div>
        <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
          시간당 지급할 시급은 얼마인가요?
        </legend>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-text-sub text-[11px] leading-relaxed font-medium">
            * 2026년 법정 최저시급: 10,320원
          </p>

          {isBelowMinimum && (
            <button
              type="button"
              onClick={() => setHighlightAdvisory('hourlyBelowMinimum')}
              className="group flex cursor-pointer items-center gap-1 text-[11px] font-bold text-rose-600 transition-colors"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="underline-offset-2 group-hover:underline">최저임금법 위반 위험</span>
            </button>
          )}
        </div>
      </div>

      <FormHourlySalaryAction />
    </div>
  );
}
