'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import ReadLegalAdvisorySub1Action from './ReadLegalAdvisorySub1.action';
import ReadLegalAdvisorySub2Action from './ReadLegalAdvisorySub2.action';
import ReadLegalAdvisorySub3Action from './ReadLegalAdvisorySub3.action';

export default function ReadLegalAdvisoryAction() {
  const wizSubStep = useWizardStore(useShallow((state) => state.step2.wizSubStep));

  if (wizSubStep === 2) {
    return <ReadLegalAdvisorySub2Action />;
  }

  if (wizSubStep === 3) {
    return <ReadLegalAdvisorySub3Action />;
  }

  return <ReadLegalAdvisorySub1Action />;
}
