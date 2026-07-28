'use client';

import { useQuery } from '@tanstack/react-query';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { getPreviousContract } from '@/app/(afterLogin)/wizard/step1/_lib/getPreviousContract';

export default function ReadPreviousContractSummaryAction() {
  const step1 = useWizardStore((state) => state.step1);

  const { data: previousContract, isPending } = useQuery({
    queryKey: ['previousContract', step1.selectedStaffId],
    queryFn: () => getPreviousContract(step1.selectedStaffId),
    enabled: !!step1.selectedStaffId && !!step1.hasContractHistory,
  });

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
    <div className="border-custom-slate-border bg-custom-slate-bg/50 space-y-2.5 rounded-2xl border p-4 text-xs">
      <div className="flex justify-between items-center gap-2">
        <span className="text-text-side font-semibold shrink-0">계약서 명칭</span>
        <span className="text-text-title font-extrabold truncate text-right">{contractTitle}</span>
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
