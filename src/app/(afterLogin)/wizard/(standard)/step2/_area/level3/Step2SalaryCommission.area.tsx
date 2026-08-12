'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calculateDynamicMinGuaranteeAmount } from '@/app/(afterLogin)/wizard/_lib/wageEngine';
import SelectCommissionRateAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/SelectCommissionRate.action';
import FormMinGuaranteeSalaryAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/salary/FormMinGuaranteeSalary.action';

export default function Step2SalaryCommissionArea() {
  const {
    wizDaysConfig,
    contractType,
    wizHasNonCompete,
    wizNonCompeteCalcType,
    wizNonCompetePercent,
    wizNonCompeteAmount,
  } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
      contractType: state.step1.contractType,
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompeteCalcType: state.step2.wizNonCompeteCalcType,
      wizNonCompetePercent: state.step2.wizNonCompetePercent,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
    })),
  );

  const isUnder5 = contractType?.includes('5인 미만') || contractType?.includes('5인 이하');
  const dynamicMinPay = calculateDynamicMinGuaranteeAmount(wizDaysConfig);

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
            * 비율제로 급여를 산정하더라도 근로자로 판단 시 최저임금법 준수 의무가 발생할 수
            있습니다.
          </p>
        </div>

        <FormMinGuaranteeSalaryAction />

        <div className="mt-2.5 rounded-xl border border-custom-indigo-border/80 bg-custom-indigo-bg/60 p-2.5 text-[11px] text-custom-indigo dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-200">
          <p className="font-bold leading-relaxed">
            * 매월 <strong className="underline underline-offset-2">수강료 매출 비율 정산액</strong>과{' '}
            <strong className="underline underline-offset-2">최소 보장 약정액</strong> 중{' '}
            <strong className="font-black underline">더 높은 금액</strong>이 실지급됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
