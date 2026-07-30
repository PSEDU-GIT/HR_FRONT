import { useQuery } from '@tanstack/react-query';
import { getContractArchive } from '@/app/(afterLogin)/cabinet/_lib/getContractArchive';

export const getContractArchiveQueryKey = ['contractArchive'];

export const getContractArchiveQuery = () => {
  return useQuery({
    queryKey: getContractArchiveQueryKey,
    queryFn: getContractArchive,
  });
};
