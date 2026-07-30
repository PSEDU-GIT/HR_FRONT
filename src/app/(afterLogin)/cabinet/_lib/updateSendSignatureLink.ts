export const updateSendSignatureLink = async (
  contractId: number,
): Promise<{ message?: string; code?: number }> => {
  const res = await fetch(`/api/hr/contract/${contractId}/send-signature-link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.message || '카카오톡 서명 링크 발송에 실패했습니다.');
  }

  return res.json();
};
