'use client';

import { User } from 'lucide-react';

export default function ClickProfileAction() {
  const handleClick = () => {
    console.log('Toggle profile menu');
  };

  return (
    <div
      className="flex cursor-pointer items-center transition-colors"
      onClick={handleClick}
      title="내 정보 설정"
      aria-label="내 정보 설정"
    >
      <div className="border-custom-slate-border text-text-side flex h-8 w-8 items-center justify-center rounded-full border transition-all hover:border-custom-indigo-border hover:bg-custom-indigo-bg hover:text-custom-indigo">
        <User className="h-4 w-4" />
      </div>
    </div>
  );
}
