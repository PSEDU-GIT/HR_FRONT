'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import SelectExistingInstructorAction from '@/app/(afterLogin)/wizard/(standard)/step1/_action/instructor/SelectExistingInstructor.action';
import ReadSelectedInstructorProfileAction from '@/app/(afterLogin)/wizard/(standard)/step1/_action/instructor/ReadSelectedInstructorProfile.action';
import FormNewInstructorAction from '@/app/(afterLogin)/wizard/(standard)/step1/_action/instructor/FormNewInstructor.action';

export default function InstructorFormHandler() {
  const isNewInstructor = useWizardStore((state) => state.step1.isNewInstructor);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isNewInstructor ? 'new' : 'existing'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="col-span-2 grid grid-cols-2 gap-4"
      >
        {!isNewInstructor ? (
          <>
            <div className="col-span-2">
              <label className="text-text-main mb-1.5 block text-xs font-bold">
                등록된 강사 선택 <span className="text-red-500">*</span>
              </label>
              <SelectExistingInstructorAction />
            </div>
            <ReadSelectedInstructorProfileAction />
          </>
        ) : (
          <FormNewInstructorAction />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
