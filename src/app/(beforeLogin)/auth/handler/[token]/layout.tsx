import React from 'react';

interface TokenLayoutProps {
  children: React.ReactNode;
}

export default function TokenLayout({ children }: TokenLayoutProps) {
  return (
    <div className="min-h-dvh w-full bg-background text-text-main selection:bg-custom-indigo selection:text-white dark:bg-slate-950 dark:text-slate-100">
      {/* Shared Header matching project theme */}
      <header className="border-custom-slate-border flex h-14 w-full items-center justify-between border-b px-5 dark:border-slate-800">
        <span className="text-text-title text-sm font-extrabold tracking-tight dark:text-slate-100">
          학온 HR
        </span>
        <span className="text-text-sub text-xs font-medium dark:text-slate-400">
          전자계약
        </span>
      </header>

      {children}
    </div>
  );
}
