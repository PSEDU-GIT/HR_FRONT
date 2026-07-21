'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import ClickLoadPreviousContractAction from '@/app/(afterLogin)/wizard/step1/_action/side/ClickLoadPreviousContract.action';
import ReadPreviousContractSummaryAction from '@/app/(afterLogin)/wizard/step1/_action/side/ReadPreviousContractSummary.action';

export default function PreviousContractHandler() {
  const isNewInstructor = useWizardStore((state) => state.step1.isNewInstructor);

  return (
    <AnimatePresence>
      {!isNewInstructor && (
        <motion.div
          key="previous-contract"
          initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
          animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
          exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <div className="border-custom-slate-border-side space-y-4 rounded-3xl border bg-white p-6">
            <div className="border-custom-slate-border-side flex items-center justify-between border-b pb-3">
              <h4 className="text-13 text-text-title font-bold">이전 계약서 불러오기</h4>
              <ClickLoadPreviousContractAction />
            </div>
            <ReadPreviousContractSummaryAction />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
