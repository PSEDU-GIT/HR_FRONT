'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import {
  calcPeriodDays,
  calcPeriodLabel,
} from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import AdvisoryModalCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AdvisoryModalCard';
import { useContractRiskRulesState } from '@/app/(afterLogin)/wizard/(standard)/step3/_state/getContractRiskRules.state';
import cx from 'classnames';

export default function ReadContractPeriodAdvisoryAction() {
  const { wizStartDate, wizEndDate, highlightedAdvisoryKey, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizStartDate: state.step2.wizStartDate,
      wizEndDate: state.step2.wizEndDate,
      highlightedAdvisoryKey: state.step2.highlightedAdvisoryKey,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const { riskRules } = useContractRiskRulesState('TEACHER');
  const periodRule = riskRules?.find((r) => r.ruleType === 'FIXED_TERM_2YEAR_LIMIT');
  const severanceRule = riskRules?.find((r) => r.ruleType === 'SEVERANCE_PAY_AVOIDANCE_RISK');

  const periodDays = calcPeriodDays(wizStartDate, wizEndDate);
  const periodLabel = calcPeriodLabel(wizStartDate, wizEndDate);
  const isUnderOneYear = periodDays > 0 && periodDays < 365;

  const advisoryTitle = periodRule?.advisoryTitle;
  const advisoryDescription = periodRule?.advisoryDescriptionMarkdown;

  const severanceTitle = severanceRule?.advisoryTitle || '[주의] 퇴직금 회피 의혹 주의';
  const severanceText =
    severanceRule?.advisoryDescriptionMarkdown ||
    severanceRule?.messageFail ||
    severanceRule?.legalBasis;

  return (
    <div className="space-y-3">
      {advisoryTitle && (
        <div className="border-custom-slate-border-side space-y-2 rounded-2xl border bg-white p-4 transition-all dark:border-slate-800 dark:bg-slate-900">
          <div className="text-text-title text-xs font-extrabold dark:text-slate-100">
            {advisoryTitle}
          </div>
          {advisoryDescription && (
            <p className="text-text-sub text-xs leading-relaxed font-medium whitespace-pre-line dark:text-slate-300">
              {advisoryDescription}
            </p>
          )}
          {periodDays > 0 && (
            <div className="border-custom-slate-border mt-2 flex flex-wrap gap-2 border-t pt-2 dark:border-slate-800">
              <span
                className={cx(
                  'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold',
                  periodDays >= 365
                    ? 'border-custom-emerald-border bg-custom-emerald-bg text-custom-emerald dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'border-custom-yellow-border bg-custom-yellow-bg text-custom-yellow dark:bg-amber-950/40 dark:text-amber-300',
                )}
              >
                계약기간 {periodLabel}{' '}
                <span className="text-text-side font-medium dark:text-slate-400">
                  ({periodDays}일)
                </span>{' '}
                · {periodDays >= 365 ? '퇴직금 의무 있음' : '퇴직금 없음'}
              </span>
            </div>
          )}
        </div>
      )}

      {isUnderOneYear && severanceText && (
        <AdvisoryModalCard
          layoutId="advisory-card-underOneYear"
          title={severanceTitle}
          isHighlighted={highlightedAdvisoryKey === 'underOneYear'}
          onClose={() => setHighlightAdvisory(null)}
          theme="yellow"
        >
          <p className="whitespace-pre-line leading-relaxed">{severanceText}</p>
        </AdvisoryModalCard>
      )}
    </div>
  );
}
