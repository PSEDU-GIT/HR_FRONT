'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AdvisoryModalCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AdvisoryModalCard';
import { useContractRiskRulesState } from '@/app/(afterLogin)/wizard/(standard)/step3/_state/getContractRiskRules.state';

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

  const { riskRules } = useContractRiskRulesState('TEACHER');
  const minWageRule = riskRules?.find((r) => r.ruleType === 'MIN_WAGE');
  const mealRule = riskRules?.find((r) => r.ruleType === 'NON_TAXABLE_MEAL_ALLOWANCE_GUIDE');

  const isHourlyBelowMinimum =
    wizSalaryType === 'hourly' && wizHourlyRate > 0 && wizHourlyRate < 10320;

  const minWageTitle = minWageRule?.advisoryTitle;
  const minWageDescription = minWageRule?.advisoryDescriptionMarkdown;

  const mealTitle = mealRule?.advisoryTitle;
  const mealDescription = mealRule?.advisoryDescriptionMarkdown;

  const minWageFailMessage = minWageRule?.messageFail;

  return (
    <div className="space-y-3">
      {minWageTitle && (
        <div className="border-custom-slate-border-side dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 rounded-2xl border p-4 transition-all">
          <div className="text-text-title dark:text-slate-100 text-xs font-extrabold">
            {minWageTitle}
          </div>
          {minWageDescription && (
            <p className="text-text-sub dark:text-slate-300 text-xs leading-relaxed font-medium whitespace-pre-line">
              {minWageDescription}
            </p>
          )}
        </div>
      )}

      {mealTitle && (
        <AdvisoryModalCard
          layoutId="advisory-card-taxFreeInfo"
          title={mealTitle}
          isHighlighted={highlightedAdvisoryKey === 'taxFreeInfo'}
          onClose={() => setHighlightAdvisory(null)}
          theme="default"
        >
          {mealDescription && <p className="whitespace-pre-line">{mealDescription}</p>}
        </AdvisoryModalCard>
      )}

      {isHourlyBelowMinimum && minWageFailMessage && (
        <AdvisoryModalCard
          layoutId="advisory-card-hourlyBelowMinimum"
          title="[위험] 최저임금법 위반 소지"
          isHighlighted={highlightedAdvisoryKey === 'hourlyBelowMinimum'}
          onClose={() => setHighlightAdvisory(null)}
          theme="danger"
        >
          <p className="font-bold whitespace-pre-line">{minWageFailMessage}</p>
        </AdvisoryModalCard>
      )}
    </div>
  );
}
