'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { useAcademyPartyInfoState } from '@/app/(afterLogin)/_state/getAcademyPartyInfo.state';
import {
  MAX_SALARY_AMOUNT,
  numberToKorean,
} from '@/app/(afterLogin)/wizard/(standard)/step2/_state/salaryUtils';
import {
  calculateScheduleHours,
  getEffectiveNonCompeteAmount,
  LEGAL_STANDARDS,
} from '@/app/(afterLogin)/wizard/_lib/wageEngine';

export default function FormMonthlySalaryAction() {
  const {
    wizSalaryAmount,
    wizDaysConfig,
    wizHasNonCompete,
    wizNonCompeteAmount,
    wizNonCompeteCalcType,
    wizNonCompetePercent,
    wizHasExtraAllowance,
    wizOvertimeAllowance,
    wizPositionAllowance,
    wizOtherAllowance,
    contractType,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizSalaryAmount: state.step2.wizSalaryAmount,
      wizDaysConfig: state.step2.wizDaysConfig,
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
      wizNonCompeteCalcType: state.step2.wizNonCompeteCalcType || 'percent',
      wizNonCompetePercent: state.step2.wizNonCompetePercent ?? 10,
      wizHasExtraAllowance: state.step2.wizHasExtraAllowance,
      wizOvertimeAllowance: state.step2.wizOvertimeAllowance,
      wizPositionAllowance: state.step2.wizPositionAllowance,
      wizOtherAllowance: state.step2.wizOtherAllowance,
      contractType: state.step1.contractType,
      setStep2: state.setStep2,
    })),
  );

  const { weeklyHours, weeklyOvertimeHours } = calculateScheduleHours(wizDaysConfig);
  const cappedWeeklyHours = Math.min(weeklyHours, LEGAL_STANDARDS.MAX_WEEKLY_HOURS);
  const weeklyHolidayHours = Math.min(
    LEGAL_STANDARDS.STANDARD_DAILY_HOURS,
    cappedWeeklyHours >= LEGAL_STANDARDS.WEEKLY_HOLIDAY_THRESHOLD
      ? (cappedWeeklyHours / LEGAL_STANDARDS.STANDARD_WEEKLY_HOURS) *
          LEGAL_STANDARDS.STANDARD_DAILY_HOURS
      : 0,
  );
  const monthlyWorkHours = cappedWeeklyHours * LEGAL_STANDARDS.WEEKS_PER_MONTH;
  const monthlyHolidayHours = weeklyHolidayHours * LEGAL_STANDARDS.WEEKS_PER_MONTH;

  // 1) 기본급 (소정시간 * 10,320원) -> 10원 단위 올림 (1,793,616원 -> 1,793,620원)
  const baseSalaryPayRaw = monthlyWorkHours * LEGAL_STANDARDS.MIN_HOURLY_WAGE;
  const baseSalaryPay = Math.ceil(baseSalaryPayRaw / 10) * 10;

  // 2) 주휴수당 (주휴시간 * 10,320원) -> 10원 단위 올림
  const weeklyHolidayPayRaw = monthlyHolidayHours * LEGAL_STANDARDS.MIN_HOURLY_WAGE;
  const weeklyHolidayPay = Math.ceil(weeklyHolidayPayRaw / 10) * 10;

  const pureMinOrdinaryPool = baseSalaryPay + weeklyHolidayPay;

  const { academyInfo } = useAcademyPartyInfoState();
  const count = academyInfo?.employedStaffCount;
  const isUnder5 =
    (count !== undefined && count < 5) ||
    contractType?.includes('5인 미만') ||
    contractType?.includes('5인 이하');
  const overtimeRateFinal = isUnder5 ? 1.0 : 1.5;
  const monthlyOvertimeHours =
    weeklyOvertimeHours > 0
      ? weeklyOvertimeHours * overtimeRateFinal * LEGAL_STANDARDS.WEEKS_PER_MONTH
      : 0;
  const minOvertimeAllowance =
    monthlyOvertimeHours > 0
      ? Math.ceil(monthlyOvertimeHours * LEGAL_STANDARDS.MIN_HOURLY_WAGE)
      : wizHasExtraAllowance
        ? wizOvertimeAllowance || 0
        : 0;

  // 직책수당, 기타수당, 연장수당, 수동 경업금지 (식대는 통상임금 산정에 포함)
  const fixedAdditions =
    (wizHasExtraAllowance ? (wizPositionAllowance || 0) + (wizOtherAllowance || 0) : 0) +
    minOvertimeAllowance +
    (wizHasNonCompete && wizNonCompeteCalcType === 'manual' ? wizNonCompeteAmount || 0 : 0);

  const requiredGrossBeforeNonCompete = pureMinOrdinaryPool + fixedAdditions;

  let rawMinSalary = requiredGrossBeforeNonCompete;
  if (wizHasNonCompete && wizNonCompeteCalcType === 'percent') {
    const P = (wizNonCompetePercent ?? 10) / 100;
    if (P < 1) {
      rawMinSalary = Math.ceil(requiredGrossBeforeNonCompete / (1 - P));
    }
  }

  // 최저임금(10,320원/h) 충족 최소 월 약정 금액
  const minRequiredStandardSalary = Math.ceil(rawMinSalary / 10) * 10;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > MAX_SALARY_AMOUNT) {
      num = MAX_SALARY_AMOUNT;
    }
    const updatedNonCompete = getEffectiveNonCompeteAmount({
      hasNonCompete: wizHasNonCompete,
      calcType: wizNonCompeteCalcType,
      percent: wizNonCompetePercent,
      manualAmount: wizNonCompeteAmount,
      salaryType: 'monthly',
      salaryAmount: num,
    });
    setStep2({
      wizSalaryAmount: num,
      wizNonCompeteAmount: updatedNonCompete,
    });
  };

  const koreanText = numberToKorean(wizSalaryAmount);

  return (
    <div className="space-y-2 pt-4">
      <div className="relative">
        {koreanText && (
          <span className="text-text-side absolute -top-5 right-1 text-11 font-bold">
            {koreanText}
          </span>
        )}
        <input
          type="text"
          value={wizSalaryAmount === 0 ? '' : wizSalaryAmount.toLocaleString()}
          onChange={handleAmountChange}
          placeholder="예: 2,500,000"
        />
        <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold">
          원
        </span>
      </div>

      <p className="text-custom-indigo px-1 text-11 leading-relaxed font-semibold">
        * 설정하신 소정근로시간(주 {cappedWeeklyHours}시간, 연장 제외) 기준, 최소{' '}
        <strong className="font-bold underline">
          {minRequiredStandardSalary.toLocaleString()}원
        </strong>{' '}
        이상 입력해야 최저임금법(10,320원/h) 미달에 걸리지 않습니다.
      </p>
    </div>
  );
}
