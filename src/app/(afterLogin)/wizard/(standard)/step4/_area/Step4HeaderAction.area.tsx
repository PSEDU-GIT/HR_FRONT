'use client';

import ClickPrevStepAction from '@/app/(afterLogin)/wizard/(standard)/step4/_action/side/ClickPrevStep.action';
import ClickCompleteContractAction from '@/app/(afterLogin)/wizard/(standard)/step4/_action/ClickCompleteContract.action';

export default function Step4HeaderActionArea() {
  return (
    <div className="absolute top-[14px] right-0 z-10 flex w-[360px] items-center gap-2.5">
      <ClickPrevStepAction className="flex-1" />
      <ClickCompleteContractAction className="flex-1" />
    </div>
  );
}
