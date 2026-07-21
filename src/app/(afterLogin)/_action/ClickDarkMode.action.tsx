'use client';

import { Moon } from 'lucide-react';

export default function ClickDarkModeAction() {
  const handleClick = () => {
    console.log('Toggle theme');
  };

  return (
    <button
      className="flex h-[40px] w-[40px] items-center justify-center rounded-[12px] text-slate-500 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
      title="테마 변경"
      onClick={handleClick}
    >
      <Moon size={20} className="h-[20px] w-[20px]" />
    </button>
  );
}
