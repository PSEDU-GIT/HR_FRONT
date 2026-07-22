'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AccordionCard from '@/app/(afterLogin)/wizard/step2/_component/AccordionCard';
import Step2SalaryTypeArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2SalaryType.area';
import SalaryFormHandler from '@/app/(afterLogin)/wizard/step2/_handler/SalaryForm.handler';
import { motion } from 'framer-motion';

export default function Step2SalaryInfoArea() {
  const {
    wizSubStep,
    maxUnlockedSubStep,
    wizSalaryType,
    wizSalaryApplied,
    wizSalaryDone,
    wizSalaryAmount,
    wizHourlyRate,
    wizPayDay,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizSubStep: state.step2.wizSubStep,
      maxUnlockedSubStep: state.step2.maxUnlockedSubStep,
      wizSalaryType: state.step2.wizSalaryType,
      wizSalaryApplied: state.step2.wizSalaryApplied,
      wizSalaryDone: state.step2.wizSalaryDone,
      wizSalaryAmount: state.step2.wizSalaryAmount,
      wizHourlyRate: state.step2.wizHourlyRate,
      wizPayDay: state.step2.wizPayDay,
      setStep2: state.setStep2,
    })),
  );

  if (maxUnlockedSubStep < 3) return null;

  const handleSubStepChange = (subStep: 1 | 2 | 3) => {
    setStep2({ wizSubStep: subStep });
  };

  const isCurrentOpen = wizSubStep === 3;

  const getSummaryText = () => {
    if (!wizSalaryDone) return undefined;
    if (wizSalaryType === 'hourly') {
      return `시급 ${wizHourlyRate ? wizHourlyRate.toLocaleString() : 10320}원 · 매월 ${wizPayDay}`;
    }
    return `월급 ${wizSalaryAmount ? wizSalaryAmount.toLocaleString() : 0}원 · 매월 ${wizPayDay}`;
  };

  return (
    <motion.article
      layout="position"
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      style={{ order: isCurrentOpen ? -1 : 3 }}
    >
      <AccordionCard
        title="급여 형태 및 금액 설정"
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
