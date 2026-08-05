'use client';

import { useQuery } from '@tanstack/react-query';
import { getContractRiskRules } from '@/app/(afterLogin)/wizard/_lib/getContractRiskRules';
import { RiskRuleGetDto } from '@/app/(afterLogin)/wizard/_model/ContractRiskRule.model';

export const getContractRiskRulesQueryKey = ['contractRiskRules'];

export const useContractRiskRulesState = (contractType: string = 'TEACHER') => {
  const query = useQuery({
    queryKey: [...getContractRiskRulesQueryKey, contractType],
    queryFn: () => getContractRiskRules(contractType),
  });

  return {
    riskRules: query.data?.data as RiskRuleGetDto[] | undefined,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
