'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import Select, { SelectDataTypes } from '@/app/_component/select/Select';
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
    wizSalaryAmount,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompetePeriod: state.step2.wizNonCompetePeriod,
      wizNonCompeteRange: state.step2.wizNonCompeteRange,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
      wizSalaryAmount: state.step2.wizSalaryAmount,
      setStep2: state.setStep2,
    })),
  );

  const handleSelectNo = () => {
    setStep2({ wizHasNonCompete: false });
  };

  const handleSelectYes = () => {
    const recommendedAmount = Math.round((wizSalaryAmount || 2500000) * 0.1);
    setStep2({
      wizHasNonCompete: true,
      wizNonCompetePeriod: wizNonCompetePeriod || '6개월',
      wizNonCompeteRange: wizNonCompeteRange || '반경 3km',
      wizNonCompeteAmount: wizNonCompeteAmount || recommendedAmount,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > 1000000000) num = 1000000000;
    setStep2({ wizNonCompeteAmount: num });
  };

  const selectedPeriod =
    PERIOD_OPTIONS.find((opt) => opt.id === wizNonCompetePeriod) || PERIOD_OPTIONS[1];
  const selectedRange =
    RANGE_OPTIONS.find((opt) => opt.id === wizNonCompeteRange) || RANGE_OPTIONS[1];

  const recommendedCalc = Math.round((wizSalaryAmount || 2500000) * 0.1);
  const koreanText = numberToKorean(wizNonCompeteAmount);

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
              ? 'border-custom-indigo-border ring-custom-indigo-border bg-white ring-2 dark:border-custom-indigo/60 dark:bg-slate-900 dark:ring-custom-indigo/40'
              : 'border-custom-slate-border bg-white hover:border-slate-300 hover:bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800',
          )}
        >
          <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">아니오</span>
          <span className="text-text-side mt-0.5 text-[11px] font-medium dark:text-slate-400">경업금지 약정 없음</span>
        </button>

        <button
          type="button"
          onClick={handleSelectYes}
          className={cx(
            'flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-4 py-3 text-center transition-all duration-200',
            wizHasNonCompete
              ? 'border-custom-indigo-border ring-custom-indigo-border bg-white ring-2 dark:border-custom-indigo/60 dark:bg-slate-900 dark:ring-custom-indigo/40'
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
        <div className="border-custom-slate-border bg-custom-slate-bg/60 space-y-3 rounded-2xl border p-4 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-text-side mb-1 block text-xs font-bold dark:text-slate-400">제한 기간</label>
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
              <label className="text-text-side mb-1 block text-xs font-bold dark:text-slate-400">제한 범위</label>
              <Select
                data={RANGE_OPTIONS}
                selectData={selectedRange}
                onChangeAction={(selected) => setStep2({ wizNonCompeteRange: String(selected.id) })}
                buttonClassName="h-[40px] rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-text-side mb-1 block text-xs font-bold dark:text-slate-400">월 보상수당액</label>
            <div className="relative">
              <input
                type="text"
                value={wizNonCompeteAmount === 0 ? '' : wizNonCompeteAmount.toLocaleString()}
                onChange={handleAmountChange}
                placeholder="240,000"
              />
              <span className="text-text-side absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold dark:text-slate-400">
                원
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between px-0.5 text-xs font-bold">
              <span className="text-text-side dark:text-slate-400">{koreanText}</span>
              <span className="text-custom-indigo text-[11px] dark:text-custom-indigo">
                * 권장 대가 자동 계산 (월급의 10%: {recommendedCalc.toLocaleString()}원)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
