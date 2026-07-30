'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '@/app/(afterLogin)/dashboard/_lib/getDashboardSummary';
import { type DashboardSummary } from '@/app/(afterLogin)/dashboard/_model/DashboardSummary.model';

export const getDashboardSummaryQueryKey = ['dashboardSummary'];

export const useDashboardSummaryState = () => {
  const { data: summary } = useSuspenseQuery<DashboardSummary>({
    queryKey: getDashboardSummaryQueryKey,
    queryFn: getDashboardSummary,
    staleTime: 1000 * 60 * 5,
  });

  return {
    summary,
  };
};
