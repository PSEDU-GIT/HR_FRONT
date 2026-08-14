import FormMonthlySalaryAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/FormMonthlySalary.action';

export default function Step2SalaryMonthlyArea() {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
          강사에게 매월 지급하고자 하는 총 지급 희망금액은 얼마인가요?
        </legend>
        <p className="text-text-sub mt-1 text-11 font-semibold">
          * 주휴수당, 식대, 추가 수당 등이 모두 포함된 최종 지급 희망 금액입니다.
        </p>
      </div>
      <FormMonthlySalaryAction />
    </div>
  );
}
