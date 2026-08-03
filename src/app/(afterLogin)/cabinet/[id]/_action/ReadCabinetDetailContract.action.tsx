'use client';

import { useParams } from 'next/navigation';
import ContractDocumentTemplate, { DaysConfig } from '@/app/_template/ContractDocument.template';
import { useContractDetailState } from '@/app/(afterLogin)/cabinet/_state/getContractDetail.state';
import { formatPhoneNumber } from '@/app/util/formatPhoneNumber.util';

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

export default function ReadCabinetDetailContractAction() {
  const params = useParams<{ id: string }>();
  const contractId = Number(params?.id) || 1;

  const { contractDetail, isLoading, isError } = useContractDetailState(contractId);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-slate-400">
        <span className="text-xs font-semibold">계약서 상세 정보를 불러오는 중...</span>
      </div>
    );
  }

  if (isError || !contractDetail) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-slate-400">
        <span className="text-xs font-semibold">계약서 상세 정보를 불러오지 못했습니다.</span>
      </div>
    );
  }

  const daysConfig: DaysConfig = {};
  if (contractDetail.schedule) {
    contractDetail.schedule.forEach((s) => {
      const dayName = DAY_KEY_MAP[s.dayOfWeek] || s.dayOfWeek;
      daysConfig[dayName] = {
        enabled: s.isEnabled,
        startTime: s.startTime ? s.startTime.slice(0, 5) : '09:00',
        endTime: s.endTime ? s.endTime.slice(0, 5) : '18:00',
        breakTime: `${s.breakMinutes}분`,
      };
    });
  }

  const salaryType = SALARY_TYPE_MAP[contractDetail.payType] || 'monthly';
  const customTermsStr = contractDetail.specialTerms?.length
    ? contractDetail.specialTerms.join('\n')
    : '특약사항 없음';

  return (
    <ContractDocumentTemplate
      instructorName={contractDetail.pendingStaffName || '강사명 미지정'}
      instructorPhone={formatPhoneNumber(contractDetail.pendingStaffPhone) || '연락처 미지정'}
      instructorSubject={contractDetail.pendingStaffSubject || '과목 미지정'}
      instructorAddress={contractDetail.pendingStaffAddress || '주소 미지정'}
      wizStartDate={contractDetail.contractStartDate || '시작일 미지정'}
      wizEndDate={contractDetail.contractEndDate || '종료일 미지정'}
      wizProbation={
        contractDetail.probationPeriodMonths
          ? `${contractDetail.probationPeriodMonths}개월`
          : '수습 없음'
      }
      wizDaysConfig={daysConfig}
      wizSalaryType={salaryType}
      wizSalaryAmount={contractDetail.basePay}
      wizHourlyRate={contractDetail.hourlyRate}
      wizCommissionRate={contractDetail.ratioPercent}
      wizMinGuaranteeAmount={contractDetail.minGuaranteedAmount}
      wizPayDay={contractDetail.paymentDay ? `${contractDetail.paymentDay}일` : '10일'}
      customTerms={customTermsStr}
      showPrintStyles={false}
      className="min-h-full border-none shadow-none"
    />
  );
}
