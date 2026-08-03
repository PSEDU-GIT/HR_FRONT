import { DraftContractItem } from '../_model/DraftContract.model';

export const getDraftContractsQueryKey = ['draftContracts'];

export const getDraftContracts = async (): Promise<DraftContractItem[]> => {
  const res = await fetch('/api/hr/contract/draft', { cache: 'no-store' });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(
      errorJson.message || errorJson.error || '임시 저장 계약서 목록을 불러오는데 실패했습니다.',
    );
  }
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.contracts)) return data.contracts;
  if (Array.isArray(data?.drafts)) return data.drafts;
  return [];
};
