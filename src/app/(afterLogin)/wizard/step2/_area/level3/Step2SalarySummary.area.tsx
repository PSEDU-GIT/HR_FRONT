'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { Pencil, ArrowRight } from 'lucide-react';

export default function Step2SalarySummaryArea() {
  const {
    wizSalaryType,
    wizSalaryAmount,
    wizHourlyRate,
    wizCommissionRate,
    wizMinGuaranteeAmount,
    wizPayDay,
    wizHasTaxFree,
    wizNonTaxFood,
    wizNonTaxCar,
    wizHasNonCompete,
    wizNonCompetePeriod,
    wizNonCompeteRange,
    wizNonCompeteAmount,
    wizHasExtraAllowance,
    wizOvertimeAllowance,
    wizPositionAllowance,
    wizOtherAllowance,
    wizOtherAllowanceName,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizSalaryType: state.step2.wizSalaryType,
      wizSalaryAmount: state.step2.wizSalaryAmount,
      wizHourlyRate: state.step2.wizHourlyRate,
      wizCommissionRate: state.step2.wizCommissionRate ?? 20,
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount ?? 1883297,
      wizPayDay: state.step2.wizPayDay,
      wizHasTaxFree: state.step2.wizHasTaxFree,
      wizNonTaxFood: state.step2.wizNonTaxFood,
      wizNonTaxCar: state.step2.wizNonTaxCar,
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompetePeriod: state.step2.wizNonCompetePeriod,
      wizNonCompeteRange: state.step2.wizNonCompeteRange,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
      wizHasExtraAllowance: state.step2.wizHasExtraAllowance,
      wizOvertimeAllowance: state.step2.wizOvertimeAllowance,
      wizPositionAllowance: state.step2.wizPositionAllowance,
      wizOtherAllowance: state.step2.wizOtherAllowance,
      wizOtherAllowanceName: state.step2.wizOtherAllowanceName,
      setStep2: state.setStep2,
    })),
  );

  const goToSubStep = (step: 1 | 2 | 3 | 4 | 5) => {
    setStep2({ wizSalarySubStep: step });
  };

  const handleCompleteApply = () => {
    setStep2({
      wizSalaryDone: true,
      wizSubStep: 4,
    });
  };

  const isHourly = wizSalaryType === 'hourly';
  const isCommission = wizSalaryType === 'commission';

  return (
    <div className="space-y-4">
      {/* 통일감 있고 깔끔한 라인 리스트 카드 레이아웃 */}
      <div className="border-custom-slate-border divide-custom-slate-border/60 divide-y overflow-hidden rounded-2xl border bg-white shadow-2xs">
        {/* 1. 기본 급여 / 비율 / 시급 */}
        <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <span className="w-24 shrink-0 text-xs font-semibold text-text-side">
              {isHourly ? '약정 시급' : isCommission ? '비율제 수수료율' : '기본 지급액'}
            </span>
            <span className="truncate text-xs font-bold text-text-main">
              {isHourly
                ? `시간당 ${wizHourlyRate ? wizHourlyRate.toLocaleString() : 10320}원`
                : isCommission
                  ? `${wizCommissionRate}% (최소보장 ${wizMinGuaranteeAmount ? wizMinGuaranteeAmount.toLocaleString() : 0}원)`
                  : `월 ${wizSalaryAmount ? wizSalaryAmount.toLocaleString() : 0}원`}
            </span>
          </div>
          <button
            type="button"
            onClick={() => goToSubStep(1)}
            className="text-text-side hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-custom-indigo-bg"
            title="금액 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 2. 급여 지급일 */}
        <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <span className="w-24 shrink-0 text-xs font-semibold text-text-side">급여 지급일</span>
            <span className="truncate text-xs font-bold text-text-main">매월 {wizPayDay}</span>
          </div>
          <button
            type="button"
            onClick={() => goToSubStep(2)}
            className="text-text-side hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-custom-indigo-bg"
            title="급여일 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {!isHourly && (
          <>
            {/* 3. 비과세 수당 */}
            <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">비과세 수당</span>
                <span className="truncate text-xs font-bold text-text-main">
                  {wizHasTaxFree
                    ? `식대: ${wizNonTaxFood.toLocaleString()}원${wizNonTaxCar > 0 ? ` / 자가운전: ${wizNonTaxCar.toLocaleString()}원` : ''}`
                    : '미적용'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => goToSubStep(3)}
                className="text-text-side hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-custom-indigo-bg"
                title="비과세 수당 수정"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 4. 경업금지 약정 */}
            <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">경업금지 약정</span>
                <span className="truncate text-xs font-bold text-text-main">
                  {wizHasNonCompete
                    ? `${wizNonCompetePeriod} / ${wizNonCompeteRange} (${wizNonCompeteAmount.toLocaleString()}원)`
                    : '약정 없음'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => goToSubStep(4)}
                className="text-text-side hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-custom-indigo-bg"
                title="경업금지 약정 수정"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 5. 추가 고정수당 */}
            <div className="flex items-center justify-between p-3.5 transition-colors hover:bg-slate-50/60">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">추가 고정수당</span>
                <span className="truncate text-xs font-bold text-text-main">
                  {wizHasExtraAllowance
                    ? [
                        wizPositionAllowance > 0 &&
                          `직책: ${wizPositionAllowance.toLocaleString()}원`,
                        wizOvertimeAllowance > 0 &&
                          `연장: ${wizOvertimeAllowance.toLocaleString()}원`,
                        wizOtherAllowance > 0 &&
                          `${wizOtherAllowanceName || '기타'}: ${wizOtherAllowance.toLocaleString()}원`,
                      ]
                        .filter(Boolean)
                        .join(' / ') || '추가 수당 없음'
                    : '추가 수당 없음'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => goToSubStep(5)}
                className="text-text-side hover:text-custom-indigo shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-custom-indigo-bg"
                title="추가 고정수당 수정"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        )}
      </div>

      <footer className="pt-1">
        <button
          type="button"
          onClick={handleCompleteApply}
          className="border-custom-slate-border text-text-title flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border bg-white py-2.5 text-xs font-bold transition-all hover:bg-slate-50 active:scale-[0.99]"
        >
          <span>급여 및 수당 설정 완료</span>
          <ArrowRight className="text-text-side h-3.5 w-3.5" />
        </button>
      </footer>
    </div>
  );
}
