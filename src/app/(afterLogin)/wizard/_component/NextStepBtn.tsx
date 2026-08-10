'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight, RotateCcw } from 'lucide-react';
import cx from 'classnames';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { useAlert } from '@/app/(afterLogin)/_state/useAlert';
import { calculateScheduleHours, calculateWageEngine, getEffectiveNonCompeteAmount } from '@/app/(afterLogin)/wizard/_lib/wageEngine';

interface NextStepBtnProps {
  className?: string;
  disabled?: boolean;
}

export default function NextStepBtn({ className, disabled }: NextStepBtnProps) {
  const pathname = usePathname();
  const router = useRouter();
  const step1 = useWizardStore((state) => state.step1);
  const step2 = useWizardStore((state) => state.step2);
  const reset = useWizardStore((state) => state.reset);
  const { handleAlert } = useAlert();

  const getActiveStep = () => {
    if (pathname.includes('/step4')) return 4;
    if (pathname.includes('/summary')) return 3;
    if (pathname.includes('/step3')) return 3;
    if (pathname.includes('/step2')) return 2;
    return 1;
  };

  const activeStep = getActiveStep();

  const getNextStepPath = () => {
    if (pathname.includes('/summary') && !pathname.includes('/preview')) {
      return `${pathname}/preview`;
    }
    if (activeStep === 1) return '/wizard/step2';
    if (activeStep === 2) return '/wizard/step3';
    if (activeStep === 3) return '/wizard/step4';
    return '/dashboard';
  };

  const checkStep1Validation = () => {
    if (!step1.isNewInstructor && !step1.selectedStaffId) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '등록된 강사를 선택해 주세요.',
      });
      return false;
    }

    if (!step1.instructorName?.trim()) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '강사 이름을 입력해 주세요.',
      });
      return false;
    }

    if (!step1.instructorPhone?.trim()) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '연락처를 입력해 주세요.',
      });
      return false;
    }

    if (!step1.instructorSubject?.trim()) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '담당 과목을 입력해 주세요.',
      });
      return false;
    }

    if (!step1.instructorBirth?.trim()) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '생년월일을 입력해 주세요.',
      });
      return false;
    }

    if (!step1.instructorAddress?.trim()) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '주소를 입력해 주세요.',
      });
      return false;
    }

    return true;
  };

  const checkStep2Validation = () => {
    if (step2.maxUnlockedSubStep < 2) {
      handleAlert({
        type: 'warning',
        title: '근무/급여 설정 필요',
        description: '계약 기간 및 수습 설정을 완료해 주세요.',
      });
      return false;
    }

    if (step2.maxUnlockedSubStep < 3) {
      handleAlert({
        type: 'warning',
        title: '근무/급여 설정 필요',
        description: '근무 요일 및 소정근로시간 설정을 완료해 주세요.',
      });
      return false;
    }

    // 1) 유급주휴일 미지정 위험 검사
    const hasNoWeeklyHoliday =
      !step2.wizWeeklyHoliday || step2.wizDaysConfig[step2.wizWeeklyHoliday]?.enabled === true;
    if (hasNoWeeklyHoliday) {
      handleAlert({
        type: 'warning',
        title: '유급주휴일 미지정 위험',
        description: '유급주휴일이 지정되지 않았거나 근무일과 중복됩니다. OFF 요일을 주휴일로 지정해 주세요.',
      });
      return false;
    }

    // 2) 주 52시간 상한 초과 위험 검사 (5인 이상 사업장)
    const isUnder5 = step1.contractType?.includes('5인 미만') || step1.contractType?.includes('5인 이하');
    const { weeklyHours, weeklyOvertimeHours, weeklyNightHours } = calculateScheduleHours(step2.wizDaysConfig);
    if (!isUnder5 && weeklyHours > 52) {
      handleAlert({
        type: 'warning',
        title: '주 52시간 상한 초과 위험',
        description: '주 52시간 상한을 초과하여 근로기준법을 위반합니다. 근무시간을 조정해 주세요.',
      });
      return false;
    }

    // 3) 최저임금 미달 위험 검사
    const calculatedNonCompeteAmount = getEffectiveNonCompeteAmount({
      hasNonCompete: step2.wizHasNonCompete,
      calcType: step2.wizNonCompeteCalcType,
      percent: step2.wizNonCompetePercent,
      manualAmount: step2.wizNonCompeteAmount,
      salaryType: step2.wizSalaryType,
      salaryAmount: step2.wizSalaryAmount,
      hourlyRate: step2.wizHourlyRate,
      minGuaranteeAmount: step2.wizMinGuaranteeAmount,
    });

    const wageResult = calculateWageEngine({
      salaryType: step2.wizSalaryType,
      salaryAmount: step2.wizSalaryAmount,
      hourlyRate: step2.wizHourlyRate,
      commissionRate: step2.wizCommissionRate,
      minGuaranteeAmount: step2.wizMinGuaranteeAmount,
      mealAllowance: step2.wizHasTaxFree ? step2.wizNonTaxFood : 0,
      positionAllowance: step2.wizHasExtraAllowance ? step2.wizPositionAllowance : 0,
      overtimeAllowance: step2.wizHasExtraAllowance ? step2.wizOvertimeAllowance : 0,
      otherAllowance: step2.wizHasExtraAllowance ? step2.wizOtherAllowance : 0,
      nonCompeteAmount: step2.wizHasNonCompete ? calculatedNonCompeteAmount : 0,
      weeklyHours,
      weeklyOvertimeHours,
      weeklyNightHours,
      employeeCount: isUnder5 ? 4 : 5,
    });

    if (!wageResult.isMinWagePassed) {
      handleAlert({
        type: 'warning',
        title: '최저임금 미달 위험',
        description: '설정된 급여 조건이 2026년 법정 최저임금(10,320원/h) 미달입니다. 급여 또는 근무시간을 수정해 주세요.',
      });
      return false;
    }

    if (!step2.wizSalaryDone) {
      handleAlert({
        type: 'warning',
        title: '근무/급여 설정 필요',
        description: '급여 및 수당 설정 완료를 완료해 주세요.',
      });
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      const isValid = checkStep1Validation();
      if (!isValid) return;
    }

    if (activeStep === 2) {
      const isValid = checkStep2Validation();
      if (!isValid) return;
    }

    router.push(getNextStepPath());
  };

  const handleReset = () => {
    reset();
    handleAlert({
      type: 'info',
      title: '초기화 완료',
      description: '모든 입력 항목이 초기 설정값으로 리셋되었습니다.',
    });
  };

  return (
    <div
      className={cx(
        'flex items-center gap-2',
        className ? className : 'absolute top-[14px] right-0',
      )}
    >
      {activeStep === 1 && (
        <button
          type="button"
          onClick={handleReset}
          className="flex h-9 cursor-pointer items-center justify-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-black text-slate-700 shadow-2xs transition-all duration-200 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <RotateCcw size={14} className="text-slate-500 dark:text-slate-400" />
          <span>초기화</span>
        </button>
      )}

      <button
        type="button"
        onClick={handleNextStep}
        disabled={disabled}
        className="flex h-9 w-48 cursor-pointer items-center justify-center space-x-1 rounded-xl bg-slate-900 px-4 text-xs font-black text-white shadow-sm transition-all duration-200 hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
      >
        <span>{activeStep === 4 ? '작성 완료' : '다음 단계로'}</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
