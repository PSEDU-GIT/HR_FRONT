'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AdvisoryModalCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AdvisoryModalCard';

export default function ReadLegalAdvisorySub3Action() {
  const { wizSalaryType, wizHourlyRate, highlightedAdvisoryKey, setHighlightAdvisory } =
    useWizardStore(
      useShallow((state) => ({
        wizSalaryType: state.step2.wizSalaryType,
        wizHourlyRate: state.step2.wizHourlyRate,
        highlightedAdvisoryKey: state.step2.highlightedAdvisoryKey,
        setHighlightAdvisory: state.setHighlightAdvisory,
      })),
    );

  const isHourlyBelowMinimum =
    wizSalaryType === 'hourly' && wizHourlyRate > 0 && wizHourlyRate < 10320;

  return (
    <div className="space-y-3">
      <div className="border-custom-slate-border-side dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 rounded-2xl border p-4 transition-all">
        <div className="text-text-title dark:text-slate-100 text-xs font-extrabold">
          [자문] 임금 구성항목 명시 의무 및 최저임금 준수
        </div>
        <p className="text-text-sub dark:text-slate-300 text-xs leading-relaxed font-medium">
          근로기준법 제17조에 따라 기본급, 수당, 상여금 등 임금의 구성항목 및 계산방법, 지급방법을
          서면에 명확히 구체화하지 않으면 최대 500만원 이하의 과태료 대상이 됩니다.
        </p>
        <p className="text-text-sub dark:text-slate-300 text-xs leading-relaxed font-medium">
          또한, 최저임금법 제6조에 따라 주 소정근로시간에 대한 임금이 최저시급 및 주휴수당 포함
          최저월급 이상이어야 하며, 미달 시 3년 이하의 징역 또는 2천만원 이하의 벌금이 부과될 수
          있습니다.
        </p>
      </div>

      <AdvisoryModalCard
        layoutId="advisory-card-taxFreeInfo"
        title="[자문] 비과세 수당 (식대) 요건"
        isHighlighted={highlightedAdvisoryKey === 'taxFreeInfo'}
        onClose={() => setHighlightAdvisory(null)}
        theme="default"
      >
        <p>
          식대 (월 20만원 한도): 학원에서 현물 식사를 제공하지 않는 경우 세법상 비과세 처리가
          인정됩니다.
        </p>
      </AdvisoryModalCard>

      {isHourlyBelowMinimum && (
        <AdvisoryModalCard
          layoutId="advisory-card-hourlyBelowMinimum"
          title="[위험] 최저임금법 위반 소지"
          isHighlighted={highlightedAdvisoryKey === 'hourlyBelowMinimum'}
          onClose={() => setHighlightAdvisory(null)}
          theme="danger"
        >
          <p className="font-bold">
            책정된 급여가 법정 기준치 미만입니다. 최저임금법 제6조 위반으로 3년 이하의 징역 또는
            2천만원 이하의 벌금에 처해질 수 있습니다. 즉시 급여 상향이 요구됩니다.
          </p>
        </AdvisoryModalCard>
      )}
    </div>
  );
}
