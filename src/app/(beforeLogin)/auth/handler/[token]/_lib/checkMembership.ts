export interface CheckMembershipPayload {
  token: string;
  name: string;
  phone: string;
}

export interface CheckMembershipResponseData {
  isMember?: boolean;
  member?: boolean;
  isRegistered?: boolean;
  requireSignup?: boolean;
  contractId?: number | string;
  [key: string]: any;
}

export interface CheckMembershipResponse {
  success: boolean;
  data: CheckMembershipResponseData | null;
  message?: string;
  error?: string;
}

export const checkMembership = async ({ token, name, phone }: CheckMembershipPayload) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const res = await fetch(`/api/account/contract-signature/${token}/check-membership`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, phone: cleanPhone }),
  });

  const data = await res.json();
  if (!res.ok || data.success === false) {
    const errorMsg =
      data.error ||
      data.message ||
      data.data?.message ||
      data.data?.error ||
      '회원 여부 확인 중 오류가 발생했습니다.';
    throw new Error(errorMsg);
  }

  return data as CheckMembershipResponse;
};
