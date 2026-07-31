'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import cx from 'classnames';

interface ClickPrevSummaryStepActionProps {
  className?: string;
  targetPath?: string;
}

export default function ClickPrevSummaryStepAction({ className, targetPath }: ClickPrevSummaryStepActionProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(targetPath || '/wizard/step1')}
      className={cx(
        'border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex cursor-pointer items-center justify-center space-x-1 rounded-xl border bg-white px-3 py-2 text-xs font-bold transition-all',
        className,
      )}
    >
      <ChevronLeft size={14} />
      <span>이전 단계</span>
    </button>
  );
}
