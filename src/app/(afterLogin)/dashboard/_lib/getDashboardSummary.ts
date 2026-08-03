import { auth } from '@/app/auth';
import { type DashboardSummary } from '@/app/(afterLogin)/dashboard/_model/DashboardSummary.model';

export const getDashboardSummaryQueryKey = ['dashboardSummary'];

const EMPTY_DASHBOARD_SUMMARY: DashboardSummary = {
  draftCount: 0,
  pendingSignatureCount: 0,
  expiringCount: 0,
  totalSignedCount: 0,
};

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  try {
    const res = await fetch('/api/hr/dashboard/summary', { cache: 'no-store' });
    if (!res.ok) {
      return EMPTY_DASHBOARD_SUMMARY;
    }
    const json = await res.json();
    if (json?.data && typeof json.data === 'object') {
      return json.data;
    }
    if (typeof json?.draftCount === 'number') {
      return json;
    }
    return EMPTY_DASHBOARD_SUMMARY;
  } catch (error) {
    console.error('getDashboardSummary fetch error:', error);
    return EMPTY_DASHBOARD_SUMMARY;
  }
};

export const getDashboardSummaryServer =
  (cookie: string) =>
  async (): Promise<DashboardSummary> => {
    try {
      const session = await auth();
      const token = session?.accessToken || '';

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || '';
      const url = baseUrl ? `${baseUrl}/hr/dashboard/summary` : '/api/hr/dashboard/summary';

      const res = await fetch(url, {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: cookie,
        },
      });

      if (!res.ok) {
        return EMPTY_DASHBOARD_SUMMARY;
      }
      const json = await res.json();
      if (json?.data && typeof json.data === 'object') {
        return json.data;
      }
      if (typeof json?.draftCount === 'number') {
        return json;
      }
      return EMPTY_DASHBOARD_SUMMARY;
    } catch (error) {
      console.error('getDashboardSummaryServer fetch error:', error);
      return EMPTY_DASHBOARD_SUMMARY;
    }
  };

