import { type DashboardSummary } from '@/app/(afterLogin)/dashboard/_model/DashboardSummary.model';

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
