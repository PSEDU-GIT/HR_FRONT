'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function ClickLogoutAction() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-text-main hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors"
    >
      <LogOut className="h-3.5 w-3.5" />
      <span>로그아웃</span>
    </button>
  );
}
