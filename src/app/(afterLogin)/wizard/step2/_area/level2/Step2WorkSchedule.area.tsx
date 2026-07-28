'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AccordionCard from '@/app/(afterLogin)/wizard/step2/_component/AccordionCard';
import WorkScheduleFormHandler from '@/app/(afterLogin)/wizard/step2/_handler/WorkScheduleForm.handler';
import ReadWorkScheduleSummaryAction from '@/app/(afterLogin)/wizard/step2/_action/schedule/ReadWorkScheduleSummary.action';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/step2/_state/periodUtils';
import { motion } from 'framer-motion';

export default function Step2WorkScheduleArea() {
  const { wizSubStep, maxUnlockedSubStep, wizDaysConfig, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizSubStep: state.step2.wizSubStep,
      maxUnlockedSubStep: state.step2.maxUnlockedSubStep,
      wizDaysConfig: state.step2.wizDaysConfig,
      setStep2: state.setStep2,
    })),
  );

  if (maxUnlockedSubStep < 2) return null;

  const weeklyHours = parseFloat(
    Object.values(wizDaysConfig)
      .reduce(
        (sum, conf) =>
          sum +
          (conf.enabled ? calculateDailyHours(conf.startTime, conf.endTime, conf.breakTime) : 0),
        0,
      )
      .toFixed(1),
  );
  const hasStep2Warning = weeklyHours < 15;

  const handleSubStepChange = (subStep: 1 | 2 | 3) => {
    setStep2({ wizSubStep: subStep });
  };

  const isCurrentOpen = wizSubStep === 2;

  return (
    <motion.article
      layout="position"
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      style={{ order: isCurrentOpen ? -1 : 2 }}
    >
      <AccordionCard
        title="근무 요일 및 소정근로시간 설정"
        hasWarning={hasStep2Warning}
        isOpen={isCurrentOpen}
        isDone={maxUnlockedSubStep >= 3}
        onClick={() => handleSubStepChange(2)}
        summary={<ReadWorkScheduleSummaryAction />}
      >
        <WorkScheduleFormHandler />
      </AccordionCard>
    </motion.article>
  );
}
