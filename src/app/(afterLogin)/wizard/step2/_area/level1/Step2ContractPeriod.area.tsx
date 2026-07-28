'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AccordionCard from '@/app/(afterLogin)/wizard/step2/_component/AccordionCard';
import FormContractPeriodAction from '@/app/(afterLogin)/wizard/step2/_action/period/FormContractPeriod.action';
import ReadContractPeriodSummaryAction from '@/app/(afterLogin)/wizard/step2/_action/period/ReadContractPeriodSummary.action';
import ClickNextSubStepAction from '@/app/(afterLogin)/wizard/step2/_action/period/ClickNextSubStep.action';
import { calcPeriodDays } from '@/app/(afterLogin)/wizard/step2/_state/periodUtils';
import { motion } from 'framer-motion';

export default function Step2ContractPeriodArea() {
  const { wizSubStep, maxUnlockedSubStep, wizStartDate, wizEndDate, wizProbation, setStep2 } =
    useWizardStore(
      useShallow((state) => ({
        wizSubStep: state.step2.wizSubStep,
        maxUnlockedSubStep: state.step2.maxUnlockedSubStep,
        wizStartDate: state.step2.wizStartDate,
        wizEndDate: state.step2.wizEndDate,
        wizProbation: state.step2.wizProbation,
        setStep2: state.setStep2,
      })),
    );

  const periodDays = calcPeriodDays(wizStartDate, wizEndDate);
  const isUnderOneYear = periodDays > 0 && periodDays < 365;
  const isProbationWarning = wizProbation !== '없음' && parseInt(wizProbation) > 3;
  const hasStep1Warning = isUnderOneYear || isProbationWarning;

  const handleSubStepChange = (subStep: 1 | 2 | 3) => {
    setStep2({ wizSubStep: subStep });
  };

  const isCurrentOpen = wizSubStep === 1;

  return (
    <motion.article
      layout="position"
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      style={{ order: isCurrentOpen ? -1 : 1 }}
    >
      <AccordionCard
        title="계약 기간 및 수습 설정"
        hasWarning={hasStep1Warning}
        isOpen={isCurrentOpen}
        isDone={maxUnlockedSubStep >= 2}
        onClick={() => handleSubStepChange(1)}
        summary={<ReadContractPeriodSummaryAction />}
      >
        <FormContractPeriodAction />
        <footer className="pt-3">
          <ClickNextSubStepAction nextSubStep={2} />
        </footer>
      </AccordionCard>
    </motion.article>
  );
}
