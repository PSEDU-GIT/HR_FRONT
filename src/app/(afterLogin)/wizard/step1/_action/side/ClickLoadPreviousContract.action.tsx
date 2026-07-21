'use client';

import { RotateCcw } from 'lucide-react';

export default function ClickLoadPreviousContractAction() {
  const handleLoad = () => {
    // 이전 계약 조건 불러오기 mock 액션
  };

  return (
    <button
      type="button"
      onClick={handleLoad}
      className="border-custom-slate-border/80 bg-custom-slate-bg hover:bg-custom-slate-hover text-text-main hover:text-custom-indigo flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all"
    >
      <RotateCcw size={12} className="shrink-0" />
      <span>조건 불러오기</span>
    </button>
  );
}
