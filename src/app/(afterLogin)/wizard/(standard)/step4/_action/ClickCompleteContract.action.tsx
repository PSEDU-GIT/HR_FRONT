'use client';

import { useRouter } from 'next/navigation';
import { Send, Loader2 } from 'lucide-react';
import cx from 'classnames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { useAlert } from '@/app/(afterLogin)/_state/useAlert';
import {
  createTeacherContract,
  type TeacherContractPayload,
} from '@/app/(afterLogin)/wizard/_lib/createTeacherContract';
import { getContractArchiveQueryKey } from '@/app/(afterLogin)/cabinet/_state/getContractArchive.state';
import { getEffectiveNonCompeteAmount } from '@/app/(afterLogin)/wizard/_lib/wageEngine';

interface ClickCompleteContractActionProps {
  className?: string;
}

const DAY_MAP: Record<string, string> = {
  월요일: 'MON',
  화요일: 'TUE',
  수요일: 'WED',
  목요일: 'THU',
  금요일: 'FRI',
  토요일: 'SAT',
  일요일: 'SUN',
  월: 'MON',
  화: 'TUE',
  수: 'WED',
  목: 'THU',
  금: 'FRI',
  토: 'SAT',
  일: 'SUN',
};

export default function ClickCompleteContractAction({
  className,
}: ClickCompleteContractActionProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { handleAlert } = useAlert();

  const { step1, step2, step3, reset } = useWizardStore(
    useShallow((state) => ({
      step1: state.step1,
      step2: state.step2,
      step3: state.step3,
      reset: state.reset,
    })),
  );

  const { mutate: completeContract, isPending } = useMutation({
    mutationFn: createTeacherContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getContractArchiveQueryKey });
      handleAlert({
        type: 'success',
        title: '작성 완료',
        description: '계약서 작성이 성공적으로 완료되었습니다.',
      });
      reset();
      router.push('/cabinet');
    },
    onError: (error: any) => {
      console.error('계약서 작성 완료 실패:', error);
      handleAlert({
        type: 'error',
        title: '오류 발생',
        description: error.message || '계약서 생성 중 오류가 발생했습니다.',
      });
    },
  });

  const handleComplete = () => {
    // 필수 정보 미입력 시 저장 차단
    if (!step1.instructorName?.trim()) {
      handleAlert({
        type: 'warning',
        title: '필수 입력',
        description: '강사 이름을 입력해 주세요.',
      });
      return;
    }
    if (!step1.instructorPhone?.trim()) {
      handleAlert({
        type: 'warning',
        title: '필수 입력',
        description: '연락처를 입력해 주세요.',
      });
      return;
    }
    if (!step1.instructorSubject?.trim()) {
      handleAlert({
        type: 'warning',
        title: '필수 입력',
        description: '담당 과목을 입력해 주세요.',
      });
      return;
    }
    if (!step1.instructorBirth?.trim()) {
      handleAlert({
        type: 'warning',
        title: '필수 입력',
        description: '생년월일을 입력해 주세요.',
      });
      return;
    }

    const payTypeMap: Record<string, string> = {
      monthly: 'FIXED',
      commission: 'PERCENT',
      hourly: 'HOURLY',
    };

    const schedulePayload = Object.entries(step2.wizDaysConfig || {})
      .filter(([_, val]) => val.enabled)
      .map(([dayKey, val]) => ({
        dayOfWeek: DAY_MAP[dayKey] || dayKey,
        isEnabled: true,
        startTime: `${val.startTime}:00`,
        endTime: `${val.endTime}:00`,
        breakMinutes: parseInt(val.breakTime) || 0,
      }));

    const payloadInstructorInfo = {
      pendingStaffName: step1.instructorName,
      pendingStaffPhone: step1.instructorPhone?.replace(/-/g, ''),
      pendingStaffSubject: step1.instructorSubject,
      pendingStaffBirthDate: step1.instructorBirth,
      pendingStaffAddress: step1.instructorAddress,
    };

    const payload: TeacherContractPayload = {
      ...payloadInstructorInfo,
      payType: payTypeMap[step2.wizSalaryType],
      basePay: step2.wizSalaryAmount,
      ratioPercent: step2.wizCommissionRate,
      hourlyRate: step2.wizHourlyRate,
      weeklyWorkHours: 20,
      weeklyHolidayDay: DAY_MAP[step2.wizWeeklyHoliday] || step2.wizWeeklyHoliday || 'SUN',
      specialTerms: step3.customTerms ? step3.customTerms.split('\n').filter(Boolean) : [],
      schedule: schedulePayload,
      contractStartDate: step2.wizStartDate,
      contractEndDate: step2.wizEndDate,
      probationPeriodMonths: parseInt(step2.wizProbation) || 0,
      minGuaranteedAmount: step2.wizMinGuaranteeAmount,
      paymentDay: parseInt(step2.wizPayDay) || 0,
      nonTaxableMealAllowance: step2.wizHasTaxFree ? step2.wizNonTaxFood : 0,
      nonTaxableCarAllowance: 0,
      nonCompeteAgreed: step2.wizHasNonCompete,
      nonCompetePeriodMonths: parseInt(step2.wizNonCompetePeriod) || 0,
      nonCompeteRadiusKm: parseInt(step2.wizNonCompeteRange.replace(/[^0-9]/g, '')) || 0,
      nonCompeteCompensationAmount: getEffectiveNonCompeteAmount({
        hasNonCompete: step2.wizHasNonCompete,
        calcType: step2.wizNonCompeteCalcType,
        percent: step2.wizNonCompetePercent,
        manualAmount: step2.wizNonCompeteAmount,
        salaryType: step2.wizSalaryType,
        salaryAmount: step2.wizSalaryAmount,
        hourlyRate: step2.wizHourlyRate,
        minGuaranteeAmount: step2.wizMinGuaranteeAmount,
      }),
      additionalAllowanceEnabled: step2.wizHasExtraAllowance,
      overtimeAllowance: step2.wizOvertimeAllowance,
      positionAllowance: step2.wizPositionAllowance,
      otherAllowance: step2.wizOtherAllowance,
      otherAllowanceLabel: step2.wizOtherAllowanceName,
    };

    completeContract(payload);
  };

  return (
    <button
      type="button"
      onClick={handleComplete}
      disabled={isPending}
      className={cx(
        'bg-custom-indigo hover:bg-custom-indigo-hover flex cursor-pointer items-center justify-center space-x-1.5 rounded-xl px-4 py-2 text-xs font-black text-white shadow-xs transition-all active:scale-95 disabled:opacity-50',
        className,
      )}
    >
      {isPending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
      <span>{isPending ? '처리 중...' : '계약서 작성 완료'}</span>
    </button>
  );
}
