import { useMutation } from '@tanstack/react-query';
import { updateSendSignatureLink } from '@/app/(afterLogin)/cabinet/_lib/updateSendSignatureLink';

export const updateSendSignatureLinkMutation = () => {
  return useMutation({
    mutationFn: (contractId: number) => updateSendSignatureLink(contractId),
  });
};
