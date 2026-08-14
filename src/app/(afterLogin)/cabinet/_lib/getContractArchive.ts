import { auth } from '@/app/auth';
import { type ContractArchiveResponse } from '@/app/(afterLogin)/cabinet/_model/ContractArchive.model';

export const getContractArchiveQueryKey = ['contractArchive'];

export const EMPTY_CONTRACT_ARCHIVE_RESPONSE: ContractArchiveResponse = {
  contracts: [],
  paging: {
    page: 1,
    size: 10,
    totalCount: 0,
    hasNext: false,
  },
  counterparties: [],
};

export const getContractArchive = async (
  page: number = 1,
  take: number = 10,
  keyword: string = '',
  instructor: string = '',
  status: string = '',
): Promise<ContractArchiveResponse> => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      take: String(take),
    });
    if (keyword.trim()) {
      params.set('keyword', keyword.trim());
    }
    if (instructor.trim()) {
      params.set('instructor', instructor);
    }
    if (status.trim()) {
      params.set('status', status);
    }

    const res = await fetch(`/api/hr/contract/archive?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) {
      return EMPTY_CONTRACT_ARCHIVE_RESPONSE;
    }

    const json = await res.json();

    if (json?.data && Array.isArray(json.data?.contracts)) {
      return json.data;
    }
    if (Array.isArray(json?.contracts)) {
      return json;
    }
    if (Array.isArray(json?.data)) {
      return {
        contracts: json.data,
        paging: {
          page: 1,
          size: json.data.length,
          totalCount: json.data.length,
          hasNext: false,
        },
        counterparties: [],
      };
    }
    return EMPTY_CONTRACT_ARCHIVE_RESPONSE;
  } catch (error) {
    console.error('getContractArchive fetch error:', error);
    return EMPTY_CONTRACT_ARCHIVE_RESPONSE;
  }
};

export const getContractArchiveServer =
  () =>
  async ({ queryKey }: { queryKey: readonly unknown[] }): Promise<ContractArchiveResponse> => {
    const [, page = 1, take = 10, keyword = '', instructor = '', status = ''] = queryKey as [
      string,
      number?,
      number?,
      string?,
      string?,
      string?,
    ];

    try {
      const session = await auth();
      const token = session?.accessToken || '';

      const params = new URLSearchParams({
        page: String(page),
        take: String(take),
      });
      if (typeof keyword === 'string' && keyword.trim()) {
        params.set('keyword', keyword.trim());
      }
      if (typeof instructor === 'string' && instructor.trim()) {
        params.set('instructor', instructor.trim());
      }
      if (typeof status === 'string' && status.trim()) {
        params.set('status', status.trim());
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const url = `${baseUrl}/hr/contract/archive?${params.toString()}`;

      const res = await fetch(url, {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return EMPTY_CONTRACT_ARCHIVE_RESPONSE;
      }

      const json = await res.json();

      if (json?.data && Array.isArray(json.data?.contracts)) {
        return json.data;
      }
      if (Array.isArray(json?.contracts)) {
        return json;
      }
      if (Array.isArray(json?.data)) {
        return {
          contracts: json.data,
          paging: {
            page: 1,
            size: json.data.length,
            totalCount: json.data.length,
            hasNext: false,
          },
          counterparties: [],
        };
      }
      return EMPTY_CONTRACT_ARCHIVE_RESPONSE;
    } catch (error) {
      console.error('getContractArchiveServer fetch error:', error);
      return EMPTY_CONTRACT_ARCHIVE_RESPONSE;
    }
  };
