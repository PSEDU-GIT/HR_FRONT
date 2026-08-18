'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { getPreviousContract } from '@/app/(afterLogin)/wizard/(standard)/step1/_lib/getPreviousContract';

export default function ReadPreviousContractSummaryAction() {
  const router = useRouter();
  const step1 = useWizardStore((state) => state.step1);

  const { data: previousContract, isPending } = useQuery({
    queryKey: ['previousContract', step1.selectedStaffId],
    queryFn: () => getPreviousContract(step1.selectedStaffId),
    enabled: !!step1.selectedStaffId && !!step1.hasContractHistory,
  });

  const handleCardClick = () => {
    if (!previousContract) return;
    router.push(`/wizard/summary/load/${previousContract.staffId}`);
  };

  if (isPending) {
    return (
      <div className="border-custom-slate-border bg-custom-slate-bg/30 text-text-side animate-pulse rounded-2xl border p-4 text-center text-xs font-medium">
        이전 계약 정보를 불러오는 중...
      </div>
    );
  }

  const name = previousContract?.pendingStaffName || step1.instructorName || '강사';
  const contractTitle = `${name} 강사 임용 근로계약서`;
  const contractType =
    previousContract?.contractType === 'TEACHER'
      ? '강사근로계약서'
      : previousContract?.contractType || '강사근로계약서';

  let salaryText = '-';
  if (previousContract) {
    if (previousContract.payType === 'FIXED') {
      salaryText = `월급 ${previousContract.basePay?.toLocaleString() ?? 0}원`;
    } else if (previousContract.payType === 'RATIO' || previousContract.payType === 'PERCENT') {
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
      className="border-custom-slate-border bg-custom-slate-bg/50 group cursor-pointer space-y-2.5 rounded-2xl border p-4 text-xs transition-all hover:border-indigo-200 hover:bg-indigo-50/50"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-text-side shrink-0 font-semibold">계약서 명칭</span>
        <span className="text-text-title truncate text-right font-extrabold group-hover:text-indigo-600">
          {contractTitle}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-text-side shrink-0 font-semibold">계약 유형</span>
        <span className="text-text-title truncate text-right font-extrabold">{contractType}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-text-side shrink-0 font-semibold">급여 조건</span>
        <span className="text-text-title truncate text-right font-extrabold">{salaryText}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-text-side shrink-0 font-semibold">계약 기간</span>
        <span className="text-text-title truncate text-right font-extrabold">{periodText}</span>
      </div>
    </div>
  );
}
