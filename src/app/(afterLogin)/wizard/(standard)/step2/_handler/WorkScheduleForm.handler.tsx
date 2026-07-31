'use client';

import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import Step2WorkSchedulePresetArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level2/Step2WorkSchedulePreset.area';
import Step2WorkScheduleDetailArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level2/Step2WorkScheduleDetail.area';
import { AnimatePresence, motion } from 'framer-motion';

export default function WorkScheduleFormHandler() {
  const wizScheduleApplied = useWizardStore((state) => state.step2.wizScheduleApplied);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={wizScheduleApplied ? 'detail' : 'preset'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {!wizScheduleApplied ? <Step2WorkSchedulePresetArea /> : <Step2WorkScheduleDetailArea />}
      </motion.div>
    </AnimatePresence>
  );
}
