'use client';

import ClickPrevStepAction from '@/app/(afterLogin)/wizard/step4/_action/side/ClickPrevStep.action';
import ClickCompleteContractAction from '@/app/(afterLogin)/wizard/step4/_action/ClickCompleteContract.action';

export default function Step4FooterArea() {
  return (
    <div className="flex items-center justify-between pt-2">
      <ClickPrevStepAction />
      <div className="flex items-center gap-3">
        <ClickCompleteContractAction />
      </div>
    </div>
  );
}
