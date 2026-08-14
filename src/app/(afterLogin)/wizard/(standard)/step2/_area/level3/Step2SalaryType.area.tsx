import SelectSalaryTypeAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/SelectSalaryType.action';
import ClickApplySalaryTypeAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/ClickApplySalaryType.action';

export default function Step2SalaryTypeArea() {
  return (
    <div className="space-y-4">
      <div>
        <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
          급여 지급 형태를 선택하세요
        </legend>
        <p className="text-text-sub mt-1.5 text-11 leading-relaxed font-medium">
          * 고정월급제, 비율제, 시급제 중 하나를 선택하면 해당 형태에 맞춰 작성됩니다.
        </p>
      </div>

      <SelectSalaryTypeAction />

      <footer className="pt-2">
        <ClickApplySalaryTypeAction />
      </footer>
    </div>
  );
}
