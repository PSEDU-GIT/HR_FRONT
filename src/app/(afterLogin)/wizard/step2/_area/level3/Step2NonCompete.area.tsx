import FormNonCompeteAction from '@/app/(afterLogin)/wizard/step2/_action/salary/FormNonCompete.action';

export default function Step2NonCompeteArea() {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
          퇴직 후 경쟁업체 근무를 제한하는 경업금지 약정이 있습니까?
        </legend>
        <p className="text-text-sub mt-1.5 text-[11px] leading-relaxed font-medium">
          * 경업금지 약정은 효력을 지니기 위해 법적으로 적절한 대가(수당 등)를 근로자에게 지급하는
          조건이 필요합니다.
        </p>
      </div>
      <FormNonCompeteAction />
    </div>
  );
}
