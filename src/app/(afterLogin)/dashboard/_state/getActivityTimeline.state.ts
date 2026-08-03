'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getActivityTimeline,
  getActivityTimelineQueryKey,
} from '@/app/(afterLogin)/dashboard/_lib/getActivityTimeline';
import { type ActivityTimelineItem } from '@/app/(afterLogin)/dashboard/_model/ActivityTimeline.model';

export { getActivityTimelineQueryKey };

export const useActivityTimelineState = (take: number = 20) => {
  const { data: timelineList } = useSuspenseQuery<ActivityTimelineItem[]>({
    queryKey: [...getActivityTimelineQueryKey, take],
    queryFn: () => getActivityTimeline(take),
    staleTime: 1000 * 60 * 5,
  });

  return {
    timelineList: timelineList || [],
  };
};

