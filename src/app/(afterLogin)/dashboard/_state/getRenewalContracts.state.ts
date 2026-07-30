'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { useDashboardStore } from '@/app/(afterLogin)/dashboard/_state/useDashboardStore';
import { getRenewalContracts } from '@/app/(afterLogin)/dashboard/_lib/getRenewalContracts';
import { type RenewalContractsResponse } from '@/app/(afterLogin)/dashboard/_model/RenewalContracts.model';

export const getRenewalContractsQueryKey = ['renewalContracts'];

export const useRenewalContractsState = () => {
  const { searchQuery, page, take } = useDashboardStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      page: state.page,
      take: state.take,
    })),
  );

  const { data } = useSuspenseQuery<RenewalContractsResponse>({
    queryKey: [...getRenewalContractsQueryKey, page, take, searchQuery],
    queryFn: () => getRenewalContracts(page, take, searchQuery),
    staleTime: 1000 * 60 * 5,
  });

  return {
    contracts: data?.contracts || [],
    paging: data?.paging || { page: 1, size: 10, totalCount: 0, hasNext: false },
  };
};
