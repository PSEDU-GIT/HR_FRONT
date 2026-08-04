export interface VerifyViaSignupPayload {
  token: string;
}

export const verifyViaSignup = async ({ token }: VerifyViaSignupPayload) => {
  const res = await fetch(`/api/account/contract-signature/${token}/verify-via-signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || '회원가입 후 인증 처리 중 오류가 발생했습니다.');
  }

  return data;
};
