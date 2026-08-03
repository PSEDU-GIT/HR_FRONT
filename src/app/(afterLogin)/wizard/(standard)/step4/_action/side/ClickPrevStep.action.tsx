'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import cx from 'classnames';

interface ClickPrevStepActionProps {
  className?: string;
}

export default function ClickPrevStepAction({ className }: ClickPrevStepActionProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push('/wizard/step3')}
      className={cx(
        'border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex cursor-pointer items-center justify-center space-x-1 rounded-xl border bg-white px-3 py-2 text-xs font-bold transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
        className,
      )}
    >
      <ChevronLeft size={14} />
      <span>이전</span>
    </button>
  );
}
