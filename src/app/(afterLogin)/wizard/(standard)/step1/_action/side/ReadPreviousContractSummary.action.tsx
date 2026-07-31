'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { getPreviousContract } from '@/app/(afterLogin)/wizard/(standard)/step1/_lib/getPreviousContract';

export default function ReadPreviousContractSummaryAction() {
  const router = useRouter();
  const { step1, setStep1, setStep2, setStep3 } = useWizardStore(
    useShallow((state) => ({
      step1: state.step1,
      setStep1: state.setStep1,
      setStep2: state.setStep2,
      setStep3: state.setStep3,
    })),
  );

  const { data: previousContract, isPending } = useQuery({
    queryKey: ['previousContract', step1.selectedStaffId],
    queryFn: () => getPreviousContract(step1.selectedStaffId),
    enabled: !!step1.selectedStaffId && !!step1.hasContractHistory,
  });

  const handleCardClick = () => {
    if (!previousContract) return;
    setStep1({
      selectedStaffId: previousContract.staffId,
      instructorName: previousContract.pendingStaffName,
      instructorPhone: previousContract.pendingStaffPhone,
      instructorSubject: previousContract.pendingStaffSubject,
      instructorBirth: previousContract.pendingStaffBirthDate,
      instructorAddress: previousContract.pendingStaffAddress,
      instructorGender: previousContract.pendingStaffGender === 'FEMALE' ? 'FEMALE' : 'MALE',
      contractType: previousContract.contractType === 'TEACHER' ? '강사근로계약서' : previousContract.contractType,
    });

    const salaryTypeMap: Record<string, 'monthly' | 'commission' | 'hourly'> = {
      FIXED: 'monthly',
      PERCENT: 'commission',
      HOURLY: 'hourly',
    };

    const resolvedSalaryType = salaryTypeMap[previousContract.payType] || 'monthly';
    const maxSalarySubLevel = resolvedSalaryType === 'hourly' ? 3 : 6;

    setStep2({
      wizSubStep: 4,
      maxUnlockedSubStep: 3,
      wizScheduleApplied: true,
      wizSalaryApplied: true,
      wizSalaryDone: true,
      wizSalarySubStep: maxSalarySubLevel as 1 | 2 | 3 | 4 | 5 | 6,
      maxUnlockedSalarySubStep: maxSalarySubLevel as 1 | 2 | 3 | 4 | 5 | 6,
      wizStartDate: previousContract.contractStartDate,
      wizEndDate: previousContract.contractEndDate,
      wizProbation: previousContract.probationPeriodMonths ? `${previousContract.probationPeriodMonths}개월` : '',
      wizSalaryType: resolvedSalaryType,
      wizSalaryAmount: previousContract.basePay,
      wizCommissionRate: previousContract.ratioPercent,
      wizHourlyRate: previousContract.hourlyRate,
      wizMinGuaranteeAmount: previousContract.minGuaranteedAmount,
      wizPayDay: previousContract.paymentDay ? `${previousContract.paymentDay}일` : '',
      wizHasTaxFree: (previousContract.nonTaxableMealAllowance || 0) > 0,
      wizNonTaxFood: previousContract.nonTaxableMealAllowance,
      wizHasCarAllowance: (previousContract.nonTaxableCarAllowance || 0) > 0,
      wizNonTaxCar: previousContract.nonTaxableCarAllowance,
      wizHasExtraAllowance: previousContract.additionalAllowanceEnabled,
      wizOvertimeAllowance: previousContract.overtimeAllowance,
      wizPositionAllowance: previousContract.positionAllowance,
      wizOtherAllowance: previousContract.otherAllowance,
      wizOtherAllowanceName: previousContract.otherAllowanceLabel,
      wizHasNonCompete: previousContract.nonCompeteAgreed,
      wizNonCompetePeriod: previousContract.nonCompetePeriodMonths
        ? `${previousContract.nonCompetePeriodMonths}개월`
        : '',
      wizNonCompeteRange: previousContract.nonCompeteRadiusKm ? `반경 ${previousContract.nonCompeteRadiusKm}km` : '',
      wizNonCompeteAmount: previousContract.nonCompeteCompensationAmount,
    });

    setStep3({
      customTerms: Array.isArray(previousContract.specialTerms) ? previousContract.specialTerms.join('\n') : '',
    });

    router.push('/wizard/summary');
  };

  if (isPending) {
    return (
      <div className="border-custom-slate-border bg-custom-slate-bg/30 text-text-side rounded-2xl border p-4 text-center text-xs font-medium animate-pulse">
        이전 계약 정보를 불러오는 중...
      </div>
    );
  }

  const name = previousContract?.pendingStaffName || step1.instructorName || '강사';
  const contractTitle = `${name} 강사 임용 근로계약서`;
  const contractType =
    previousContract?.contractType === 'TEACHER' ? '강사근로계약서' : previousContract?.contractType || '강사근로계약서';

  let salaryText = '-';
  if (previousContract) {
    if (previousContract.payType === 'FIXED') {
      salaryText = `월급 ${previousContract.basePay?.toLocaleString() ?? 0}원`;
    } else if (previousContract.payType === 'PERCENT') {
      salaryText = `비율제 ${previousContract.ratioPercent ?? 0}%`;
    } else if (previousContract.payType === 'HOURLY') {
      salaryText = `시급 ${previousContract.hourlyRate?.toLocaleString() ?? 0}원`;
    } else if (previousContract.basePay) {
      salaryText = `월급 ${previousContract.basePay.toLocaleString()}원`;
    }
  }

  const periodText =
    previousContract?.contractStartDate && previousContract?.contractEndDate
      ? `${previousContract.contractStartDate} ~ ${previousContract.contractEndDate}`
      : '-';

  return (
    <div
      onClick={handleCardClick}
      className="border-custom-slate-border bg-custom-slate-bg/50 hover:bg-indigo-50/50 hover:border-indigo-200 cursor-pointer space-y-2.5 rounded-2xl border p-4 text-xs transition-all group"
    >
      <div className="flex justify-between items-center gap-2">
        <span className="text-text-side font-semibold shrink-0">계약서 명칭</span>
        <span className="text-text-title group-hover:text-indigo-600 font-extrabold truncate text-right">{contractTitle}</span>
      </div>
      <div className="flex justify-between items-center gap-2">
        <span className="text-text-side font-semibold shrink-0">계약 유형</span>
        <span className="text-text-title font-extrabold truncate text-right">{contractType}</span>
      </div>
      <div className="flex justify-between items-center gap-2">
        <span className="text-text-side font-semibold shrink-0">급여 조건</span>
        <span className="text-text-title font-extrabold truncate text-right">{salaryText}</span>
      </div>
      <div className="flex justify-between items-center gap-2">
        <span className="text-text-side font-semibold shrink-0">계약 기간</span>
        <span className="text-text-title font-extrabold truncate text-right">{periodText}</span>
      </div>
    </div>
  );
}
