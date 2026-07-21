import FormExtraAllowanceAction from '@/app/(afterLogin)/wizard/step2/_action/salary/FormExtraAllowance.action';

export default function Step2ExtraAllowanceArea() {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
          직책수당, 고정연장수당 등의 추가적인 고정수당이 있습니까?
        </legend>
        <p className="text-text-sub mt-1.5 text-[11px] leading-relaxed font-medium">
          * 계약서에 추가 고정수당 항목을 별도로 표기할 수 있습니다.
        </p>
      </div>
      <FormExtraAllowanceAction />
    </div>
  );
}
