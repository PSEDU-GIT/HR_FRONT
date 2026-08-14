import SelectSalaryPayDayAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/SelectSalaryPayDay.action';

export default function Step2SalaryPayDayArea() {
  return (
    <div className="space-y-2.5 pt-2">
      <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
        매월 급여는 언제 지급되나요?
      </legend>
      <SelectSalaryPayDayAction />
      <p className="text-text-sub mt-1.5 text-11 leading-relaxed font-medium">
        * 계약서에 지급일이 명시되지 않을 시 근로조건 서면 명시 의무 위반 소지가 될 수 있습니다.
      </p>
    </div>
  );
}
