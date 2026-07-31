'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SelectSummaryStepNavAction() {
  const pathname = usePathname();
  const isPreviewPage = pathname.includes('/preview');

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1.5 text-[13px]">
      <div className="flex shrink-0 items-center gap-2">
        {!isPreviewPage ? (
          <span className="text-custom-indigo cursor-default font-black transition-all duration-200">
            1. 계약 요약 및 수정
          </span>
        ) : (
          <Link
            href="/wizard/summary"
            className="text-slate-450 font-bold transition-all duration-200 hover:text-slate-800"
          >
            1. 계약 요약 및 수정
          </Link>
        )}
        <ChevronRight size={12} className="text-slate-300" />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {isPreviewPage ? (
          <span className="text-custom-indigo cursor-default font-black transition-all duration-200">
            2. 초안검토
          </span>
        ) : (
          <Link
            href="/wizard/summary/preview"
            className="text-slate-450 font-bold transition-all duration-200 hover:text-slate-800"
          >
            2. 초안검토
          </Link>
        )}
      </div>
    </div>
  );
}
