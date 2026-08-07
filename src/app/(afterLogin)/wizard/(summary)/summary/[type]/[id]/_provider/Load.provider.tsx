'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useContractDetailState } from '@/app/(afterLogin)/cabinet/_state/getContractDetail.state';
import { getPreviousContract } from '@/app/(afterLogin)/wizard/(standard)/step1/_lib/getPreviousContract';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { DaysConfig } from '@/app/_template/ContractDocument.template';

const DAY_KEY_MAP: Record<string, string> = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
};

const SALARY_TYPE_MAP: Record<string, 'monthly' | 'commission' | 'hourly'> = {
  FIXED: 'monthly',
  MONTHLY: 'monthly',
  HOURLY: 'hourly',
  PERCENT: 'commission',
  RATIO: 'commission',
  COMMISSION: 'commission',
};

export default function LoadProvider({ children }: { children: React.ReactNode }) {
  const params = useParams<{ type?: string; id?: string }>();
  const isLoadType = params?.type === 'load';
  const targetId = Number(params?.id);

  // 1. If type === 'load', fetch previous contract by staffId
  const { data: previousData, isLoading: isPreviousLoading } = useQuery({
    queryKey: ['previousContract', targetId],
    queryFn: () => getPreviousContract(targetId),
    enabled: isLoadType && Boolean(targetId),
  });

  // 2. Otherwise fetch contract detail by contractId
  const { contractDetail: detailData, isLoading: isDetailLoading } = useContractDetailState(
    isLoadType ? 0 : targetId,
  );

  const targetData = isLoadType ? previousData : detailData;
  const isLoading = isLoadType ? isPreviousLoading : isDetailLoading;

  const setStep1 = useWizardStore((state) => state.setStep1);
  const setStep2 = useWizardStore((state) => state.setStep2);
  const setStep3 = useWizardStore((state) => state.setStep3);

  useEffect(() => {
    if (!targetData) return;

    // 1. Populate Step 1
    setStep1({
      selectedStaffId: targetData.staffId,
      instructorName: targetData.pendingStaffName,
      instructorPhone: targetData.pendingStaffPhone,
      instructorSubject: targetData.pendingStaffSubject,
      instructorBirth: targetData.pendingStaffBirthDate,
      instructorAddress: targetData.pendingStaffAddress,
      contractType:
        targetData.contractType === 'TEACHER' ? '강사근로계약서' : targetData.contractType,
    });

    // 2. Schedule Mapping
    const daysConfig: DaysConfig = {};
    if (targetData.schedule) {
      targetData.schedule.forEach((s) => {
        const dayKey = s.dayOfWeek ? s.dayOfWeek.slice(0, 3).toUpperCase() : '';
        const dayName = DAY_KEY_MAP[dayKey] || s.dayOfWeek;
        daysConfig[dayName] = {
          enabled: s.isEnabled,
          startTime: s.startTime ? s.startTime.slice(0, 5) : '09:00',
          endTime: s.endTime ? s.endTime.slice(0, 5) : '18:00',
          breakTime: `${s.breakMinutes ?? 60}분`,
        };
      });
    }

    const resolvedSalaryType = SALARY_TYPE_MAP[targetData.payType] || 'monthly';
    const maxSalarySubLevel = resolvedSalaryType === 'hourly' ? 3 : 6;

    const rawHolidayDay = (targetData as any).weeklyHolidayDay || 'SUN';
    const resolvedWeeklyHoliday = DAY_KEY_MAP[rawHolidayDay] || rawHolidayDay || '일요일';

    // 3. Populate Step 2
    setStep2({
      wizSubStep: 4,
      maxUnlockedSubStep: 3,
      wizScheduleApplied: true,
      wizSalaryApplied: true,
      wizSalaryDone: true,
      wizSalarySubStep: maxSalarySubLevel as 1 | 2 | 3 | 4 | 5 | 6,
      maxUnlockedSalarySubStep: maxSalarySubLevel as 1 | 2 | 3 | 4 | 5 | 6,
      wizStartDate: targetData.contractStartDate,
      wizEndDate: targetData.contractEndDate,
      wizProbation: targetData.probationPeriodMonths
        ? `${targetData.probationPeriodMonths}개월`
        : '',
      wizDaysConfig: daysConfig,
      wizWeeklyHoliday: resolvedWeeklyHoliday,
      wizSalaryType: resolvedSalaryType,
      wizSalaryAmount: targetData.basePay,
      wizCommissionRate: targetData.ratioPercent,
      wizHourlyRate: targetData.hourlyRate,
      wizMinGuaranteeAmount: targetData.minGuaranteedAmount,
      wizPayDay: targetData.paymentDay ? `${targetData.paymentDay}일` : '',
      wizHasTaxFree: (targetData.nonTaxableMealAllowance || 0) > 0,
      wizNonTaxFood: targetData.nonTaxableMealAllowance,
      wizHasExtraAllowance: targetData.additionalAllowanceEnabled,
      wizOvertimeAllowance: targetData.overtimeAllowance,
      wizPositionAllowance: targetData.positionAllowance,
      wizOtherAllowance: targetData.otherAllowance,
      wizOtherAllowanceName: targetData.otherAllowanceLabel,
      wizHasNonCompete: targetData.nonCompeteAgreed,
      wizNonCompetePeriod: targetData.nonCompetePeriodMonths
        ? `${targetData.nonCompetePeriodMonths}개월`
        : '',
      wizNonCompeteRange: targetData.nonCompeteRadiusKm
        ? `반경 ${targetData.nonCompeteRadiusKm}km`
        : '',
      wizNonCompeteAmount: targetData.nonCompeteCompensationAmount,
    });

    // 4. Populate Step 3
    setStep3({
      customTerms: Array.isArray(targetData.specialTerms)
        ? targetData.specialTerms.join('\n')
        : '',
    });
  }, [targetData, setStep1, setStep2, setStep3]);

  if (isLoading && Boolean(targetId)) {
    return (
      <div className="flex items-center justify-center p-12 text-xs font-semibold text-slate-400">
        계약 상세 정보를 불러오는 중...
      </div>
    );
  }

  return <>{children}</>;
}
