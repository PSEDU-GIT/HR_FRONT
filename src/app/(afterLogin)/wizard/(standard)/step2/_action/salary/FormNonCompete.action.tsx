'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import Select, { SelectDataTypes } from '@/app/_component/select/Select';
import { getEffectiveNonCompeteAmount, LEGAL_STANDARDS } from '@/app/(afterLogin)/wizard/_lib/wageEngine';
import cx from 'classnames';

const PERIOD_OPTIONS: SelectDataTypes[] = [
  { id: '3개월', displayName: '3개월' },
  { id: '6개월', displayName: '6개월' },
  { id: '12개월', displayName: '12개월' },
];

const RANGE_OPTIONS: SelectDataTypes[] = [
  { id: '반경 1km', displayName: '반경 1km' },
  { id: '반경 3km', displayName: '반경 3km' },
  { id: '반경 5km', displayName: '반경 5km' },
];

const PERCENT_PRESETS = [5, 10, 15, 20];

function numberToKorean(num: number): string {
  if (!num || num <= 0) return '';
  const units = ['', '만', '억', '조'];
  const smallUnits = ['', '십', '백', '천'];
  const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];

  let result = '';
  let unitIdx = 0;
  let temp = num;

  while (temp > 0) {
    const part = temp % 10000;
    if (part > 0) {
      let partStr = '';
      let pTemp = part;
      for (let i = 0; i < 4; i++) {
        const d = pTemp % 10;
        if (d > 0) {
          const digitName = i > 0 && d === 1 ? '' : digits[d];
          partStr = digitName + smallUnits[i] + partStr;
        }
        pTemp = Math.floor(pTemp / 10);
      }
      result = partStr + units[unitIdx] + result;
    }
    temp = Math.floor(temp / 10000);
    unitIdx++;
  }

  return result + '원';
}

