'use client';

import { User, ChevronDown } from 'lucide-react';

export default function ClickProfileAction() {
  const handleClick = () => {
    console.log('Toggle profile menu');
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-[12px] rounded-[12px] px-[8px] py-[6px] transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
      onClick={handleClick}
    >
      <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        <User size={18} className="h-[18px] w-[18px]" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[13px] leading-tight font-bold text-slate-800 dark:text-slate-200">
          총관리자 님
        </span>
        <span className="mt-0.5 text-[10px] leading-tight font-bold text-slate-400 dark:text-slate-500">
          원장
        </span>
      </div>
      <ChevronDown size={14} className="h-[14px] w-[14px] text-slate-400" />
    </div>
  );
}
