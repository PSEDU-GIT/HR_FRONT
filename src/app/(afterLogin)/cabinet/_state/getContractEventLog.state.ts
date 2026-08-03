'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getContractEventLog,
  getContractEventLogQueryKey,
} from '@/app/(afterLogin)/cabinet/_lib/getContractEventLog';
import { type ContractEventLogResponse } from '@/app/(afterLogin)/cabinet/_model/ContractEventLog.model';

export { getContractEventLogQueryKey };

export const useContractEventLogState = (contractId: number) => {
  const query = useQuery<ContractEventLogResponse>({
    queryKey: [...getContractEventLogQueryKey, contractId],
    queryFn: () => getContractEventLog(contractId),
    enabled: Boolean(contractId),
  });

  return {
    eventLogs: Array.isArray(query.data) ? query.data : [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
