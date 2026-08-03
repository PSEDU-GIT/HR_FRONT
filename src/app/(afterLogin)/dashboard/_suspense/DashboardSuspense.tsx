import { ReactNode } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';
import { getPrefetch } from '@/app/util/getPrefetch';
import {
  getDashboardSummaryQueryKey,
  getDashboardSummaryServer,
} from '@/app/(afterLogin)/dashboard/_lib/getDashboardSummary';
import {
  getRenewalContractsQueryKey,
  getRenewalContractsServer,
} from '@/app/(afterLogin)/dashboard/_lib/getRenewalContracts';
import {
  getActivityTimelineQueryKey,
  getActivityTimelineServer,
} from '@/app/(afterLogin)/dashboard/_lib/getActivityTimeline';

type Props = {
  children: ReactNode;
};

export default async function DashboardSuspense({ children }: Props) {
  const { dehydratedState } = await getPrefetch([
    {
      queryKey: getDashboardSummaryQueryKey,
      queryFnFactory: getDashboardSummaryServer,
    },
    {
      queryKey: [...getRenewalContractsQueryKey, 1, 10, ''],
      queryFnFactory: getRenewalContractsServer,
    },
    {
      queryKey: [...getActivityTimelineQueryKey, 20],
      queryFnFactory: getActivityTimelineServer,
    },
  ]);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}
