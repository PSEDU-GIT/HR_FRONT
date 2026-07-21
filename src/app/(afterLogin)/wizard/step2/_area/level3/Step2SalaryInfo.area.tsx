'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AccordionCard from '@/app/(afterLogin)/wizard/step2/_component/AccordionCard';
import Step2SalaryMonthlyArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2SalaryMonthly.area';
import Step2SalaryPayDayArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2SalaryPayDay.area';
import Step2SalaryTaxFreeArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2SalaryTaxFree.area';
import Step2NonCompeteArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2NonCompete.area';
import Step2ExtraAllowanceArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2ExtraAllowance.area';
import { motion } from 'framer-motion';
import Step2SalaryTypeArea from './Step2SalaryType.area';

export default function Step2SalaryInfoArea() {
  const { wizSubStep, maxUnlockedSubStep, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizSubStep: state.step2.wizSubStep,
      maxUnlockedSubStep: state.step2.maxUnlockedSubStep,
      setStep2: state.setStep2,
    })),
  );

  if (maxUnlockedSubStep < 3) return null;

  const handleSubStepChange = (subStep: 1 | 2 | 3) => {
    setStep2({ wizSubStep: subStep });
  };

  const isCurrentOpen = wizSubStep === 3;

  return (
    <motion.article
      layout="position"
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      style={{ order: isCurrentOpen ? -1 : 3 }}
    >
      <AccordionCard
        title="급여 형태 및 금액 설정"
        isOpen={isCurrentOpen}
        onClick={() => handleSubStepChange(3)}
      >
        <div className="space-y-6">
          <Step2SalaryTypeArea />
        </div>
      </AccordionCard>
    </motion.article>
  );
}
