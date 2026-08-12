'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AdvisoryModalCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AdvisoryModalCard';
import { useContractRiskRulesState } from '@/app/(afterLogin)/wizard/(standard)/step3/_state/getContractRiskRules.state';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import {
  calculateWageEngine,
  calculateScheduleHours,
  calculateDynamicMinGuaranteeAmount,
  getEffectiveNonCompeteAmount,
} from '@/app/(afterLogin)/wizard/_lib/wageEngine';

export default function ReadLegalAdvisorySub3Action() {
  const {
    wizDaysConfig,
    wizSalaryType,
    wizSalaryAmount,
    wizHourlyRate,
    wizCommissionRate,
    wizMinGuaranteeAmount,
    wizHasTaxFree,
    wizNonTaxFood,
    wizHasNonCompete,
    wizNonCompeteAmount,
    wizNonCompeteCalcType,
    wizNonCompetePercent,
    wizHasExtraAllowance,
    wizOvertimeAllowance,
    wizPositionAllowance,
    wizOtherAllowance,
    contractType,
    highlightedAdvisoryKey,
    setHighlightAdvisory,
  } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
      wizSalaryType: state.step2.wizSalaryType,
      wizSalaryAmount: state.step2.wizSalaryAmount,
      wizHourlyRate: state.step2.wizHourlyRate,
      wizCommissionRate: state.step2.wizCommissionRate,
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount,
      wizHasTaxFree: state.step2.wizHasTaxFree,
      wizNonTaxFood: state.step2.wizNonTaxFood,
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
      wizNonCompeteCalcType: state.step2.wizNonCompeteCalcType || 'percent',
      wizNonCompetePercent: state.step2.wizNonCompetePercent ?? 10,
      wizHasExtraAllowance: state.step2.wizHasExtraAllowance,
      wizOvertimeAllowance: state.step2.wizOvertimeAllowance,
      wizPositionAllowance: state.step2.wizPositionAllowance,
      wizOtherAllowance: state.step2.wizOtherAllowance,
      contractType: state.step1.contractType,
      highlightedAdvisoryKey: state.step2.highlightedAdvisoryKey,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const { riskRules } = useContractRiskRulesState('TEACHER');
  const minWageRule = riskRules?.find((r) => r.ruleType === 'MIN_WAGE');
  const mealRule = riskRules?.find((r) => r.ruleType === 'NON_TAXABLE_MEAL_ALLOWANCE_GUIDE');

  const { weeklyHours, weeklyOvertimeHours, weeklyNightHours } =
    calculateScheduleHours(wizDaysConfig);
  const isUnder5 = contractType?.includes('5인 미만') || contractType?.includes('5인 이하');
  const dynamicMinPay = calculateDynamicMinGuaranteeAmount(wizDaysConfig);

  const calculatedNonCompeteAmount = getEffectiveNonCompeteAmount({
    hasNonCompete: wizHasNonCompete,
    calcType: wizNonCompeteCalcType,
    percent: wizNonCompetePercent,
    manualAmount: wizNonCompeteAmount,
    salaryType: wizSalaryType,
    salaryAmount: wizSalaryAmount,
    hourlyRate: wizHourlyRate,
    minGuaranteeAmount: wizMinGuaranteeAmount || dynamicMinPay,
  });

  const wageResult = calculateWageEngine({
    salaryType: wizSalaryType,
    salaryAmount: wizSalaryAmount,
    hourlyRate: wizHourlyRate,
    commissionRate: wizCommissionRate || 20,
    minGuaranteeAmount: wizMinGuaranteeAmount || dynamicMinPay,
    mealAllowance: wizHasTaxFree ? wizNonTaxFood : 0,
    positionAllowance: wizHasExtraAllowance ? wizPositionAllowance : 0,
    overtimeAllowance: wizHasExtraAllowance ? wizOvertimeAllowance : 0,
    otherAllowance: wizHasExtraAllowance ? wizOtherAllowance : 0,
    nonCompeteAmount: calculatedNonCompeteAmount,
    weeklyHours,
    weeklyOvertimeHours,
    weeklyNightHours,
    employeeCount: isUnder5 ? 4 : 5,
  });

  const hasSalaryEntered = wizSalaryType === 'hourly' ? wizHourlyRate >= 1 : wizSalaryAmount >= 1;
  const isBelowMinimum = hasSalaryEntered && !wageResult.isMinWagePassed;

  const minWageTitle = minWageRule?.advisoryTitle;
  const minWageDescription = minWageRule?.advisoryDescriptionMarkdown;

  const mealTitle = mealRule?.advisoryTitle;
  const mealDescription = mealRule?.advisoryDescriptionMarkdown;

  const minWageFailMessage = minWageRule?.messageFail;
  const thresholdVal = (minWageRule?.ruleValueJson?.minHourlyWage || 10320).toLocaleString();

  const formattedFailMessage = minWageFailMessage
    ? minWageFailMessage
        .replace('{value}', wageResult.comparedHourlyRate.toLocaleString())
        .replace('{threshold}', thresholdVal)
    : `[위험] 환산 시급 ${wageResult.comparedHourlyRate.toLocaleString()}원이 최저시급 ${thresholdVal}원 미만입니다 — 최저임금법 제6조 위반 시 3년 이하 징역 또는 2천만원 이하 벌금에 처해질 수 있습니다.`;

  return (
    <div className="space-y-3">
      {hasSalaryEntered && minWageTitle && (
        <div className="border-custom-slate-border-side space-y-2 rounded-2xl border bg-white p-4 transition-all dark:border-slate-800 dark:bg-slate-900">
          <div className="text-text-title text-xs font-extrabold dark:text-slate-100">
            {minWageTitle}
          </div>
          {minWageDescription && (
            <p className="text-text-sub text-xs leading-relaxed font-medium whitespace-pre-line dark:text-slate-300">
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

      {isBelowMinimum && (
        <AdvisoryModalCard
          layoutId="advisory-card-hourlyBelowMinimum"
          title="[위험] 최저임금법 위반 소지"
          isHighlighted={highlightedAdvisoryKey === 'hourlyBelowMinimum'}
          onClose={() => setHighlightAdvisory(null)}
          theme="danger"
        >
          <p className="font-bold whitespace-pre-line">{formattedFailMessage}</p>
        </AdvisoryModalCard>
      )}
    </div>
  );
}
