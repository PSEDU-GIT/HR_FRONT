import { Suspense } from 'react';
import ReadDraftContractsAction from './_action/cabinetDraft/ReadDraftContracts.action';
import CabinetTableArea from './_area/CabinetTable.area';
import CabinetFilterArea from './_area/CabinetFilter.area';

function CabinetSkeleton() {
  return (
    <div className="w-full animate-pulse p-8 text-center text-xs font-semibold text-slate-400">
      계약서 보관함 데이터를 불러오는 중...
    </div>
  );
}

export default function CabinetPage() {
  return (
    <div className="w-full space-y-6 pt-4">
      <ReadDraftContractsAction />
      <section className="border-custom-slate-border bg-background rounded-3xl border p-6">
        <Suspense fallback={<CabinetSkeleton />}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <CabinetTableArea />
            <CabinetFilterArea />
          </div>
        </Suspense>
      </section>
    </div>
  );
}
