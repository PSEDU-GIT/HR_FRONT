'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, Type } from 'lucide-react';

export default function ClickFontScaleAction() {
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const saved = localStorage.getItem('font-size');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 12 && parsed <= 24) {
        setFontSize(parsed);
        document.documentElement.style.setProperty('--font-size', `${parsed}px`);
      }
    } else {
      document.documentElement.style.setProperty('--font-size', '18px');
    }
  }, []);

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const next = Math.max(12, Math.min(24, prev + delta));
      localStorage.setItem('font-size', next.toString());
      document.documentElement.style.setProperty('--font-size', `${next}px`);
      return next;
    });
  };

  const percentage = Math.round((fontSize / 16) * 100);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 p-1.5 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
        <Type size={14} />
      </div>
      <button
        onClick={() => changeFontSize(-1)}
        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
        title="글자 크기 축소"
      >
        <Minus size={14} />
      </button>
      <span className="w-10 text-center text-[11px] font-black text-slate-700 dark:text-slate-300">
        {percentage}%
      </span>
      <button
        onClick={() => changeFontSize(1)}
        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
        title="글자 크기 확대"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
