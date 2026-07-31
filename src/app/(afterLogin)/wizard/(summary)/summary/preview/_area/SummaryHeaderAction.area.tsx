'use client';

import ClickPrevSummaryStepAction from '@/app/(afterLogin)/wizard/(summary)/summary/_action/ClickPrevSummaryStep.action';
import ClickCompleteContractAction from '@/app/(afterLogin)/wizard/(standard)/step4/_action/ClickCompleteContract.action';

export default function SummaryHeaderActionArea() {
  return (
    <div className="absolute top-[14px] right-0 z-10 flex w-[360px] items-center gap-2.5">
      <ClickPrevSummaryStepAction targetPath="/wizard/summary" className="flex-1" />
      <ClickCompleteContractAction className="flex-1" />
    </div>
  );
}