export default function FormNonCompeteAction() {
  const {
    wizHasNonCompete,
    wizNonCompetePeriod,
    wizNonCompeteRange,
    wizNonCompeteAmount,
    wizNonCompeteCalcType,
    wizNonCompetePercent,
    wizSalaryType,
    wizSalaryAmount,
    wizHourlyRate,
    wizMinGuaranteeAmount,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompetePeriod: state.step2.wizNonCompetePeriod,
      wizNonCompeteRange: state.step2.wizNonCompeteRange,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
      wizNonCompeteCalcType: state.step2.wizNonCompeteCalcType || 'percent',
      wizNonCompetePercent: state.step2.wizNonCompetePercent ?? 10,
      wizSalaryType: state.step2.wizSalaryType,
      wizSalaryAmount: state.step2.wizSalaryAmount,
      wizHourlyRate: state.step2.wizHourlyRate,
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount,
      setStep2: state.setStep2,
    })),
  );

  const baseAmount =
    wizSalaryType === 'commission'
      ? wizMinGuaranteeAmount || 0
      : wizSalaryType === 'hourly'
        ? (wizHourlyRate || LEGAL_STANDARDS.MIN_HOURLY_WAGE) * 174
        : wizSalaryAmount || 0;

  const calculatedPercentAmount = Math.round(baseAmount * ((wizNonCompetePercent || 10) / 100));

  const effectiveNonCompeteAmount = getEffectiveNonCompeteAmount({
    hasNonCompete: wizHasNonCompete,
    calcType: wizNonCompeteCalcType,
    percent: wizNonCompetePercent,
    manualAmount: wizNonCompeteAmount,
    salaryType: wizSalaryType,
    salaryAmount: wizSalaryAmount,
    hourlyRate: wizHourlyRate,
    minGuaranteeAmount: wizMinGuaranteeAmount,
  });

  const handleSelectNo = () => {
    setStep2({ wizHasNonCompete: false });
  };

  const handleSelectYes = () => {
    const calcAmount = Math.round(baseAmount * ((wizNonCompetePercent || 10) / 100));
    setStep2({
      wizHasNonCompete: true,
      wizNonCompetePeriod: wizNonCompetePeriod || '6개월',
      wizNonCompeteRange: wizNonCompeteRange || '반경 3km',
      wizNonCompeteAmount: wizNonCompeteCalcType === 'percent' ? calcAmount : wizNonCompeteAmount,
    });
  };

  const handlePercentChange = (pct: number) => {
    const calcAmount = Math.round(baseAmount * (pct / 100));
    setStep2({
      wizNonCompeteCalcType: 'percent',
      wizNonCompetePercent: pct,
      wizNonCompeteAmount: calcAmount,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > 1000000000) num = 1000000000;
    setStep2({
      wizNonCompeteCalcType: 'manual',
      wizNonCompeteAmount: num,
    });
  };

  const selectedPeriod =
    PERIOD_OPTIONS.find((opt) => opt.id === wizNonCompetePeriod) || PERIOD_OPTIONS[1];
  const selectedRange =
    RANGE_OPTIONS.find((opt) => opt.id === wizNonCompeteRange) || RANGE_OPTIONS[1];

  const koreanText = numberToKorean(
    wizNonCompeteCalcType === 'percent' ? calculatedPercentAmount : wizNonCompeteAmount,
  );

  return (
    <div className="space-y-3">
      {/* 아니오 / 예 2개 선택 카드 */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleSelectNo}
          className={cx(
            'flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-4 py-3 text-center transition-all duration-200',
            !wizHasNonCompete
              ? 'border-custom-indigo-border ring-custom-indigo-border dark:border-custom-indigo/60 dark:ring-custom-indigo/40 bg-white ring-2 dark:bg-slate-900'
              : 'border-custom-slate-border bg-white hover:border-slate-300 hover:bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800',
          )}
        >
          <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">아니오</span>
          <span className="text-text-side mt-0.5 text-[11px] font-medium dark:text-slate-400">
            경업금지 약정 없음
          </span>
        </button>

        <button
          type="button"
          onClick={handleSelectYes}
          className={cx(
            'flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-4 py-3 text-center transition-all duration-200',
            wizHasNonCompete
              ? 'border-custom-indigo-border ring-custom-indigo-border dark:border-custom-indigo/60 dark:ring-custom-indigo/40 bg-white ring-2 dark:bg-slate-900'
              : 'border-custom-slate-border bg-white hover:border-slate-300 hover:bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800',
          )}
        >
          <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">예</span>
          <span className="text-text-side mt-0.5 text-[11px] font-medium dark:text-slate-400">
            경업금지 약정 및 보상 설정
          </span>
        </button>
      </div>

      {/* "예" 선택 시 하단에 펼쳐지는 추가 입력 박스 */}
      {wizHasNonCompete && (
        <div className="border-custom-slate-border bg-custom-slate-bg/60 space-y-4 rounded-2xl border p-4 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-text-side mb-1 block text-xs font-bold dark:text-slate-400">
                제한 기간
              </label>
              <Select
                data={PERIOD_OPTIONS}
                selectData={selectedPeriod}
                onChangeAction={(selected) =>
                  setStep2({ wizNonCompetePeriod: String(selected.id) })
                }
                buttonClassName="h-[40px] rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="text-text-side mb-1 block text-xs font-bold dark:text-slate-400">
                제한 범위
              </label>
              <Select
                data={RANGE_OPTIONS}
                selectData={selectedRange}
                onChangeAction={(selected) => setStep2({ wizNonCompeteRange: String(selected.id) })}
                buttonClassName="h-[40px] rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-text-side text-xs font-bold dark:text-slate-400">
                월 보상수당 산정 방식
              </label>
              <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setStep2({ wizNonCompeteCalcType: 'percent' })}
                  className={cx(
                    'rounded-md px-2.5 py-1 text-[11px] font-extrabold transition-all',
                    wizNonCompeteCalcType === 'percent'
                      ? 'text-custom-indigo dark:text-custom-indigo bg-white shadow-2xs dark:bg-slate-900'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
                  )}
                >
                  비율 지정 (권장)
                </button>
                <button
                  type="button"
                  onClick={() => setStep2({ wizNonCompeteCalcType: 'manual', wizNonCompeteAmount: 0 })}
                  className={cx(
                    'rounded-md px-2.5 py-1 text-[11px] font-extrabold transition-all',
                    wizNonCompeteCalcType === 'manual'
                      ? 'text-custom-indigo dark:text-custom-indigo bg-white shadow-2xs dark:bg-slate-900'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
                  )}
                >
                  직접 금액 입력
                </button>
              </div>
            </div>

            {wizNonCompeteCalcType === 'percent' ? (
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-1.5">
                  {PERCENT_PRESETS.map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handlePercentChange(pct)}
                      className={cx(
                        'flex h-9 cursor-pointer items-center justify-center rounded-xl border text-xs font-extrabold transition-all',
                        wizNonCompetePercent === pct
                          ? 'border-custom-indigo-border bg-custom-indigo-bg text-custom-indigo dark:border-custom-indigo dark:text-custom-indigo dark:bg-slate-900'
                          : 'border-custom-slate-border bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300',
                      )}
                    >
                      {pct}% {pct === 10 && '(권장)'}
                    </button>
                  ))}
                </div>
                <p className="text-custom-indigo px-0.5 text-[11px] font-semibold dark:text-indigo-400">
                  * 선택하신 비율({wizNonCompetePercent}%)은 약정 월급 입력 시 월 보상수당액으로 자동 반영됩니다.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="relative">
                  <input
                    type="text"
                    value={wizNonCompeteAmount === 0 ? '' : wizNonCompeteAmount.toLocaleString()}
                    onChange={handleAmountChange}
                    placeholder="예: 240,000"
                  />
                  <span className="text-text-side absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold dark:text-slate-400">
                    원
                  </span>
                </div>
                {koreanText && (
                  <p className="text-text-side px-1 text-xs font-bold dark:text-slate-400">
                    {koreanText}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
