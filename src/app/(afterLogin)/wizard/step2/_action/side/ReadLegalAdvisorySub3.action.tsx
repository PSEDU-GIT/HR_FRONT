'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AdvisoryModalCard from '@/app/(afterLogin)/wizard/step2/_component/AdvisoryModalCard';

export default function ReadLegalAdvisorySub3Action() {
  const { wizHasTaxFree, highlightedAdvisoryKey, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizHasTaxFree: state.step2.wizHasTaxFree,
      highlightedAdvisoryKey: state.step2.highlightedAdvisoryKey,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  return (
    <div className="space-y-3">
      <div className="border-custom-slate-border-side space-y-2 rounded-2xl border bg-white p-4 transition-all">
        <div className="text-text-title text-xs font-extrabold">[자문] 임금 구성항목 명시 의무</div>
        <p className="text-text-sub text-xs leading-relaxed font-medium">
          근로기준법 제17조에 따라 기본급, 수당, 상여금 등 임금의 구성항목 및 계산방법, 지급방법을
          서면에 명확히 구체화하지 않으면 최대 500만원 이하의 과태료 대상이 됩니다.
        </p>
      </div>

      {wizHasTaxFree && (
        <AdvisoryModalCard
          layoutId="advisory-card-taxFreeInfo"
          title="[자문] 비과세 수당 및 자가운전보조금 요건"
          isHighlighted={highlightedAdvisoryKey === 'taxFreeInfo'}
          onClose={() => setHighlightAdvisory(null)}
          theme="default"
        >
          <p>
            식대 (월 20만원 한도): 학원에서 현물 식사를 제공하지 않는 경우 세법상 비과세 처리가
            인정됩니다.
          </p>
          <p>
            자가운전보조금 (월 20만원 한도): 근로자 본인 소유(또는 부부 공동명의) 차량을 직접
            운전하여 출장 등 학원 업무에 활용하고 실제 여비를 별도로 받지 않는 경우에 비과세 혜택이
            적용됩니다.
          </p>
        </AdvisoryModalCard>
      )}
    </div>
  );
}
