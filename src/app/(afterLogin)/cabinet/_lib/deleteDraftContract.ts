export const deleteDraftContract = async (
  draftId: number,
): Promise<{ message?: string; code?: number }> => {
  const res = await fetch(`/api/hr/contract/draft/${draftId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData?.message || errorData?.error || '임시저장 계약서 삭제에 실패했습니다.',
    );
  }

  return res.json();
};
