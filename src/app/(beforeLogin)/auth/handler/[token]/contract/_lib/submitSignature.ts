export interface SubmitSignaturePayload {
  token: string;
  signatureImageBase64: string;
  consentCheckedAt?: string;
}

export const submitSignature = async ({
  token,
  signatureImageBase64,
  consentCheckedAt = new Date().toISOString(),
}: SubmitSignaturePayload) => {
  const res = await fetch(`/api/account/contract-signature/${token}/sign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      signatureImageBase64,
      consentCheckedAt,
    }),
  });

  const data = await res.json();
  if (!res.ok || data.success === false) {
    const errorMsg =
      data.error ||
      data.message ||
      data.data?.message ||
      data.data?.error ||
      '전자서명 제출 및 계약 체결 중 오류가 발생했습니다.';
    throw new Error(errorMsg);
  }

  return data;
};
