'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import ContractDocumentTemplate from '@/app/_template/ContractDocument.template';

export default function ReadContractDocumentAction() {
  const {
    instructorName,
    instructorPhone,
    instructorSubject,
    instructorAddress,
    wizStartDate,
    wizEndDate,
    wizProbation,
    wizDaysConfig,
    wizSalaryType,
    wizSalaryAmount,
    wizHourlyRate,
    wizCommissionRate,
    wizMinGuaranteeAmount,
    wizPayDay,
    customTerms,
  } = useWizardStore(
    useShallow((state) => ({
      instructorName: state.step1.instructorName || '박서준',
      instructorPhone: state.step1.instructorPhone || '010-8273-0192',
      instructorSubject: state.step1.instructorSubject || '미지정',
      instructorAddress: state.step1.instructorAddress || '미지정',
      wizStartDate: state.step2.wizStartDate || '2026-07-21',
      wizEndDate: state.step2.wizEndDate || '2027-07-20',
      wizProbation: state.step2.wizProbation || '3개월',
      wizDaysConfig: state.step2.wizDaysConfig,
      wizSalaryType: state.step2.wizSalaryType,
      wizSalaryAmount: state.step2.wizSalaryAmount,
      wizHourlyRate: state.step2.wizHourlyRate,
      wizCommissionRate: state.step2.wizCommissionRate,
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount,
      wizPayDay: state.step2.wizPayDay || '10일',
      customTerms: state.step3.customTerms || '특약사항 없음',
    })),
  );

  return (
    <ContractDocumentTemplate
      instructorName={instructorName}
      instructorPhone={instructorPhone}
      instructorSubject={instructorSubject}
      instructorAddress={instructorAddress}
      wizStartDate={wizStartDate}
      wizEndDate={wizEndDate}
      wizProbation={wizProbation}
      wizDaysConfig={wizDaysConfig}
      wizSalaryType={wizSalaryType}
      wizSalaryAmount={wizSalaryAmount}
      wizHourlyRate={wizHourlyRate}
      wizCommissionRate={wizCommissionRate}
      wizMinGuaranteeAmount={wizMinGuaranteeAmount}
      wizPayDay={wizPayDay}
      customTerms={customTerms}
    />
  );
}
