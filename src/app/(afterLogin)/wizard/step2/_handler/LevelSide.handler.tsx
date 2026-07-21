'use client';

import { useWizardStore } from '../../store';
import ReadLegalAdvisorySub1Action from '../_action/side/ReadLegalAdvisorySub1.action';
import ReadLegalAdvisorySub2Action from '../_action/side/ReadLegalAdvisorySub2.action';
import ReadLegalAdvisorySub3Action from '../_action/side/ReadLegalAdvisorySub3.action';

export default function LevelSideHandler() {
  const wizSubStep = useWizardStore((state) => state.step2.wizSubStep);

  if (wizSubStep === 1) {
    return <ReadLegalAdvisorySub1Action />;
  }

  if (wizSubStep === 2) return <ReadLegalAdvisorySub2Action />;
  if (wizSubStep === 3) return <ReadLegalAdvisorySub3Action />;

  return null;
}
