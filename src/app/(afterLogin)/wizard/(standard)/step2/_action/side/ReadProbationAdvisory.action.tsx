'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AdvisoryModalCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AdvisoryModalCard';
import { useContractRiskRulesState } from '@/app/(afterLogin)/wizard/(standard)/step3/_state/getContractRiskRules.state';
import cx from 'classnames';

export default function ReadProbationAdvisoryAction() {
  const { wizProbation, highlightedAdvisoryKey, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizProbation: state.step2.wizProbation,
      highlightedAdvisoryKey: state.step2.highlightedAdvisoryKey,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const { riskRules } = useContractRiskRulesState('TEACHER');
  const probationRule = riskRules?.find((r) => r.ruleType === 'PROBATION_PERIOD_VALIDITY');

  const isProbationWarning = wizProbation !== '없음' && parseInt(wizProbation) > 3;

  const title = probationRule?.advisoryTitle;
  const description = probationRule?.advisoryDescriptionMarkdown;
  const failMessage = probationRule?.messageFail;

  return (
    <div className="space-y-3">
      {wizProbation !== '없음' && title && (
        <div className="border-custom-slate-border-side space-y-2 rounded-2xl border bg-white p-4 transition-all dark:border-slate-800 dark:bg-slate-900">
          <div className="text-text-title text-xs font-extrabold dark:text-slate-100">{title}</div>
          {description && (
            <p className="text-text-sub text-xs leading-relaxed font-medium whitespace-pre-line dark:text-slate-300">
              {description}
            </p>
          )}
          <div className="border-custom-slate-border mt-2 flex flex-wrap gap-2 border-t pt-2 dark:border-slate-800">
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

      {isProbationWarning && failMessage && (
        <AdvisoryModalCard
          layoutId="advisory-card-probationOver3"
          title="[주의] 수습기간 초과 리스크"
          isHighlighted={highlightedAdvisoryKey === 'probationOver3'}
          onClose={() => setHighlightAdvisory(null)}
          theme="yellow"
        >
          <p>{failMessage}</p>
        </AdvisoryModalCard>
      )}
    </div>
  );
}
