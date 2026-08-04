import ContractDocumentTemplate from '@/app/_template/ContractDocument.template';

interface ContractDocumentAreaProps {
  name: string;
  phone: string;
  contractData?: any;
}

export default function ContractDocumentArea({
  name,
  phone,
  contractData,
}: ContractDocumentAreaProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-text-title text-xs font-bold dark:text-slate-100">
        계약서 전문
      </h2>

      <div className="border-custom-slate-border overflow-hidden rounded-lg border bg-white dark:border-slate-800 dark:bg-slate-900">
        <ContractDocumentTemplate
          instructorName={name || contractData?.teacherName || '강사'}
          instructorPhone={phone || contractData?.teacherPhone || '-'}
          instructorSubject={contractData?.subject || '미지정'}
          instructorAddress={contractData?.address || '서울특별시'}
          wizStartDate={contractData?.startDate || '2026-08-01'}
          wizEndDate={contractData?.endDate || '2027-07-31'}
          wizProbation={contractData?.probation || '3개월'}
          wizSalaryType={contractData?.payType === 'HOURLY' ? 'hourly' : contractData?.payType === 'PERCENT' ? 'commission' : 'monthly'}
          wizSalaryAmount={contractData?.basePay || 2500000}
          wizHourlyRate={contractData?.hourlyRate || 10320}
          wizCommissionRate={contractData?.ratioPercent || 20}
          wizPayDay={contractData?.paymentDay ? `${contractData.paymentDay}일` : '10일'}
          customTerms={contractData?.specialTerms?.join('\n') || '특약사항 없음'}
          showPrintStyles={false}
        />
      </div>
    </div>
  );
}
