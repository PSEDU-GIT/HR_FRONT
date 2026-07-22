'use client';

import ClickAcademySettingAction from '@/app/(afterLogin)/wizard/_action/ClickAcademySetting.action';
import SelectStepNavAction from '@/app/(afterLogin)/wizard/_action/SelectStepNav.action';

export default function WizardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-full flex-1 overflow-hidden pt-0">
      <div className="flex min-h-16 items-center justify-between">
        <header className="flex flex-1 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-text-title font-extrabold tracking-tight">계약서 작성</h2>
            <ClickAcademySettingAction />
          </div>
          <SelectStepNavAction />
        </header>

        <div className="ml-6 flex w-[540px] shrink-0 justify-end" />
      </div>

      {children}
    </div>
  );
}
