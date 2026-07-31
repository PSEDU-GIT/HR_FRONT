'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AdvisoryModalCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AdvisoryModalCard';
import cx from 'classnames';

export default function ReadProbationAdvisoryAction() {
  const { wizProbation, highlightedAdvisoryKey, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizProbation: state.step2.wizProbation,
      highlightedAdvisoryKey: state.step2.highlightedAdvisoryKey,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const isProbationWarning = wizProbation !== '없음' && parseInt(wizProbation) > 3;

  return (
    <div className="space-y-3">
      {wizProbation !== '없음' && (
        <div className="border-custom-slate-border-side space-y-2 rounded-2xl border bg-white p-4 transition-all">
          <div className="text-text-title text-xs font-extrabold">[자문] 수습기간 설정 가이드</div>
          <p className="text-text-sub text-xs leading-relaxed font-medium">
            근로기준법상 수습기간 중에는 업무 적격성 평가를 통한 계약 해지 요건이 일반 해고보다 다소
            완화되나, 3개월을 초과하는 수습기간 설정 시 최저임금 감액 적용 혜택은 최초 3개월까지만
            제한적으로 인정됩니다.
          </p>
          <div className="border-custom-slate-border mt-2 flex flex-wrap gap-2 border-t pt-2">
            <span
              className={cx(
                'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold',
                isProbationWarning
                  ? 'border-custom-yellow-border bg-custom-yellow-bg text-custom-yellow'
                  : 'border-custom-emerald-border bg-custom-emerald-bg text-custom-emerald',
              )}
            >
              수습 {wizProbation} · {isProbationWarning ? '3개월 초과' : '적정'}
            </span>
          </div>
        </div>
      )}

      {isProbationWarning && (
        <AdvisoryModalCard
          layoutId="advisory-card-probationOver3"
          title="[주의] 수습기간 초과 리스크"
          isHighlighted={highlightedAdvisoryKey === 'probationOver3'}
          onClose={() => setHighlightAdvisory(null)}
          theme="yellow"
        >
          <p>
            3개월을 초과한 수습 기간은 설정 가능하나, 최저임금 감액 적용(10% 이내 감액)은 최초
            3개월까지만 유효합니다. 초과 기간 감액 시 임금체불 소지가 있습니다.
          </p>
        </AdvisoryModalCard>
      )}
    </div>
  );
}
