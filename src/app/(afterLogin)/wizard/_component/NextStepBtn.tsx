'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import cx from 'classnames';

interface NextStepBtnProps {
  className?: string;
}

export default function NextStepBtn({ className }: NextStepBtnProps) {
  const pathname = usePathname();
  const router = useRouter();

  const getActiveStep = () => {
    if (pathname.includes('/step4')) return 4;
    if (pathname.includes('/step3')) return 3;
    if (pathname.includes('/step2')) return 2;
    return 1;
  };

  const activeStep = getActiveStep();

  const getNextStepPath = () => {
    if (activeStep === 1) return '/wizard/step2';
    if (activeStep === 2) return '/wizard/step3';
    if (activeStep === 3) return '/wizard/step4';
    return '/dashboard';
  };

  const handleNextStep = () => {
    router.push(getNextStepPath());
  };

  return (
    <button
      type="button"
      onClick={handleNextStep}
      className={cx(
        'flex cursor-pointer items-center justify-center space-x-1 rounded-xl bg-slate-900 px-4 py-2 text-xs font-black text-white shadow-sm transition-all duration-200 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200',
        className ? className : 'absolute top-[14px] right-8 w-48',
      )}
    >
      <span>{activeStep === 4 ? '작성 완료' : '다음 단계로'}</span>
      <ArrowRight size={14} />
    </button>
  );
}
