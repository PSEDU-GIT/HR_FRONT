'use client';

import { Suspense } from 'react';
import ReadContractTimelineAction from '@/app/(afterLogin)/dashboard/_action/ReadContractTimeline.action';
import DashboardTimelineSkeleton from '@/app/(afterLogin)/dashboard/_component/DashboardTimelineSkeleton';

export default function DashboardActivityTimelineArea() {
  return (
    <div className="border-custom-slate-border flex h-full max-h-[520px] w-full flex-col rounded-2xl border bg-background p-6 text-sm">
      <h3 className="mb-4 shrink-0 text-base font-bold text-text-title">
        계약 활동 타임라인
      </h3>
      <div className="flex-1 overflow-y-auto pr-1">
        <Suspense fallback={<DashboardTimelineSkeleton />}>
          <ReadContractTimelineAction />
        </Suspense>
      </div>
    </div>
  );
}
