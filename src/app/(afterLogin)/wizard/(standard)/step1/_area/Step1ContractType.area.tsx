import SelectContractTypeAction from '@/app/(afterLogin)/wizard/(standard)/step1/_action/contractType/SelectContractType.action';

export default function Step1ContractTypeArea() {
  return (
    <article className="border-custom-slate-border-side dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 rounded-3xl border p-6 transition-colors">
      <h3 className="text-15 text-text-title dark:text-slate-100 font-bold">계약 유형</h3>
      <SelectContractTypeAction />
    </article>
  );
}
