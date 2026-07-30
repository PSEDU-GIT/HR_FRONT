import { type RenewalContractsResponse } from '@/app/(afterLogin)/dashboard/_model/RenewalContracts.model';

export const EMPTY_RENEWAL_RESPONSE: RenewalContractsResponse = {
  contracts: [],
  paging: {
    page: 1,
    size: 10,
    totalCount: 0,
    hasNext: false,
  },
};

export const getRenewalContracts = async (
  page: number = 1,
  take: number = 10,
  keyword: string = '',
): Promise<RenewalContractsResponse> => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      take: String(take),
    });
    if (keyword.trim()) {
      params.set('keyword', keyword.trim());
    }

    const res = await fetch(`/api/hr/dashboard/renewal-contracts?${params.toString()}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return EMPTY_RENEWAL_RESPONSE;
    }
    const json = await res.json();
    if (json?.data && Array.isArray(json.data?.contracts)) {
      return json.data;
    }
    if (Array.isArray(json?.contracts)) {
      return json;
    }
    return EMPTY_RENEWAL_RESPONSE;
  } catch (error) {
    console.error('getRenewalContracts fetch error:', error);
    return EMPTY_RENEWAL_RESPONSE;
  }
};
