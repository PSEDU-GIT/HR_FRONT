'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getContractDetail,
  getContractDetailQueryKey,
} from '@/app/(afterLogin)/cabinet/_lib/getContractDetail';
import { type ContractDetailResponse } from '@/app/(afterLogin)/cabinet/_model/ContractDetail.model';

export { getContractDetailQueryKey };

export const useContractDetailState = (contractId: number) => {
  const query = useQuery<ContractDetailResponse>({
    queryKey: [...getContractDetailQueryKey, contractId],
    queryFn: () => getContractDetail(contractId),
    enabled: Boolean(contractId),
  });

  return {
    contractDetail: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
