'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import ClickLoadPreviousContractAction from '@/app/(afterLogin)/wizard/(standard)/step1/_action/side/ClickLoadPreviousContract.action';
import ReadPreviousContractSummaryAction from '@/app/(afterLogin)/wizard/(standard)/step1/_action/side/ReadPreviousContractSummary.action';

export default function PreviousContractHandler() {
  const isNewInstructor = useWizardStore((state) => state.step1.isNewInstructor);
  const hasContractHistory = useWizardStore((state) => state.step1.hasContractHistory);

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
          <div className="border-custom-slate-border-side dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 rounded-3xl border p-6 transition-colors">
            <div className="border-custom-slate-border-side dark:border-slate-800 flex items-center justify-between border-b pb-3">
              <h4 className="text-13 text-text-title dark:text-slate-100 font-bold">이전 계약서 불러오기</h4>
              {hasContractHistory && <ClickLoadPreviousContractAction />}
            </div>
            {hasContractHistory ? (
              <ReadPreviousContractSummaryAction />
            ) : (
              <div className="border-custom-slate-border dark:border-slate-800 bg-custom-slate-bg/30 dark:bg-slate-800/40 text-text-side dark:text-slate-400 rounded-2xl border p-6 text-center text-xs font-medium">
                이전 계약 정보가 없습니다
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
