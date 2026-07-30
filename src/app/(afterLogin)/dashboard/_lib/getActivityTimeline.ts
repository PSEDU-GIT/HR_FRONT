import { type ActivityTimelineItem } from '@/app/(afterLogin)/dashboard/_model/ActivityTimeline.model';

export const getActivityTimeline = async (take: number = 20): Promise<ActivityTimelineItem[]> => {
  try {
    const res = await fetch(`/api/hr/dashboard/activity-timeline?take=${take}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return [];
    }
    const json = await res.json();
    if (Array.isArray(json?.data)) {
      return json.data;
    }
    if (Array.isArray(json)) {
      return json;
    }
    return [];
  } catch (error) {
    console.error('getActivityTimeline fetch error:', error);
    return [];
  }
};
