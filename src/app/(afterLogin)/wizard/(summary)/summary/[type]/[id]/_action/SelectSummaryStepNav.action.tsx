'use client';

import { usePathname, useParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const TYPE_STEP_MAP: Record<string, string> = {
  edit: '1. 계약 수정',
  load: '1. 계약서 불러오기',
  draft: '1. 임시 저장 계약 작성',
};

export default function SelectSummaryStepNavAction() {
  const pathname = usePathname();
  const params = useParams<{ type?: string; id?: string }>();
  const isPreviewPage = pathname.includes('/preview');

  const type = params?.type || 'draft';
  const id = params?.id || 'new';

  const step1Text = TYPE_STEP_MAP[type] || '1. 계약 요약 및 수정';

  const summaryPath = `/wizard/summary/${type}/${id}`;
  const previewPath = `/wizard/summary/${type}/${id}/preview`;

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1.5 text-[13px]">
      <div className="flex shrink-0 items-center gap-2">
        {!isPreviewPage ? (
          <span className="text-custom-indigo cursor-default font-black transition-all duration-200">
            {step1Text}
          </span>
        ) : (
          <Link
            href={summaryPath}
            className="text-slate-450 font-bold transition-all duration-200 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            {step1Text}
          </Link>
        )}
        <ChevronRight size={12} className="text-slate-300 dark:text-slate-600" />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {isPreviewPage ? (
          <span className="text-custom-indigo cursor-default font-black transition-all duration-200">
            2. 초안검토
          </span>
        ) : (
          <Link
            href={previewPath}
            className="text-slate-450 font-bold transition-all duration-200 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            2. 초안검토
          </Link>
        )}
      </div>
    </div>
  );
}
