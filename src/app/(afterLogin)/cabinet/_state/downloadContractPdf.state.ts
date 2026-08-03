'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  getContractDetail,
  getContractDetailQueryKey,
} from '@/app/(afterLogin)/cabinet/_lib/getContractDetail';

export const downloadContractPdf = (contractId?: number, instructorName?: string) => {
  const targetName = instructorName ? instructorName.trim() : '';
  const queryParam = contractId ? `contractId=${contractId}` : '';
  const nameParam = targetName ? `name=${encodeURIComponent(targetName)}` : '';
  const queryString = [queryParam, nameParam].filter(Boolean).join('&');

  const downloadUrl = `/api/pdf/download${queryString ? `?${queryString}` : ''}`;
  const filename = targetName ? `${targetName}_표준근로계약서.pdf` : '표준근로계약서.pdf';

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const useDownloadContractPdfState = () => {
  const queryClient = useQueryClient();

  const handleDownload = async (contractId?: number, instructorName?: string) => {
    if (contractId) {
      try {
        await queryClient.fetchQuery({
          queryKey: [...getContractDetailQueryKey, contractId],
          queryFn: () => getContractDetail(contractId),
        });
      } catch (e) {
        console.warn('Prefetching contract detail failed before PDF download:', e);
      }
    }
    downloadContractPdf(contractId, instructorName);
  };

  return {
    downloadContractPdf: handleDownload,
  };
};
