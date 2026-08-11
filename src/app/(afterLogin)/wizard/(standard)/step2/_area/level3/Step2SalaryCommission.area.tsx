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
  const dynamicMinPay = calculateDynamicMinGuaranteeAmount(wizDaysConfig, isUnder5, {
    hasNonCompete: wizHasNonCompete,
    calcType: wizNonCompeteCalcType,
    percent: wizNonCompetePercent,
    manualAmount: wizNonCompeteAmount,
  });

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

        <p className="text-text-sub mt-1 text-[11px] leading-relaxed font-medium">
          * 2026년 법정 최저 보장 가이드액: {dynamicMinPay.toLocaleString()}원
        </p>
      </div>
    </div>
  );
}
