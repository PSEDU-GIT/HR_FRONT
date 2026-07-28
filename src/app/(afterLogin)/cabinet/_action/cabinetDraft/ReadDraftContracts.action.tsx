'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DraftContractItem {
  id: string;
  title: string;
  instructorName: string;
  instructorPhone: string;
  createdAt: string;
}

const INITIAL_DRAFTS: DraftContractItem[] = [
  {
    id: '1',
    title: '김태희 강사 파트타임 위촉계약서',
    instructorName: '김태희',
    instructorPhone: '010-4829-1928',
    createdAt: '2026. 7. 19.',
  },
];

export default function ReadDraftContractsAction() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<DraftContractItem[]>(INITIAL_DRAFTS);

  const handleDelete = (id: string) => {
    if (confirm('작성 중인 임시 저장 계약서를 삭제하시겠습니까?')) {
      setDrafts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = () => {
    router.push('/wizard/step1');
  };

  if (drafts.length === 0) return null;

  return (
    <section className="w-full">
      <div className="border-custom-slate-border flex flex-col items-start justify-between gap-3 rounded-2xl border bg-white p-3.5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="bg-custom-indigo-bg border-custom-indigo-border text-custom-indigo inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-extrabold">
            <span>작성 중</span>
          </span>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-text-title font-bold">{drafts[0].title}</span>
            <span className="text-text-sub font-semibold">
              (대상 강사: {drafts[0].instructorName} · {drafts[0].instructorPhone} · 작성일:{' '}
              {drafts[0].createdAt})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => handleDelete(drafts[0].id)}
            className="cursor-pointer rounded-xl border border-rose-200 bg-white px-2.5 py-1 text-[11px] font-bold text-rose-600 transition-all hover:bg-rose-50"
          >
            삭제
          </button>
          <button
            type="button"
            onClick={handleEdit}
            className="bg-custom-indigo hover:bg-custom-indigo-hover cursor-pointer rounded-xl px-3.5 py-1 text-[11px] font-bold text-white transition-all active:scale-95"
          >
            <span>이어 작성하기</span>
          </button>
        </div>
      </div>
    </section>
  );
}
