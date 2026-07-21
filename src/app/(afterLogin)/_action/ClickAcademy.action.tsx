'use client';

import { Building2, ChevronDown } from 'lucide-react';

export default function ClickAcademyAction() {
  const handleClick = () => {
    console.log('Select academy');
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-[8px] rounded-[12px] px-[12px] py-[8px] transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
      onClick={handleClick}
    >
      <Building2 size={16} className="h-[16px] w-[16px] text-indigo-600" />
      <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">
        반포점짱솔학원
      </span>
      <ChevronDown size={14} className="h-[14px] w-[14px] text-slate-400" />
    </div>
  );
}
