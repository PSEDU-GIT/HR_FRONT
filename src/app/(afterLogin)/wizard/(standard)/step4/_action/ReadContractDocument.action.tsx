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
    wizWeeklyHoliday,
    wizSalaryType,
    wizSalaryAmount,
    wizHourlyRate,
    wizCommissionRate,
    wizMinGuaranteeAmount,
    wizPayDay,
    wizHasTaxFree,
    wizNonTaxFood,
    wizHasNonCompete,
    wizNonCompetePeriod,
    wizNonCompeteRange,
    wizNonCompeteAmount,
    wizNonCompeteCalcType,
    wizNonCompetePercent,
    wizHasExtraAllowance,
    wizOvertimeAllowance,
    wizPositionAllowance,
    wizOtherAllowance,
    wizOtherAllowanceName,
    customTerms,
    contractType,
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
      wizWeeklyHoliday: state.step2.wizWeeklyHoliday || '일요일',
      wizSalaryType: state.step2.wizSalaryType,
      wizSalaryAmount: state.step2.wizSalaryAmount,
      wizHourlyRate: state.step2.wizHourlyRate,
      wizCommissionRate: state.step2.wizCommissionRate,
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount,
      wizPayDay: state.step2.wizPayDay || '10일',
      wizHasTaxFree: state.step2.wizHasTaxFree,
      wizNonTaxFood: state.step2.wizNonTaxFood,
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompetePeriod: state.step2.wizNonCompetePeriod,
      wizNonCompeteRange: state.step2.wizNonCompeteRange,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
      wizNonCompeteCalcType: state.step2.wizNonCompeteCalcType,
      wizNonCompetePercent: state.step2.wizNonCompetePercent,
      wizHasExtraAllowance: state.step2.wizHasExtraAllowance,
      wizOvertimeAllowance: state.step2.wizOvertimeAllowance,
      wizPositionAllowance: state.step2.wizPositionAllowance,
      wizOtherAllowance: state.step2.wizOtherAllowance,
      wizOtherAllowanceName: state.step2.wizOtherAllowanceName,
      customTerms: state.step3.customTerms || '특약사항 없음',
      contractType: state.step1.contractType,
    })),
  );

  return (
    <ContractDocumentTemplate
      contractType={contractType}
      instructorName={instructorName}
      instructorPhone={instructorPhone}
      instructorSubject={instructorSubject}
      instructorAddress={instructorAddress}
      wizStartDate={wizStartDate}
      wizEndDate={wizEndDate}
      wizProbation={wizProbation}
      wizDaysConfig={wizDaysConfig}
      wizWeeklyHoliday={wizWeeklyHoliday}
      wizSalaryType={wizSalaryType}
      wizSalaryAmount={wizSalaryAmount}
      wizHourlyRate={wizHourlyRate}
      wizCommissionRate={wizCommissionRate}
      wizMinGuaranteeAmount={wizMinGuaranteeAmount}
      wizPayDay={wizPayDay}
      wizHasTaxFree={wizHasTaxFree}
      wizNonTaxFood={wizNonTaxFood}
      wizHasNonCompete={wizHasNonCompete}
      wizNonCompetePeriod={wizNonCompetePeriod}
      wizNonCompeteRange={wizNonCompeteRange}
      wizNonCompeteAmount={wizNonCompeteAmount}
      wizNonCompeteCalcType={wizNonCompeteCalcType}
      wizNonCompetePercent={wizNonCompetePercent}
      wizHasExtraAllowance={wizHasExtraAllowance}
      wizOvertimeAllowance={wizOvertimeAllowance}
      wizPositionAllowance={wizPositionAllowance}
      wizOtherAllowance={wizOtherAllowance}
      wizOtherAllowanceName={wizOtherAllowanceName}
      customTerms={customTerms}
    />
  );
}
