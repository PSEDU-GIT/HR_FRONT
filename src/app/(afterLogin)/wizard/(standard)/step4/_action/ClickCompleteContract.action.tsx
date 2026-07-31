'use client';

import { useRouter } from 'next/navigation';
import { Send, Loader2 } from 'lucide-react';
import cx from 'classnames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import {
  createTeacherContract,
  type TeacherContractPayload,
} from '@/app/(afterLogin)/wizard/_lib/createTeacherContract';
import { getContractArchiveQueryKey } from '@/app/(afterLogin)/cabinet/_state/getContractArchive.state';

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
};

export default function ClickCompleteContractAction({
  className,
}: ClickCompleteContractActionProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

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
      alert('계약서 작성이 성공적으로 완료되었습니다.');
      reset();
      router.push('/cabinet');
    },
    onError: (error: any) => {
      console.error('계약서 작성 완료 실패:', error);
      alert(error.message || '계약서 생성 중 오류가 발생했습니다.');
    },
  });

  const handleComplete = () => {
    console.log(step1, step2, step3);

    // 필수 정보 미입력 시 저장 차단
    if (!step1.instructorName?.trim()) {
      alert('강사 이름을 입력해 주세요.');
      return;
    }
    if (!step1.instructorPhone?.trim()) {
      alert('연락처를 입력해 주세요.');
      return;
    }
    if (!step1.instructorSubject?.trim()) {
      alert('담당 과목을 입력해 주세요.');
      return;
    }
    if (!step1.instructorBirth?.trim()) {
      alert('생년월일을 입력해 주세요.');
      return;
    }
    if (!step1.instructorAddress?.trim()) {
      alert('주소를 입력해 주세요.');
      return;
    }
    if (!step2.wizStartDate?.trim() || !step2.wizEndDate?.trim()) {
      alert('계약 기간을 설정해 주세요.');
      return;
    }

    const payTypeMap = {
      monthly: 'FIXED',
      commission: 'PERCENT',
      hourly: 'HOURLY',
    };

    const schedulePayload = Object.entries(step2.wizDaysConfig || {}).map(([dayKey, dayVal]) => ({
      dayOfWeek: DAY_MAP[dayKey] || dayKey,
      isEnabled: dayVal.enabled,
      startTime: dayVal.startTime ? `${dayVal.startTime}:00` : '09:00:00',
      endTime: dayVal.endTime ? `${dayVal.endTime}:00` : '18:00:00',
      breakMinutes: parseInt(dayVal.breakTime) || 60,
    }));

    const payloadInstructorInfo = {
      pendingStaffName: step1.instructorName,
      pendingStaffPhone: step1.instructorPhone?.replace(/-/g, ''),
      pendingStaffSubject: step1.instructorSubject,
      pendingStaffBirthDate: step1.instructorBirth,
      pendingStaffAddress: step1.instructorAddress,
      pendingStaffGender: step1.instructorGender || undefined,
    };

    const payload: TeacherContractPayload = {
      ...payloadInstructorInfo,
      payType: payTypeMap[step2.wizSalaryType],
      basePay: step2.wizSalaryAmount,
      ratioPercent: step2.wizCommissionRate,
      hourlyRate: step2.wizHourlyRate,
      weeklyWorkHours: 20,
      specialTerms: step3.customTerms ? step3.customTerms.split('\n').filter(Boolean) : [],
      schedule: schedulePayload,
      contractStartDate: step2.wizStartDate,
      contractEndDate: step2.wizEndDate,
      probationPeriodMonths: parseInt(step2.wizProbation) || 0,
      minGuaranteedAmount: step2.wizMinGuaranteeAmount,
      paymentDay: parseInt(step2.wizPayDay) || 0,
      nonTaxableMealAllowance: step2.wizHasTaxFree ? step2.wizNonTaxFood : 0,
      nonTaxableCarAllowance: step2.wizHasCarAllowance ? step2.wizNonTaxCar : 0,
      nonCompeteAgreed: step2.wizHasNonCompete,
      nonCompetePeriodMonths: parseInt(step2.wizNonCompetePeriod) || 0,
      nonCompeteRadiusKm: parseInt(step2.wizNonCompeteRange.replace(/[^0-9]/g, '')) || 0,
      nonCompeteCompensationAmount: step2.wizNonCompeteAmount,
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
