import React from 'react';
import Alert from '@/app/_component/alert/Alert';

interface TokenLayoutProps {
  children: React.ReactNode;
}

export default function TokenLayout({ children }: TokenLayoutProps) {
  return (
    <div className="bg-background text-text-main selection:bg-custom-indigo min-h-dvh w-full selection:text-white dark:bg-slate-950 dark:text-slate-100">
      <header className="border-custom-slate-border flex h-14 w-full items-center justify-between border-b px-5 dark:border-slate-800">
        <span className="text-text-title text-sm font-extrabold tracking-tight dark:text-slate-100">
          학온 HR
        </span>
        <span className="text-text-sub text-xs font-medium dark:text-slate-400">전자계약</span>
      </header>

      <div className="fixed top-4 left-1/2 z-[100] w-full max-w-md -translate-x-1/2 px-4">
        <Alert />
      </div>

      {children}
    </div>
  );
}
