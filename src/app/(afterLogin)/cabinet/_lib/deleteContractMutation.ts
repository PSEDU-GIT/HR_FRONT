import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContract } from '@/app/(afterLogin)/cabinet/_lib/deleteContract';
import { getContractArchiveQueryKey } from '@/app/(afterLogin)/cabinet/_state/getContractArchive.state';

export const deleteContractMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contractId: number) => deleteContract(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getContractArchiveQueryKey });
    },
  });
};
