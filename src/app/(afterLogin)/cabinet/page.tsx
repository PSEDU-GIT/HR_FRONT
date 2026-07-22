import ReadDraftContractsAction from './_action/cabinetDraft/ReadDraftContracts.action';
import CabinetTableArea from './_area/CabinetTable.area';
import CabinetFilterArea from './_area/CabinetFilter.area';

export default function CabinetPage() {
  return (
    <div className="w-full space-y-6 pt-4">
      <ReadDraftContractsAction />
      <section className="border-custom-slate-border-side bg-background rounded-3xl border p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <CabinetTableArea />
          <CabinetFilterArea />
        </div>
      </section>
    </div>
  );
}
