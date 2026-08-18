'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getAcademyPartyInfo,
  getAcademyPartyInfoQueryKey,
} from '@/app/(afterLogin)/_lib/getAcademyPartyInfo';
import { type AcademyPartyInfo } from '@/app/(afterLogin)/_model/AcademyPartyInfo.model';

export { getAcademyPartyInfoQueryKey };

export const useAcademyPartyInfoState = () => {
  const { data, isLoading, error } = useQuery<AcademyPartyInfo | null>({
    queryKey: getAcademyPartyInfoQueryKey,
    queryFn: () => getAcademyPartyInfo(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    academyInfo: data,
    isLoading,
    error,
  };
};
