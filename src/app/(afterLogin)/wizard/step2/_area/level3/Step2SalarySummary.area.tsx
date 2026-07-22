'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { Pencil, ArrowRight } from 'lucide-react';

export default function Step2SalarySummaryArea() {
  const {
    wizSalaryType,
    wizSalaryAmount,
    wizHourlyRate,
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

  return (
    <div className="space-y-4">
      {/* 요약 2열 카드 그리드 레이아웃 */}
      <div className="grid grid-cols-2 gap-2">
        {/* 1. 시급 또는 월급 */}
        <div className="border-custom-slate-border flex items-center justify-between rounded-xl border bg-white px-3 py-2 shadow-2xs">
          <div className="min-w-0 pr-1">
            <span className="text-text-side block truncate text-[10px] font-semibold">
              {isHourly ? '약정 시급' : '기본 지급액 (월급)'}
            </span>
            <p className="text-text-main mt-0.5 truncate text-xs font-bold">
              {isHourly
                ? `시간당 ${wizHourlyRate ? wizHourlyRate.toLocaleString() : 10320}원`
                : `월 ${wizSalaryAmount ? wizSalaryAmount.toLocaleString() : 0}원`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => goToSubStep(1)}
            className="text-text-side hover:text-text-main shrink-0 cursor-pointer rounded-lg p-1 transition-colors"
            title="금액 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 2. 급여 지급일 */}
        <div className="border-custom-slate-border flex items-center justify-between rounded-xl border bg-white px-3 py-2 shadow-2xs">
          <div className="min-w-0 pr-1">
            <span className="text-text-side block truncate text-[10px] font-semibold">
              급여 지급일
            </span>
            <p className="text-text-main mt-0.5 truncate text-xs font-bold">매월 {wizPayDay}</p>
          </div>
          <button
            type="button"
            onClick={() => goToSubStep(2)}
            className="text-text-side hover:text-text-main shrink-0 cursor-pointer rounded-lg p-1 transition-colors"
            title="급여일 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 고정급일 때만 아래 3, 4, 5번 세부 수당 노출 */}
        {!isHourly && (
          <>
            {/* 3. 비과세 수당 */}
            <div className="border-custom-slate-border flex items-center justify-between rounded-xl border bg-white px-3 py-2 shadow-2xs">
              <div className="min-w-0 pr-1">
                <span className="text-text-side block truncate text-[10px] font-semibold">
                  비과세 수당
                </span>
                <p className="text-text-main mt-0.5 truncate text-xs font-bold">
                  {wizHasTaxFree
                    ? `식대: ${wizNonTaxFood.toLocaleString()}원${wizNonTaxCar > 0 ? ` / 자가운전: ${wizNonTaxCar.toLocaleString()}원` : ''}`
                    : '미적용'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => goToSubStep(3)}
                className="text-text-side hover:text-text-main shrink-0 cursor-pointer rounded-lg p-1 transition-colors"
                title="비과세 수당 수정"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 4. 경업금지 약정 */}
            <div className="border-custom-slate-border flex items-center justify-between rounded-xl border bg-white px-3 py-2 shadow-2xs">
              <div className="min-w-0 pr-1">
                <span className="text-text-side block truncate text-[10px] font-semibold">
                  경업금지 약정
                </span>
                <p className="text-text-main mt-0.5 truncate text-xs font-bold">
                  {wizHasNonCompete
                    ? `${wizNonCompetePeriod} / ${wizNonCompeteRange} (${wizNonCompeteAmount.toLocaleString()}원)`
                    : '약정 없음'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => goToSubStep(4)}
                className="text-text-side hover:text-text-main shrink-0 cursor-pointer rounded-lg p-1 transition-colors"
                title="경업금지 약정 수정"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 5. 추가 고정수당 */}
            <div className="border-custom-slate-border col-span-2 flex items-center justify-between rounded-xl border bg-white px-3 py-2 shadow-2xs">
              <div className="min-w-0 pr-1">
                <span className="text-text-side block truncate text-[10px] font-semibold">
                  추가 고정수당
                </span>
                <p className="text-text-main mt-0.5 truncate text-xs font-bold">
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
                </p>
              </div>
              <button
                type="button"
                onClick={() => goToSubStep(5)}
                className="text-text-side hover:text-text-main shrink-0 cursor-pointer rounded-lg p-1 transition-colors"
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
