import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSendSignatureLink } from '@/app/(afterLogin)/cabinet/_lib/updateSendSignatureLink';
import { getContractArchiveQueryKey } from '@/app/(afterLogin)/cabinet/_state/getContractArchive.state';

export const useUpdateSendSignatureLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contractId: number) => updateSendSignatureLink(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getContractArchiveQueryKey });
    },
  });
};

export const updateSendSignatureLinkMutation = useUpdateSendSignatureLinkMutation;

