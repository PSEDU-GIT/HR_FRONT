import { type ContractDetailResponse } from '@/app/(afterLogin)/cabinet/_model/ContractDetail.model';

export const getContractDetailQueryKey = ['contractDetail'];

export const getContractDetail = async (
  contractId: number,
): Promise<ContractDetailResponse> => {
  const res = await fetch(`/api/hr/contract/${contractId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.message || '계약서 상세 정보를 불러오는데 실패했습니다.');
  }

  const json = await res.json();
  return json?.data ?? json;
};
