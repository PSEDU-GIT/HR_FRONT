'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RotateCcw } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { getPreviousContract } from '@/app/(afterLogin)/wizard/step1/_lib/getPreviousContract';

export default function ClickLoadPreviousContractAction() {
  const router = useRouter();
  const { step1, setStep1, setStep2, setStep3 } = useWizardStore(
    useShallow((state) => ({
      step1: state.step1,
      setStep1: state.setStep1,
      setStep2: state.setStep2,
      setStep3: state.setStep3,
    })),
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = async () => {
    if (!step1.selectedStaffId) return;
    setIsLoading(true);

    try {
      const data = await getPreviousContract(step1.selectedStaffId);
      if (!data) return;

      // 1. Step 1 필드 채우기
      setStep1({
        selectedStaffId: data.staffId,
        instructorName: data.pendingStaffName,
        instructorPhone: data.pendingStaffPhone,
        instructorSubject: data.pendingStaffSubject,
        instructorBirth: data.pendingStaffBirthDate,
        instructorAddress: data.pendingStaffAddress,
        instructorGender: data.pendingStaffGender === 'FEMALE' ? 'FEMALE' : 'MALE',
        contractType: data.contractType === 'TEACHER' ? '강사근로계약서' : data.contractType,
      });

      // 2. Step 2 필드 사전 구성 (모든 아코디언 완료/통계 상태로 설정)
      const salaryTypeMap: Record<string, 'monthly' | 'commission' | 'hourly'> = {
        FIXED: 'monthly',
        PERCENT: 'commission',
        HOURLY: 'hourly',
      };

      const resolvedSalaryType = salaryTypeMap[data.payType] || 'monthly';
      const maxSalarySubLevel = resolvedSalaryType === 'hourly' ? 3 : 6;

      setStep2({
        wizSubStep: 4,
        maxUnlockedSubStep: 3,
        wizScheduleApplied: true,
        wizSalaryApplied: true,
        wizSalaryDone: true,
        wizSalarySubStep: maxSalarySubLevel as 1 | 2 | 3 | 4 | 5 | 6,
        maxUnlockedSalarySubStep: maxSalarySubLevel as 1 | 2 | 3 | 4 | 5 | 6,
        wizStartDate: data.contractStartDate,
        wizEndDate: data.contractEndDate,
        wizProbation: data.probationPeriodMonths ? `${data.probationPeriodMonths}개월` : '',
        wizSalaryType: resolvedSalaryType,
        wizSalaryAmount: data.basePay,
        wizCommissionRate: data.ratioPercent,
        wizHourlyRate: data.hourlyRate,
        wizMinGuaranteeAmount: data.minGuaranteedAmount,
        wizPayDay: data.paymentDay ? `${data.paymentDay}일` : '',
        wizHasTaxFree: (data.nonTaxableMealAllowance || 0) > 0,
        wizNonTaxFood: data.nonTaxableMealAllowance,
        wizHasCarAllowance: (data.nonTaxableCarAllowance || 0) > 0,
        wizNonTaxCar: data.nonTaxableCarAllowance,
        wizHasExtraAllowance: data.additionalAllowanceEnabled,
        wizOvertimeAllowance: data.overtimeAllowance,
        wizPositionAllowance: data.positionAllowance,
        wizOtherAllowance: data.otherAllowance,
        wizOtherAllowanceName: data.otherAllowanceLabel,
        wizHasNonCompete: data.nonCompeteAgreed,
        wizNonCompetePeriod: data.nonCompetePeriodMonths
          ? `${data.nonCompetePeriodMonths}개월`
          : '',
        wizNonCompeteRange: data.nonCompeteRadiusKm ? `반경 ${data.nonCompeteRadiusKm}km` : '',
        wizNonCompeteAmount: data.nonCompeteCompensationAmount,
      });

      // 3. Step 3 필드 사전 구성 (특약사항)
      setStep3({
        customTerms: Array.isArray(data.specialTerms) ? data.specialTerms.join('\n') : '',
      });

      // 4. Step 3 페이지로 이동
      router.push('/wizard/step3');
    } catch (error) {
      console.error('이전 계약 조건 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLoad}
      disabled={isLoading}
      className="border-custom-slate-border/80 bg-custom-slate-bg hover:bg-custom-slate-hover text-text-main hover:text-custom-indigo flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all disabled:opacity-50"
    >
      <RotateCcw size={12} className={`shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
      <span>{isLoading ? '불러오는 중...' : '조건 불러오기'}</span>
    </button>
  );
}
