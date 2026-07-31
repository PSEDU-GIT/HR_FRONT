import FormMonthlySalaryAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/FormMonthlySalary.action';

export default function Step2SalaryMonthlyArea() {
  return (
    <div className="space-y-3 pt-2">
      <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
        매월 지급할 희망 수령액은 얼마인가요?
      </legend>
      <FormMonthlySalaryAction />
    </div>
  );
}
