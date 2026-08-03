'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import cx from 'classnames';

interface ClickPrevSummaryStepActionProps {
  className?: string;
  targetPath?: string;
}

export default function ClickPrevSummaryStepAction({
  className,
  targetPath,
}: ClickPrevSummaryStepActionProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePrev = () => {
    if (targetPath) {
      router.push(targetPath);
    } else if (pathname.includes('/preview')) {
      router.push(pathname.replace('/preview', ''));
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrev}
      className={cx(
        'border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex cursor-pointer items-center justify-center space-x-1 rounded-xl border bg-white px-3 py-2 text-xs font-bold transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
        className,
      )}
    >
      <ChevronLeft size={14} />
      <span>이전 단계</span>
    </button>
  );
}
