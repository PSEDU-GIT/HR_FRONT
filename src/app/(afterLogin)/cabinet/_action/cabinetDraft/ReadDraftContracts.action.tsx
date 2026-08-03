'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useDraftContractsState,
  getDraftContractsQueryKey,
} from '@/app/(afterLogin)/cabinet/_state/getDraftContracts.state';
import { deleteDraftContract } from '@/app/(afterLogin)/cabinet/_lib/deleteDraftContract';
import { formatPhoneNumber } from '@/app/util/formatPhoneNumber.util';

const getContractTypeLabel = (type: string) => {
  switch (type) {
    case 'TEACHER':
      return '강사근로계약서';
    case 'FREELANCER':
      return '프리랜서계약서';
    case 'GENERAL_STAFF':
      return '일반직원계약서';
    default:
      return '계약서';
  }
};

const getFormattedDate = (dateString: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
};

export default function ReadDraftContractsAction() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: drafts, isLoading } = useDraftContractsState();

  const { mutate: deleteDraft } = useMutation({
    mutationFn: (id: number) => deleteDraftContract(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getDraftContractsQueryKey });
    },
    onError: (error: any) => {
      console.error('임시저장 계약서 삭제 실패:', error);
      alert(error.message || '임시저장 계약서 삭제 중 오류가 발생했습니다.');
    },
  });

  const draftList = Array.isArray(drafts) ? drafts : [];

  if (isLoading || draftList.length === 0) return null;

  const handleDelete = (id: number) => {
    if (confirm('작성 중인 임시 저장 계약서를 삭제하시겠습니까?')) {
      deleteDraft(id);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/wizard/summary/draft/${id}`);
  };

  return (
    <section className="w-full space-y-3">
      {draftList.map((draft) => {
        const name = draft.counterpartyName || '미지정 강사';
        const phone = formatPhoneNumber(draft.counterpartyPhone) || '';
        const title = `${name} ${getContractTypeLabel(draft.contractType)}`;
        const updatedDate = getFormattedDate(draft.updatedAt);

        return (
          <div
            key={draft.id}
            className="border-custom-slate-border flex flex-col items-start justify-between gap-3 rounded-2xl border bg-white p-3.5 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-3">
              <span className="bg-custom-indigo-bg border-custom-indigo-border text-custom-indigo inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-extrabold">
                <span>작성 중</span>
              </span>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-text-title font-bold">{title}</span>
                <span className="text-text-sub font-semibold">
                  (대상 강사: {name}
                  {phone ? ` · ${phone}` : ''}
                  {draft.createdByName ? ` · 작성자: ${draft.createdByName}` : ''} · 작성일:{' '}
                  {updatedDate})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => handleDelete(draft.id)}
                className="cursor-pointer rounded-xl border border-rose-200 bg-white px-2.5 py-1 text-[11px] font-bold text-rose-600 transition-all hover:bg-rose-50"
              >
                삭제
              </button>
              <button
                type="button"
                onClick={() => handleEdit(draft.id)}
                className="bg-custom-indigo hover:bg-custom-indigo-hover cursor-pointer rounded-xl px-3.5 py-1 text-[11px] font-bold text-white transition-all active:scale-95"
              >
                <span>이어 작성하기</span>
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
