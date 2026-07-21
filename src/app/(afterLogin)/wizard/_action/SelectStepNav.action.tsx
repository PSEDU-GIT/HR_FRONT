'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SelectStepNavAction() {
  const pathname = usePathname();

  const getActiveStep = () => {
    if (pathname.includes('/step4')) return 4;
    if (pathname.includes('/step3')) return 3;
    if (pathname.includes('/step2')) return 2;
    return 1;
  };

  const activeStep = getActiveStep();

  const renderStepLink = (targetStep: number, label: string) => {
    const isCurrent = activeStep === targetStep;
    const isClickable = targetStep <= activeStep;

    if (isCurrent) {
      return (
        <span className="text-custom-indigo cursor-default font-black transition-all duration-200">
          {label}
        </span>
      );
    }

    if (isClickable) {
      return (
        <Link
          href={`/wizard/step${targetStep}`}
          className="text-slate-450 font-bold transition-all duration-200 hover:text-slate-800"
        >
          {label}
        </Link>
      );
    }

    return (
      <span className="cursor-not-allowed font-medium text-slate-300 transition-all duration-200">
        {label}
      </span>
    );
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1.5 text-[13px]">
      <div className="flex shrink-0 items-center gap-2">
        {renderStepLink(1, '1. 강사 및 계약 설정')}
        <ChevronRight size={12} className="text-slate-300" />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {renderStepLink(2, '2. 근무 및 급여설정')}
        <ChevronRight size={12} className="text-slate-300" />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {renderStepLink(3, '3. 특약/자문')}
        <ChevronRight size={12} className="text-slate-300" />
      </div>
      <div className="flex shrink-0 items-center gap-2">{renderStepLink(4, '4. 초안검토')}</div>
    </div>
  );
}
