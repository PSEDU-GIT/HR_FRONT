'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { Pencil, ArrowRight } from 'lucide-react';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import {
  calculateWageEngine,
  calculateScheduleHours,
  calculateDynamicMinGuaranteeAmount,
  getEffectiveNonCompeteAmount,
} from '@/app/(afterLogin)/wizard/_lib/wageEngine';
import cx from 'classnames';

export default function Step2SalarySummaryArea() {
  const {
    wizDaysConfig,
    wizSalaryType,
    wizSalaryAmount,
    wizHourlyRate,
    wizCommissionRate,
    wizMinGuaranteeAmountRaw,
    wizPayDay,
    wizHasTaxFree,
    wizNonTaxFood,
    wizHasNonCompete,
    wizNonCompetePeriod,
    wizNonCompeteRange,
    wizNonCompeteAmount,
    wizNonCompeteCalcType,
    wizNonCompetePercent,
    wizHasExtraAllowance,
    wizOvertimeAllowance,
    wizPositionAllowance,
    wizOtherAllowance,
    wizOtherAllowanceName,
    contractType,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
      wizSalaryType: state.step2.wizSalaryType,
      wizSalaryAmount: state.step2.wizSalaryAmount,
      wizHourlyRate: state.step2.wizHourlyRate,
      wizCommissionRate: state.step2.wizCommissionRate ?? 20,
      wizMinGuaranteeAmountRaw: state.step2.wizMinGuaranteeAmount,
      wizPayDay: state.step2.wizPayDay,
      wizHasTaxFree: state.step2.wizHasTaxFree,
      wizNonTaxFood: state.step2.wizNonTaxFood,
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompetePeriod: state.step2.wizNonCompetePeriod,
      wizNonCompeteRange: state.step2.wizNonCompeteRange,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
      wizNonCompeteCalcType: state.step2.wizNonCompeteCalcType || 'percent',
      wizNonCompetePercent: state.step2.wizNonCompetePercent ?? 10,
      wizHasExtraAllowance: state.step2.wizHasExtraAllowance,
      wizOvertimeAllowance: state.step2.wizOvertimeAllowance,
      wizPositionAllowance: state.step2.wizPositionAllowance,
      wizOtherAllowance: state.step2.wizOtherAllowance,
      wizOtherAllowanceName: state.step2.wizOtherAllowanceName,
      contractType: state.step1.contractType,
      setStep2: state.setStep2,
    })),
  );

  const { weeklyHours, weeklyOvertimeHours, weeklyNightHours } =
    calculateScheduleHours(wizDaysConfig);

  const isUnder5 = contractType?.includes('5인 미만') || contractType?.includes('5인 이하');
  const dynamicMinPay = calculateDynamicMinGuaranteeAmount(wizDaysConfig, isUnder5, {
    hasNonCompete: wizHasNonCompete,
    calcType: wizNonCompeteCalcType,
    percent: wizNonCompetePercent,
    manualAmount: wizNonCompeteAmount,
  });
  const wizMinGuaranteeAmount = wizMinGuaranteeAmountRaw ?? dynamicMinPay;

  const calculatedNonCompeteAmount = getEffectiveNonCompeteAmount({
    hasNonCompete: wizHasNonCompete,
    calcType: wizNonCompeteCalcType,
    percent: wizNonCompetePercent,
    manualAmount: wizNonCompeteAmount,
    salaryType: wizSalaryType,
    salaryAmount: wizSalaryAmount,
    hourlyRate: wizHourlyRate,
    minGuaranteeAmount: wizMinGuaranteeAmount,
  });

  const wageResult = calculateWageEngine({
    salaryType: wizSalaryType,
    salaryAmount: wizSalaryAmount,
    hourlyRate: wizHourlyRate,
    commissionRate: wizCommissionRate,
    minGuaranteeAmount: wizMinGuaranteeAmount,
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

  const goToSection = (
    targetSection: 'amount' | 'payDay' | 'taxFree' | 'nonCompete' | 'extraAllowance',
  ) => {
    setStep2({ salaryEditingSection: targetSection });
  };

  const isMinWagePassed = wageResult.isMinWagePassed;

  const handleCompleteApply = () => {
    if (!isMinWagePassed) return;

    setStep2({
      wizSalaryDone: true,
      wizSubStep: 4,
    });
  };

  const isHourly = wizSalaryType === 'hourly';
  const isCommission = wizSalaryType === 'commission';

  return (
    <div className="space-y-4">
      {/* 1. 설정 정보 라인 리스트 카드 */}
      <div className="border-custom-slate-border divide-custom-slate-border/60 divide-y overflow-hidden rounded-2xl border bg-white shadow-2xs dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {/* 기본 급여 / 비율 / 시급 */}
        <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
          <div className="flex min-w-0 items-center gap-3 pr-2">
            <span className="text-text-side w-24 shrink-0 text-xs font-semibold dark:text-slate-400">
              {isHourly ? '약정 시급' : isCommission ? '비율제 수수료율' : '월 총 지급액'}
            </span>
            <span className="text-text-main truncate text-xs font-bold dark:text-slate-100">
              {isHourly
                ? `시간당 ${wizHourlyRate ? wizHourlyRate.toLocaleString() : 10320}원`
                : isCommission
                  ? `${wizCommissionRate}% (최소보장 ${wizMinGuaranteeAmount ? wizMinGuaranteeAmount.toLocaleString() : 0}원)`
                  : `월 ${wizSalaryAmount ? wizSalaryAmount.toLocaleString() : 0}원`}
            </span>
          </div>
          <button
            type="button"
            onClick={() => goToSection('amount')}
            className="text-text-side hover:text-custom-indigo hover:bg-custom-indigo-bg dark:hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors dark:text-slate-400 dark:hover:bg-slate-800"
            title="금액 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 급여 지급일 */}
        <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
          <div className="flex min-w-0 items-center gap-3 pr-2">
            <span className="text-text-side w-24 shrink-0 text-xs font-semibold dark:text-slate-400">
              급여 지급일
            </span>
            <span className="text-text-main truncate text-xs font-bold dark:text-slate-100">
              매월 {wizPayDay}
            </span>
          </div>
          <button
            type="button"
            onClick={() => goToSection('payDay')}
            className="text-text-side hover:text-custom-indigo hover:bg-custom-indigo-bg dark:hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors dark:text-slate-400 dark:hover:bg-slate-800"
            title="급여일 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {!isHourly && (
          <>
            {/* 비과세 수당 */}
            <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
              <div className="flex min-w-0 items-center gap-3 pr-2">
                <span className="text-text-side w-24 shrink-0 text-xs font-semibold dark:text-slate-400">
                  비과세 수당
                </span>
                <span className="text-text-main truncate text-xs font-bold dark:text-slate-100">
                  {wizHasTaxFree ? `식대: ${wizNonTaxFood.toLocaleString()}원` : '미적용'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => goToSection('taxFree')}
                className="text-text-side hover:text-custom-indigo hover:bg-custom-indigo-bg dark:hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors dark:text-slate-400 dark:hover:bg-slate-800"
                title="비과세 수당 수정"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 경업금지 약정 */}
            <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
              <div className="flex min-w-0 items-center gap-3 pr-2">
                <span className="text-text-side w-24 shrink-0 text-xs font-semibold dark:text-slate-400">
                  경업금지 약정
                </span>
                <span className="text-text-main truncate text-xs font-bold dark:text-slate-100">
                  {wizHasNonCompete
                    ? `${wizNonCompetePeriod} / ${wizNonCompeteRange} (${wizNonCompeteCalcType === 'percent' ? `${wizNonCompetePercent}%: ` : ''}${calculatedNonCompeteAmount.toLocaleString()}원)`
                    : '약정 없음'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => goToSection('nonCompete')}
                className="text-text-side hover:text-custom-indigo hover:bg-custom-indigo-bg dark:hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors dark:text-slate-400 dark:hover:bg-slate-800"
                title="경업금지 약정 수정"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 추가 고정수당 */}
            <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
              <div className="flex min-w-0 items-center gap-3 pr-2">
                <span className="text-text-side w-24 shrink-0 text-xs font-semibold dark:text-slate-400">
                  추가 고정수당
                </span>
                <span className="text-text-main truncate text-xs font-bold dark:text-slate-100">
                  {wizHasExtraAllowance
                    ? [
                        wizPositionAllowance > 0 &&
                          `직책: ${wizPositionAllowance.toLocaleString()}원`,
                        wizOvertimeAllowance > 0 &&
                          `연장: ${wizOvertimeAllowance.toLocaleString()}원`,
                        wizOtherAllowance > 0 &&
                          `${wizOtherAllowanceName || '기타'}: ${wizOtherAllowance.toLocaleString()}원`,
                      ]
                        .filter(Boolean)
                        .join(' / ') || '추가 수당 없음'
                    : '추가 수당 없음'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => goToSection('extraAllowance')}
                className="text-text-side hover:text-custom-indigo hover:bg-custom-indigo-bg dark:hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors dark:text-slate-400 dark:hover:bg-slate-800"
                title="추가 고정수당 수정"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* 2. 법정 노무 임금 계산 명세 (Breakdown Card) */}
      <div className="border-custom-slate-border space-y-2 rounded-2xl border bg-white p-4 transition-all dark:border-slate-800 dark:bg-slate-900">
        <div className="border-custom-slate-border/60 flex items-center justify-between border-b pb-2.5 dark:border-slate-800">
          <span className="text-text-title text-xs font-extrabold dark:text-slate-100">
            법정 임금 분할 및 최저임금 분석 (2026 기준)
          </span>
          {!isMinWagePassed && (
            <span className="border-custom-rose-border bg-custom-rose-bg text-custom-rose inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold">
              최저임금 미달
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="border-custom-slate-border rounded-xl border bg-slate-50/50 p-2.5 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-text-side text-[11px] font-semibold dark:text-slate-400">
              월 소정근로 기본급
            </div>
            <div className="text-text-main mt-0.5 text-xs font-bold dark:text-slate-100">
              {wageResult.baseSalary.toLocaleString()}원
            </div>
            <div className="text-text-side mt-1 text-[10px] dark:text-slate-400">
              월소정 {Math.round(wageResult.mo)}h 대가
            </div>
          </div>

          <div className="border-custom-slate-border rounded-xl border bg-slate-50/50 p-2.5 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-text-side text-[11px] font-semibold dark:text-slate-400">
              월 주휴수당 (유급주휴)
            </div>
            <div className="text-custom-indigo mt-0.5 text-xs font-bold dark:text-indigo-400">
              {wageResult.weeklyHolidayPay.toLocaleString()}원
            </div>
            <div className="text-text-side mt-1 text-[10px] dark:text-slate-400">
              {wageResult.holidayHours > 0
                ? `주 ${Math.round(wageResult.holidayHours)}h (월 ${Math.round(wageResult.mh)}h)`
                : '주15h 미만 (0원)'}
            </div>
          </div>

          <div className="border-custom-slate-border rounded-xl border bg-slate-50/50 p-2.5 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-text-side text-[11px] font-semibold dark:text-slate-400">
              월 연장근로수당 (포괄연장)
            </div>
            <div className="text-custom-indigo mt-0.5 text-xs font-bold dark:text-indigo-400">
              {wageResult.overtimeAllowance.toLocaleString()}원
            </div>
            <div className="text-text-side mt-1 text-[10px] dark:text-slate-400">
              {weeklyOvertimeHours > 0 ? `주 ${weeklyOvertimeHours}h 연장` : '연장근로 없음 (0원)'}
            </div>
          </div>

          <div className="border-custom-slate-border rounded-xl border bg-slate-50/50 p-2.5 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-text-side text-[11px] font-semibold dark:text-slate-400">
              통상시급
            </div>
            <div className="text-text-main mt-0.5 text-xs font-bold dark:text-slate-100">
              {Math.round(wageResult.ordinaryHourlyRate).toLocaleString()}원 /h
            </div>
            <div className="text-text-side mt-1 text-[10px] dark:text-slate-400">
              월기준시간{' '}
              {wageResult.TExact
                ? `${parseFloat(wageResult.TExact.toFixed(2))}h`
                : `${wageResult.T}h`}
            </div>
          </div>

          <div className="border-custom-slate-border col-span-2 rounded-xl border bg-slate-50/50 p-2.5 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-text-side text-[11px] font-semibold dark:text-slate-400">
              최저임금 비교 시급
            </div>
            <div
              className={`mt-0.5 text-xs font-bold ${
                isMinWagePassed ? 'text-text-main dark:text-slate-100' : 'text-custom-rose'
              }`}
            >
              {Math.round(wageResult.comparedHourlyRate).toLocaleString()}원 /h
            </div>
            <div className="text-text-side mt-1 text-[10px] dark:text-slate-400">
              최저 10,320원 대비 {isMinWagePassed ? '(법정 기준 준수)' : '(최저임금 미달)'}
            </div>
          </div>
        </div>
      </div>

      <footer className="pt-1">
        <button
          type="button"
          disabled={!isMinWagePassed}
          onClick={handleCompleteApply}
          className={cx(
            'flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition-all',
            !isMinWagePassed
              ? 'cursor-not-allowed border-rose-200 bg-rose-50 text-rose-500 opacity-80 dark:border-rose-950 dark:bg-rose-950/40 dark:text-rose-400'
              : 'border-custom-slate-border text-text-title cursor-pointer bg-white hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
          )}
        >
          <span>
            {!isMinWagePassed ? '최저임금 미달로 설정 완료 불가' : '급여 및 수당 설정 완료'}
          </span>
          {isMinWagePassed && (
            <ArrowRight className="text-text-side h-3.5 w-3.5 dark:text-slate-400" />
          )}
        </button>
      </footer>
    </div>
  );
}
