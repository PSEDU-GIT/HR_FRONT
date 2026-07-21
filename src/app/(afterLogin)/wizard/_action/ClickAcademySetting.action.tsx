'use client';

import { Building } from 'lucide-react';

export default function ClickAcademySettingAction() {
  const handleClick = () => {
    console.log('Navigate to academy settings');
  };

  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-black text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50"
      title="클릭하여 학원 정보 설정 페이지로 이동"
      onClick={handleClick}
    >
      <Building size={14} className="text-slate-500" />
      <span>목동 학온 캠퍼스</span>
      <span className="text-[10px] font-bold text-slate-400">(학원 설정 이동)</span>
    </button>
  );
}
