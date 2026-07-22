'use client';

import SelectCommissionRateAction from '@/app/(afterLogin)/wizard/step2/_action/salary/SelectCommissionRate.action';
import FormMinGuaranteeSalaryAction from '@/app/(afterLogin)/wizard/step2/_action/salary/FormMinGuaranteeSalary.action';

export default function Step2SalaryCommissionArea() {
  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
          매출액 대비 수수료 지급 비율은 몇 %인가요?
        </legend>
        <SelectCommissionRateAction />
      </div>

      <div className="space-y-2 pt-2">
        <div>
          <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
            최소 보장 금액을 설정할까요?
          </legend>
          <p className="text-text-sub mt-1.5 text-[11px] leading-relaxed font-medium">
            * 비율제로 급여를 산정하더라도 근로자로 판단 시 최저임금법 준수 의무가 발생할 수 있습니다.
          </p>
        </div>

        <FormMinGuaranteeSalaryAction />

        <p className="text-text-sub mt-1 text-[11px] leading-relaxed font-medium">
          * 2026년 법정 최저 보장 가이드액: 1,883,297원
        </p>
      </div>
    </div>
  );
}
