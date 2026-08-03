import { auth } from '@/app/auth';
import { type ActivityTimelineItem } from '@/app/(afterLogin)/dashboard/_model/ActivityTimeline.model';

export const getActivityTimelineQueryKey = ['activityTimeline'];

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

export const getActivityTimelineServer =
  (cookie: string) =>
  async ({ queryKey }: { queryKey: readonly unknown[] }): Promise<ActivityTimelineItem[]> => {
    const [, take = 20] = queryKey as [string, number?];
    try {
      const session = await auth();
      const token = session?.accessToken || '';

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || '';
      const url = baseUrl
        ? `${baseUrl}/hr/dashboard/activity-timeline?take=${take}`
        : `/api/hr/dashboard/activity-timeline?take=${take}`;

      const res = await fetch(url, {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: cookie,
        },
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
      console.error('getActivityTimelineServer fetch error:', error);
      return [];
    }
  };

