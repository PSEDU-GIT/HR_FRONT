import FormMonthlySalaryAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/FormMonthlySalary.action';

export default function Step2SalaryMonthlyArea() {
  return (
    <div className="space-y-3 pt-2">
      <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase dark:text-slate-300">
        강사에게 매월 지급하고자 하는 총 급여(월 지급액)는 얼마인가요?
      </legend>
      <FormMonthlySalaryAction />
    </div>
  );
}
