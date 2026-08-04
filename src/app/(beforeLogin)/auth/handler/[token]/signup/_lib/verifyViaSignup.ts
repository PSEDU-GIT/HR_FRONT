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
  if (!res.ok || data.success === false) {
    const errorMsg =
      data.error ||
      data.message ||
      data.data?.message ||
      data.data?.error ||
      '회원가입 후 인증 처리 중 오류가 발생했습니다.';
    throw new Error(errorMsg);
  }

  return data;
};
