import { RiskCheckApiResponse, RiskRuleGetDto, RiskCheckResultItem } from '../_model/ContractRiskRule.model';

export const getContractRiskRules = async (
  contractType: string = 'TEACHER',
): Promise<RiskCheckApiResponse<RiskRuleGetDto[]>> => {
  const res = await fetch(`/api/hr/contract/risk-rule/${contractType}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || '리스크 룰 조회에 실패했습니다.');
  }

  return await res.json();
};

export const getContractRiskCheck = async (
  contractType: string = 'TEACHER',
): Promise<RiskCheckApiResponse<RiskCheckResultItem[]>> => {
  const res = await fetch(`/api/hr/contract/risk-rule/${contractType}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || '리스크 검사 결과 조회에 실패했습니다.');
  }

  return await res.json();
};
