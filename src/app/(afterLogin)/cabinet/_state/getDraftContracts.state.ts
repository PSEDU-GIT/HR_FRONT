import { useQuery } from '@tanstack/react-query';
import { getDraftContracts, getDraftContractsQueryKey } from '../_lib/getDraftContracts';

export { getDraftContractsQueryKey };

export const useDraftContractsState = () => {
  return useQuery({
    queryKey: getDraftContractsQueryKey,
    queryFn: getDraftContracts,
    staleTime: 1000 * 60 * 5,
  });
};
