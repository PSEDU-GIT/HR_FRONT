'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import FormSalaryTaxFreeAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/FormSalaryTaxFree.action';
import { AlertTriangle } from 'lucide-react';

export default function Step2SalaryTaxFreeArea() {
  const { setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const handleInfoClick = () => {
    setHighlightAdvisory('taxFreeInfo');
  };

  return (
    <div className="space-y-3 pt-2">
      <div>
        <div className="flex items-center gap-1.5">
          <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
            식대나 자가운전보조금 같은 비과세 수당을 비과세 한도 내에서 적용할까요?
          </legend>
          <button
            type="button"
            onClick={handleInfoClick}
            title="클릭하여 오른쪽 자문 내용 확인"
            className="text-custom-yellow group inline-flex cursor-pointer items-center gap-1 text-xs font-bold transition-transform active:scale-95"
          >
            <AlertTriangle className="text-custom-yellow h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110" />
            <span className="underline-offset-2 group-hover:underline">비과세 적용 안내</span>
          </button>
        </div>
        <p className="text-text-sub mt-1.5 text-[11px] leading-relaxed font-medium">
          * 총 세전 금액은 동일하더라도 비과세 처리를 늘릴수록 사업주와 선생님 양측의 4대보험료 및
          소득세 부담이 경감됩니다.
        </p>
      </div>
      <FormSalaryTaxFreeAction />
    </div>
  );
}
