'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { useAcademyPartyInfoState } from '@/app/(afterLogin)/_state/getAcademyPartyInfo.state';
import { Pencil, ArrowRight } from 'lucide-react';
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

  const { academyInfo } = useAcademyPartyInfoState();
  const count = academyInfo?.employedStaffCount;
  const isUnder5 =
    (count !== undefined && count < 5) ||
    contractType?.includes('5인 미만') ||
    contractType?.includes('5인 이하');
  const effectiveEmployeeCount = isUnder5 ? 4 : (count ?? 5);

  const dynamicMinPay = calculateDynamicMinGuaranteeAmount(wizDaysConfig);
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
    commissionRate: wizCommissionRate || 20,
    minGuaranteeAmount: wizMinGuaranteeAmount,
    mealAllowance: wizHasTaxFree ? wizNonTaxFood : 0,
    positionAllowance: wizHasExtraAllowance ? wizPositionAllowance : 0,
    overtimeAllowance: wizHasExtraAllowance ? wizOvertimeAllowance : 0,
    otherAllowance: wizHasExtraAllowance ? wizOtherAllowance : 0,
    nonCompeteAmount: calculatedNonCompeteAmount,
    weeklyHours,
    weeklyOvertimeHours,
    weeklyNightHours,
    employeeCount: effectiveEmployeeCount,
  });

  const goToSection = (
    targetSection: 'amount' | 'payDay' | 'taxFree' | 'nonCompete' | 'extraAllowance',
  ) => {
    setStep2({ salaryEditingSection: targetSection });
  };

  const cappedWeeklyHours = Math.min(weeklyHours, 40);
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
      <div className="border-custom-slate-border divide-custom-slate-border bg-background divide-y overflow-hidden rounded-2xl border shadow-2xs">
        {/* 기본 급여 / 비율 / 시급 */}
        <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
          <div className="flex min-w-0 items-center gap-3 pr-2">
            <span className="text-text-side w-24 shrink-0 text-xs font-semibold">
              {isHourly ? '약정 시급' : isCommission ? '비율제 수수료율' : '총 지급 희망금액'}
            </span>
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <span className="text-text-main truncate text-xs font-bold">
                {isHourly
                  ? `시간당 ${wizHourlyRate ? wizHourlyRate.toLocaleString() : 10320}원`
                  : isCommission
                    ? `${wizCommissionRate}% (최소보장 ${wizMinGuaranteeAmount ? wizMinGuaranteeAmount.toLocaleString() : 0}원)`
                    : `월 ${wizSalaryAmount ? wizSalaryAmount.toLocaleString() : 0}원`}
              </span>
              {!isCommission && (
                <button
                  type="button"
                  onClick={() => goToSection('taxFree')}
                  title="비과세 식대 설정 수정"
                  className="border-custom-slate-border hover:border-custom-indigo-border hover:bg-custom-indigo-bg hover:text-custom-indigo bg-custom-slate-bg text-text-sub text-11 inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-0.5 font-bold transition-all"
                >
                  <span>
                    {wizHasTaxFree && wizNonTaxFood > 0
                      ? `(식대 ${wizNonTaxFood >= 10000 ? `${Math.round(wizNonTaxFood / 10000)}만원` : `${wizNonTaxFood.toLocaleString()}원`} 포함)`
                      : '(비과세 식대 미적용)'}
                  </span>
                  <Pencil className="h-2.5 w-2.5 opacity-60" />
                </button>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => goToSection('amount')}
            className="text-text-side hover:text-custom-indigo hover:bg-custom-indigo-bg dark:hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors dark:hover:bg-slate-800"
            title="금액 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 급여 지급일 */}
        <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
          <div className="flex min-w-0 items-center gap-3 pr-2">
            <span className="text-text-side w-24 shrink-0 text-xs font-semibold">급여 지급일</span>
            <span className="text-text-main truncate text-xs font-bold">매월 {wizPayDay}</span>
          </div>
          <button
            type="button"
            onClick={() => goToSection('payDay')}
            className="text-text-side hover:text-custom-indigo hover:bg-custom-indigo-bg dark:hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors dark:hover:bg-slate-800"
            title="급여일 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 경업금지 약정 */}
        <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
          <div className="flex min-w-0 items-center gap-3 pr-2">
            <span className="text-text-side w-24 shrink-0 text-xs font-semibold">
              경업금지 약정
            </span>
            <span className="text-text-main truncate text-xs font-bold">
              {wizHasNonCompete
                ? `${wizNonCompetePeriod} / ${wizNonCompeteRange} (${wizNonCompeteCalcType === 'percent' ? `${wizNonCompetePercent}%: ` : ''}${calculatedNonCompeteAmount.toLocaleString()}원)`
                : '약정 없음'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => goToSection('nonCompete')}
            className="text-text-side hover:text-custom-indigo hover:bg-custom-indigo-bg dark:hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors dark:hover:bg-slate-800"
            title="경업금지 약정 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 추가 고정수당 */}
        <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
          <div className="flex min-w-0 items-center gap-3 pr-2">
            <span className="text-text-side w-24 shrink-0 text-xs font-semibold">
              추가 고정수당
            </span>
            <span className="text-text-main truncate text-xs font-bold">
              {wizHasExtraAllowance
                ? [
                    wizPositionAllowance > 0 && `직책: ${wizPositionAllowance.toLocaleString()}원`,
                    wizOvertimeAllowance > 0 && `연장: ${wizOvertimeAllowance.toLocaleString()}원`,
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
            className="text-text-side hover:text-custom-indigo hover:bg-custom-indigo-bg dark:hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors dark:hover:bg-slate-800"
            title="추가 고정수당 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 2. 법정 노무 임금 계산 명세 (Breakdown Card) */}
      {/* 2. 세로 명세형 한 줄 한 줄 설명 + 금액 산출 수식 */}
      <div className="border-custom-slate-border bg-background space-y-2.5 rounded-2xl border p-4 shadow-2xs transition-all">
        <div className="border-custom-slate-border flex items-center justify-between border-b pb-2">
          <span className="text-text-title text-xs font-extrabold">
            월 급여 수당 세부 산출 명세
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-text-sub text-11 font-bold">
              현재 시급{' '}
              <strong className="text-custom-indigo font-black">
                {Math.round(wageResult.ordinaryHourlyRate).toLocaleString()}원
              </strong>
              /h
            </span>
            {!isMinWagePassed ? (
              <span className="text-custom-rose text-11 font-bold">(최저 미달)</span>
            ) : (
              <span className="text-custom-emerald text-11 font-bold">(최저 충족)</span>
            )}
          </div>
        </div>

        {/* 한 줄 한 줄 설명 및 금액 세로 나열 */}
        <div className="space-y-1.5 pt-0.5 text-xs">
          {/* ① 월 소정근로 기본급 */}
          <div className="flex items-center justify-between py-1">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="text-text-main truncate font-bold">월 소정근로 기본급</span>
              <span className="text-text-side text-11 shrink-0">
                (주 {cappedWeeklyHours}시간 × 4.345 ={' '}
                {wageResult.moExact ? Number(wageResult.moExact.toFixed(1)) : 173.8}시간)
              </span>
            </div>
            <span className="text-text-title shrink-0 font-bold">
              {wageResult.baseSalary.toLocaleString()}원
            </span>
          </div>

          {/* ② 월 주휴수당 */}
          <div className="flex items-center justify-between py-1">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="text-text-side shrink-0 font-bold">+</span>
              <span className="text-text-main truncate font-bold">월 주휴수당</span>
              <span className="text-text-side text-11 shrink-0">
                (
                {wageResult.holidayHours > 0
                  ? `주휴 ${wageResult.holidayHours}시간 × 4.345 = ${wageResult.mhExact ? Number(wageResult.mhExact.toFixed(2)) : 34.76}시간`
                  : '주15h 미만 0원'}
                )
              </span>
            </div>
            <span className="text-text-title shrink-0 font-bold">
              {wageResult.weeklyHolidayPay.toLocaleString()}원
            </span>
          </div>

          {/* ③ 비과세 식대 수당 (적용 시) */}
          {wizHasTaxFree && wizNonTaxFood > 0 && (
            <div className="flex items-center justify-between py-1">
              <div className="flex min-w-0 items-center gap-1.5">
                <span className="text-text-side shrink-0 font-bold">+</span>
                <span className="text-text-main truncate font-bold">비과세 식대 수당</span>
                <span className="text-text-side text-11 shrink-0">(월 비과세 식대)</span>
              </div>
              <span className="text-text-title shrink-0 font-bold">
                {wizNonTaxFood.toLocaleString()}원
              </span>
            </div>
          )}

          {/* ④ 추가 약정 수당 및 특수 대가 별도 구분 영역 (포괄 연장근로수당, 추가수당, 경업금지) */}
          {(weeklyOvertimeHours > 0 ||
            wageResult.overtimeAllowance > 0 ||
            (wizHasExtraAllowance && (wizPositionAllowance > 0 || wizOtherAllowance > 0)) ||
            (wizHasNonCompete && calculatedNonCompeteAmount > 0)) && (
            <div className="border-custom-slate-border mt-2.5 space-y-1.5 border-t border-dashed pt-2.5">
              <div className="text-text-side text-10 font-extrabold tracking-wider uppercase">
                추가 약정 수당 및 특수 대가
              </div>

              {/* 월 포괄 연장근로수당 */}
              {(weeklyOvertimeHours > 0 || wageResult.overtimeAllowance > 0) && (
                <div className="flex items-center justify-between py-1">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="text-text-side shrink-0 font-bold">+</span>
                    <span className="text-text-main truncate font-bold">월 포괄 연장근로수당</span>
                    <span className="text-text-side text-11 shrink-0">
                      (
                      {isUnder5
                        ? `연장 ${weeklyOvertimeHours}시간 × 4.345 = ${Number((weeklyOvertimeHours * 4.345).toFixed(2))}시간`
                        : `연장 ${weeklyOvertimeHours}시간 × 1.5배 × 4.345 = ${Number((weeklyOvertimeHours * 1.5 * 4.345).toFixed(2))}시간`}
                      )
                    </span>
                  </div>
                  <span className="text-text-title shrink-0 font-bold">
                    {wageResult.overtimeAllowance.toLocaleString()}원
                  </span>
                </div>
              )}

              {/* 추가 고정 수당 (직책) */}
              {wizHasExtraAllowance && wizPositionAllowance > 0 && (
                <div className="flex items-center justify-between py-1">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="text-text-side shrink-0 font-bold">+</span>
                    <span className="text-text-main truncate font-bold">추가 고정수당 (직책)</span>
                    <span className="text-text-side text-11 shrink-0">(고정 직책 수당)</span>
                  </div>
                  <span className="text-text-title shrink-0 font-bold">
                    {wizPositionAllowance.toLocaleString()}원
                  </span>
                </div>
              )}

              {/* 추가 고정 수당 (기타) */}
              {wizHasExtraAllowance && wizOtherAllowance > 0 && (
                <div className="flex items-center justify-between py-1">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="text-text-side shrink-0 font-bold">+</span>
                    <span className="text-text-main truncate font-bold">추가 고정수당 (기타)</span>
                    <span className="text-text-side text-11 shrink-0">(기타 별도 수당)</span>
                  </div>
                  <span className="text-text-title shrink-0 font-bold">
                    {wizOtherAllowance.toLocaleString()}원
                  </span>
                </div>
              )}

              {/* 경업금지 약정 대가 */}
              {wizHasNonCompete && calculatedNonCompeteAmount > 0 && (
                <div className="flex items-center justify-between py-1">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="text-text-side shrink-0 font-bold">+</span>
                    <span className="text-text-main truncate font-bold">경업금지 약정 대가</span>
                    <span className="text-text-side text-11 shrink-0">
                      ({wizNonCompetePeriod} / {wizNonCompeteRange})
                    </span>
                  </div>
                  <span className="text-text-title shrink-0 font-bold">
                    {calculatedNonCompeteAmount.toLocaleString()}원
                  </span>
                </div>
              )}
            </div>
          )}

          {/* = 최종 총 지급액 합계 바 (월 지급액 + 추가 수당 + 경업금지 대가) */}
          <div className="border-custom-slate-border mt-2.5 flex items-center justify-between border-t pt-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-custom-indigo text-sm font-black">=</span>
              <span className="text-text-title text-xs font-extrabold">최종 월 약정 총 지급액</span>
            </div>
            <span className="text-custom-indigo text-sm font-black">
              {(
                wageResult.baseSalary +
                wageResult.weeklyHolidayPay +
                (wizHasTaxFree ? wizNonTaxFood : 0) +
                wageResult.overtimeAllowance +
                (wizHasExtraAllowance ? wizPositionAllowance + wizOtherAllowance : 0) +
                (wizHasNonCompete ? calculatedNonCompeteAmount : 0)
              ).toLocaleString()}
              원
            </span>
          </div>

          {/* 비율제(commission) 시 비교 지급 강조 안내 뱃지 */}
          {isCommission && (
            <div className="border-custom-indigo-border/80 bg-custom-indigo-bg/60 text-11 text-custom-indigo mt-2.5 rounded-xl border p-2.5">
              <p className="leading-relaxed font-bold">
                * <strong>비율제(수수료 {wizCommissionRate || 20}%)</strong> 정산 시: 매월{' '}
                <span className="underline underline-offset-2">
                  수강료 매출의 {wizCommissionRate || 20}% 비율 정산액
                </span>
                과 <span className="underline underline-offset-2">최종 월 약정 총 지급액</span> 중{' '}
                <strong className="font-black underline">더 높은 금액</strong>을 최종 지급합니다.
              </p>
            </div>
          )}
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
              ? 'border-custom-rose-border bg-custom-rose-bg text-custom-rose cursor-not-allowed opacity-80'
              : 'border-custom-slate-border text-text-title bg-background hover:bg-custom-slate-bg cursor-pointer active:scale-[0.99]',
          )}
        >
          <span>
            {!isMinWagePassed ? '최저임금 미달로 설정 완료 불가' : '급여 및 수당 설정 완료'}
          </span>
          {isMinWagePassed && <ArrowRight className="text-text-side h-3.5 w-3.5" />}
        </button>
      </footer>
    </div>
  );
}
