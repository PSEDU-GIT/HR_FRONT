import { type ContractEventLogResponse } from '@/app/(afterLogin)/cabinet/_model/ContractEventLog.model';

export const getContractEventLogQueryKey = ['contractEventLog'];

export const getContractEventLog = async (
  contractId: number,
): Promise<ContractEventLogResponse> => {
  const res = await fetch(`/api/hr/contract/${contractId}/event-log`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.message || '이벤트 로그를 불러오는데 실패했습니다.');
  }

  const json = await res.json();
  return json?.data ?? json;
};
