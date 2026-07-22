'use client';

import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { MAX_SALARY_AMOUNT } from '@/app/(afterLogin)/wizard/step2/_state/salaryUtils';
import cx from 'classnames';

const PRESET_RATES = [20, 30, 40];
const DEFAULT_MIN_GUARANTEE = 1883297;

export default function FormCommissionSalaryAction() {
  const {
    wizCommissionRate,
    wizMinGuaranteeAmount,
    wizIsCustomCommission,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizCommissionRate: state.step2.wizCommissionRate ?? 20,
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount ?? DEFAULT_MIN_GUARANTEE,
      wizIsCustomCommission: state.step2.wizIsCustomCommission ?? false,
      setStep2: state.setStep2,
    })),
  );

  const handleSelectPreset = (rate: number) => {
    setStep2({
      wizCommissionRate: rate,
      wizIsCustomCommission: false,
    });
  };

  const handleSelectCustom = () => {
    setStep2({
      wizIsCustomCommission: true,
    });
  };

  const handleCustomRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > 100) num = 100;
    setStep2({ wizCommissionRate: num });
  };

  const handleMinGuaranteeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > MAX_SALARY_AMOUNT) {
      num = MAX_SALARY_AMOUNT;
    }
    setStep2({ wizMinGuaranteeAmount: num });
  };

  return (
    <div className="space-y-6 pt-1">
      {/* Top: Commission Rate Selection */}
      <div className="space-y-3">
        <h3 className="text-text-main text-xs font-extrabold tracking-widest uppercase">
          매출액 대비 수수료 지급 비율은 몇 %인가요?
        </h3>
        <div className="grid grid-cols-4 gap-2.5">
          {PRESET_RATES.map((rate) => {
            const isSelected = !wizIsCustomCommission && wizCommissionRate === rate;
            return (
              <button
                key={rate}
                type="button"
                onClick={() => handleSelectPreset(rate)}
                className={cx(
                  'flex items-center justify-center rounded-2xl py-3.5 text-sm font-extrabold transition-all cursor-pointer active:scale-[0.98]',
                  isSelected
                    ? 'bg-custom-indigo text-white shadow-sm'
                    : 'border-custom-slate-border border bg-white text-slate-800 hover:bg-slate-50',
                )}
              >
                {rate}%
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleSelectCustom}
            className={cx(
              'flex items-center justify-center rounded-2xl py-3.5 text-sm font-extrabold transition-all cursor-pointer active:scale-[0.98]',
              wizIsCustomCommission
                ? 'bg-custom-indigo text-white shadow-sm'
                : 'border-custom-slate-border border bg-white text-slate-800 hover:bg-slate-50',
            )}
          >
            직접 입력
          </button>
        </div>

        {wizIsCustomCommission && (
          <div className="relative mt-2.5">
            <input
              type="text"
              value={wizCommissionRate === 0 ? '' : wizCommissionRate.toString()}
              onChange={handleCustomRateChange}
              placeholder="0"
              className="border-custom-slate-border text-text-title w-full rounded-2xl border bg-white p-4 pr-12 text-sm font-bold transition-all focus:border-custom-indigo focus:outline-none"
            />
            <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold">
              %
            </span>
          </div>
        )}
      </div>

      {/* Bottom: Minimum Guarantee Amount */}
      <div className="border-custom-slate-border space-y-3 border-t pt-5">
        <div>
          <h3 className="text-text-main text-xs font-extrabold tracking-widest uppercase">
            최소 보장 금액을 설정할까요?
          </h3>
          <p className="text-text-sub mt-1.5 text-[11px] leading-relaxed font-medium">
            비율제로 급여를 산정하더라도 근로자로 판단 시 최저임금법 준수 의무가 발생할 수 있습니다.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={
              wizMinGuaranteeAmount === 0
                ? ''
                : wizMinGuaranteeAmount.toLocaleString()
            }
            onChange={handleMinGuaranteeChange}
            placeholder="1,883,297"
            className="border-custom-slate-border text-text-title w-full rounded-2xl border bg-white p-4 pr-12 text-sm font-bold transition-all focus:border-custom-indigo focus:outline-none"
          />
          <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold">
            원
          </span>
        </div>

        <p className="text-text-sub text-[11px] leading-relaxed font-medium">
          * 법정 최저 보장 가이드액: 1,883,297원
        </p>
      </div>
    </div>
  );
}
