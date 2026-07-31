'use client';

import SelectSummaryStepNavAction from '@/app/(afterLogin)/wizard/(summary)/_action/SelectSummaryStepNav.action';

export default function SummaryWizardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-16 items-center justify-between">
        <header className="flex flex-1 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-text-title font-extrabold tracking-tight">계약서 요약 및 수정</h2>
          </div>
          <SelectSummaryStepNavAction />
        </header>

        <div className="ml-6 flex w-[540px] shrink-0 justify-end" />
      </div>

      {children}
    </>
  );
}
