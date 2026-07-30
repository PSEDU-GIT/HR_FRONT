'use client';

import { useActivityTimelineState } from '@/app/(afterLogin)/dashboard/_state/getActivityTimeline.state';
import ActivityTimelineItem from '@/app/(afterLogin)/dashboard/_component/ActivityTimelineItem';

export default function ReadContractTimelineAction() {
  const { timelineList } = useActivityTimelineState(20);

  if (timelineList.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-xs font-medium text-gray-400">
        최근 활동 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-6 py-2">
      <div className="absolute top-3.5 bottom-3.5 left-[4.125rem] w-[1.5px] -translate-x-1/2 bg-gray-200" />

      {timelineList.map((item, index) => (
        <ActivityTimelineItem key={`${item.hrDocumentId}-${item.occurredAt}-${index}`} item={item} />
      ))}
    </div>
  );
}
