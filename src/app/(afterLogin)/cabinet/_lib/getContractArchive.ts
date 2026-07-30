import { type ContractArchiveItem } from '@/app/(afterLogin)/cabinet/_model/ContractArchive.model';

export const getContractArchive = async (): Promise<ContractArchiveItem[]> => {
  try {
    const res = await fetch('/api/hr/contract/archive', { cache: 'no-store' });
    if (!res.ok) {
      return [];
    }
    const json = await res.json();
    if (Array.isArray(json?.data)) {
      return json.data;
    }
    return [];
  } catch (error) {
    console.error('getContractArchive fetch error:', error);
    return [];
  }
};
