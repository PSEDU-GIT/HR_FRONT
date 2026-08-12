import FormMonthlySalaryAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/FormMonthlySalary.action';

export default function Step2SalaryMonthlyArea() {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase dark:text-slate-300">
          강사에게 매월 지급하고자 하는 월 지급액은 얼마인가요?
        </legend>
        <p className="text-text-sub mt-1 text-[11px] font-semibold dark:text-slate-400">
          * 추가로 붙는 수당 제외
        </p>
      </div>
      <FormMonthlySalaryAction />
    </div>
  );
}
