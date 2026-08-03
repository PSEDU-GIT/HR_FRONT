import SelectSummaryStepNavAction from './_action/SelectSummaryStepNav.action';

const TYPE_TITLE_MAP: Record<string, string> = {
  edit: '계약서 수정',
  load: '계약서 불러오기',
  draft: '임시 저장 계약서 작성',
};

interface SummaryWizardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ type: string; id: string }>;
}

export default async function SummaryWizardLayout({
  children,
  params,
}: SummaryWizardLayoutProps) {
  const { type } = await params;
  const title = TYPE_TITLE_MAP[type] || '계약서 요약 및 수정';

  return (
    <>
      <div className="flex min-h-16 items-center justify-between">
        <header className="flex flex-1 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-text-title font-extrabold tracking-tight">{title}</h2>
          </div>
          <SelectSummaryStepNavAction />
        </header>

        <div className="ml-6 flex w-[540px] shrink-0 justify-end" />
      </div>

      {children}
    </>
  );
}
