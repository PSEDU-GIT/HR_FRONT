'use client';

import { Moon } from 'lucide-react';

export default function ClickDarkModeAction() {
  const handleClick = () => {
    console.log('Toggle theme');
  };

  return (
    <button
      className="text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all"
      title="테마 변경"
      onClick={handleClick}
    >
      <Moon className="h-4 w-4" />
    </button>
  );
}
