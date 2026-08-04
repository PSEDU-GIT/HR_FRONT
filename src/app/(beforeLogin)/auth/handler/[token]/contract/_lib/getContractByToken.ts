export const getContractByToken = async (token: string) => {
  const res = await fetch(`/api/account/contract-signature/${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || '계약서 정보를 불러올 수 없습니다. (인증이 만료되었거나 올바르지 않습니다.)');
  }

  return data;
};
