'use client';

import ClickPrevSummaryStepAction from '@/app/(afterLogin)/wizard/(summary)/summary/[type]/[id]/_action/ClickPrevSummaryStep.action';
import ClickSummaryCompleteAction from '../_action/ClickSummaryCompleteAction.action';

export default function SummaryHeaderActionArea() {
  return (
    <div className="absolute top-3.5 right-0 z-10 flex w-90 items-center gap-2.5">
      <ClickPrevSummaryStepAction className="flex-1" />
      <ClickSummaryCompleteAction className="flex-1" />
    </div>
  );
}
