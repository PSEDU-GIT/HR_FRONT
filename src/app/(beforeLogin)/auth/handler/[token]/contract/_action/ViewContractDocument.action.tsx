'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2, AlertCircle } from 'lucide-react';
import { getContractByToken } from '../_lib/getContractByToken';
import ContractDocumentTemplate from '@/app/_template/ContractDocument.template';

interface ViewContractDocumentActionProps {
  token: string;
  name: string;
  phone: string;
}

export default function ViewContractDocumentAction({
  token,
  name,
  phone,
}: ViewContractDocumentActionProps) {
  const {
    data: contractRes,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ['get-contract', token],
    queryFn: () => getContractByToken(token),
    enabled: !!token,
  });

  const contractData = contractRes?.data;
  const errorMessage = queryError ? (queryError as Error).message : null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 py-16">
        <Loader2 className="text-text-side h-5 w-5 animate-spin" />
        <p className="text-text-side text-xs font-normal">계약 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="border-custom-danger-border bg-custom-danger-bg space-y-2 rounded-lg border p-4 text-center dark:border-rose-950 dark:bg-rose-950/30">
        <AlertCircle className="text-custom-danger mx-auto h-6 w-6" />
        <p className="text-custom-danger text-xs font-bold dark:text-rose-300">{errorMessage}</p>
      </div>
    );
  }

  return (
    <ContractDocumentTemplate
      instructorName={name || contractData?.teacherName || '강사'}
      instructorPhone={phone || contractData?.teacherPhone || '-'}
      instructorSubject={contractData?.subject || '미지정'}
      instructorAddress={contractData?.address || '서울특별시'}
      wizStartDate={contractData?.startDate || '2026-08-01'}
      wizEndDate={contractData?.endDate || '2027-07-31'}
      wizProbation={contractData?.probation || '3개월'}
      wizSalaryType={
        contractData?.payType === 'HOURLY'
          ? 'hourly'
          : contractData?.payType === 'RATIO' || contractData?.payType === 'PERCENT'
            ? 'commission'
            : 'monthly'
      }
      wizSalaryAmount={contractData?.basePay || 2500000}
      wizHourlyRate={contractData?.hourlyRate || 10320}
      wizCommissionRate={contractData?.ratioPercent || 20}
      wizPayDay={contractData?.paymentDay ? `${contractData.paymentDay}일` : '10일'}
      customTerms={contractData?.specialTerms?.join('\n') || '특약사항 없음'}
      showPrintStyles={false}
    />
  );
}
