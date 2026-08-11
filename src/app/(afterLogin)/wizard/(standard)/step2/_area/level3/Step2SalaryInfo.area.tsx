'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AccordionCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AccordionCard';
import { motion } from 'framer-motion';

import Step2SalaryTypeArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level3/Step2SalaryType.area';
import SalaryFormHandler from '@/app/(afterLogin)/wizard/(standard)/step2/_handler/SalaryForm.handler';
import {
  calculateWageEngine,
  calculateScheduleHours,
  calculateDynamicMinGuaranteeAmount,
  getEffectiveNonCompeteAmount,
} from '@/app/(afterLogin)/wizard/_lib/wageEngine';

export default function Step2SalaryInfoArea() {
  const {
    wizDaysConfig,
    wizSalaryType,
    wizSalaryAmount,
    wizHourlyRate,
    wizCommissionRate,
    wizMinGuaranteeAmount,
    wizHasTaxFree,
    wizNonTaxFood,
    wizHasNonCompete,
    wizNonCompeteAmount,
    wizNonCompeteCalcType,
    wizNonCompetePercent,
    wizHasExtraAllowance,
    wizOvertimeAllowance,
    wizPositionAllowance,
    wizOtherAllowance,
    wizPayDay,
    wizSubStep,
    wizSalaryDone,
    maxUnlockedSubStep,
    wizSalaryApplied,
    contractType,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
      wizSalaryType: state.step2.wizSalaryType,
      wizSalaryAmount: state.step2.wizSalaryAmount,
      wizHourlyRate: state.step2.wizHourlyRate,
      wizCommissionRate: state.step2.wizCommissionRate,
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount,
      wizHasTaxFree: state.step2.wizHasTaxFree,
      wizNonTaxFood: state.step2.wizNonTaxFood,
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
      wizNonCompeteCalcType: state.step2.wizNonCompeteCalcType || 'percent',
      wizNonCompetePercent: state.step2.wizNonCompetePercent ?? 10,
      wizHasExtraAllowance: state.step2.wizHasExtraAllowance,
      wizOvertimeAllowance: state.step2.wizOvertimeAllowance,
      wizPositionAllowance: state.step2.wizPositionAllowance,
      wizOtherAllowance: state.step2.wizOtherAllowance,
      wizPayDay: state.step2.wizPayDay,
      wizSubStep: state.step2.wizSubStep,
      wizSalaryDone: state.step2.wizSalaryDone,
      maxUnlockedSubStep: state.step2.maxUnlockedSubStep,
      wizSalaryApplied: state.step2.wizSalaryApplied,
      contractType: state.step1.contractType,
      setStep2: state.setStep2,
    })),
  );

  if (maxUnlockedSubStep < 3) return null;

  const { weeklyHours, weeklyOvertimeHours, weeklyNightHours } =
    calculateScheduleHours(wizDaysConfig);
  const isUnder5 = contractType?.includes('5인 미만') || contractType?.includes('5인 이하');

  const dynamicMinPay = calculateDynamicMinGuaranteeAmount(wizDaysConfig, isUnder5, {
    hasNonCompete: wizHasNonCompete,
    calcType: wizNonCompeteCalcType,
    percent: wizNonCompetePercent,
    manualAmount: wizNonCompeteAmount,
  });

  const calculatedNonCompeteAmount = getEffectiveNonCompeteAmount({
    hasNonCompete: wizHasNonCompete,
    calcType: wizNonCompeteCalcType,
    percent: wizNonCompetePercent,
    manualAmount: wizNonCompeteAmount,
    salaryType: wizSalaryType,
    salaryAmount: wizSalaryAmount,
    hourlyRate: wizHourlyRate,
    minGuaranteeAmount: wizMinGuaranteeAmount || dynamicMinPay,
  });

  const wageResult = calculateWageEngine({
    salaryType: wizSalaryType,
    salaryAmount: wizSalaryAmount,
    hourlyRate: wizHourlyRate,
    commissionRate: wizCommissionRate || 20,
    minGuaranteeAmount: wizMinGuaranteeAmount || dynamicMinPay,
    mealAllowance: wizHasTaxFree ? wizNonTaxFood : 0,
    positionAllowance: wizHasExtraAllowance ? wizPositionAllowance : 0,
    overtimeAllowance: wizHasExtraAllowance ? wizOvertimeAllowance : 0,
    otherAllowance: wizHasExtraAllowance ? wizOtherAllowance : 0,
    nonCompeteAmount: calculatedNonCompeteAmount,
    weeklyHours,
    weeklyOvertimeHours,
    weeklyNightHours,
    employeeCount: isUnder5 ? 4 : 5,
  });

  const isBelowMinimum =
    (wizSalaryType === 'hourly'
      ? wizHourlyRate >= 1
      : wizSalaryType === 'commission'
        ? false
        : wizSalaryAmount >= 1) && !wageResult.isMinWagePassed;

  const handleSubStepChange = (subStep: 1 | 2 | 3) => {
    setStep2({ wizSubStep: subStep });
  };

  const isCurrentOpen = wizSubStep === 3;

  const getSummaryText = () => {
    if (!wizSalaryDone) return undefined;
    if (wizSalaryType === 'hourly') {
      return `시급 ${wizHourlyRate ? wizHourlyRate.toLocaleString() : 10320}원 · 매월 ${wizPayDay}`;
    }
    if (wizSalaryType === 'commission') {
      return `비율제 ${wizCommissionRate || 20}% · 매월 ${wizPayDay}`;
    }
    return `월급 ${wizSalaryAmount ? wizSalaryAmount.toLocaleString() : 0}원 · 매월 ${wizPayDay}`;
  };

  return (
    <motion.article
      layout="position"
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      style={{ order: isCurrentOpen ? -1 : 3 }}
    >
      <AccordionCard
        title="급여 형태 및 금액 설정"
        hasDanger={isBelowMinimum}
        isOpen={isCurrentOpen}
        isDone={wizSalaryDone}
        summary={getSummaryText()}
        onClick={() => handleSubStepChange(3)}
      >
        <div className="space-y-6">
          {!wizSalaryApplied ? <Step2SalaryTypeArea /> : <SalaryFormHandler />}
        </div>
      </AccordionCard>
    </motion.article>
  );
}
