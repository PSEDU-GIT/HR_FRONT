'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import cx from 'classnames';

export default function FormSalaryTaxFreeAction() {
  const { wizHasTaxFree, wizNonTaxFood, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizHasTaxFree: state.step2.wizHasTaxFree,
      wizNonTaxFood: state.step2.wizNonTaxFood,
      setStep2: state.setStep2,
    })),
  );

  const handleSelectNo = () => {
    setStep2({
      wizHasTaxFree: false,
      wizNonTaxFood: 0,
    });
  };

  const handleSelectYes = () => {
    setStep2({
      wizHasTaxFree: true,
      wizNonTaxFood: 200000,
    });
  };

  const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value.replace(/[^0-9]/g, ''));
    setStep2({ wizNonTaxFood: Math.min(num, 200000) });
  };

  return (
    <div className="space-y-3">
      {/* 아니오 / 예 2개 카드 탭 */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleSelectNo}
          className={cx(
            'flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-4 py-3 text-center transition-all duration-200',
            !wizHasTaxFree
              ? 'border-custom-indigo-border ring-custom-indigo-border bg-white ring-2'
              : 'border-custom-slate-border bg-white hover:border-slate-300 hover:bg-slate-50/60',
          )}
        >
          <span className="text-sm font-extrabold text-slate-900">아니오</span>
          <span className="text-text-side mt-0.5 text-[11px] font-medium">비과세 미적용</span>
        </button>

        <button
          type="button"
          onClick={handleSelectYes}
          className={cx(
            'flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-4 py-3 text-center transition-all duration-200',
            wizHasTaxFree
              ? 'border-custom-indigo-border ring-custom-indigo-border bg-white ring-2'
              : 'border-custom-slate-border bg-white hover:border-slate-300 hover:bg-slate-50/60',
          )}
        >
          <span className="text-sm font-extrabold text-slate-900">예</span>
          <span className="text-text-side mt-0.5 text-[11px] font-medium">
            식대 20만원 기본 설정
          </span>
        </button>
      </div>

      {/* "예" 선택 시 상세 수당 금액 설정 박스 */}
      {wizHasTaxFree && (
        <div className="border-custom-slate-border bg-custom-slate-bg/60 space-y-3 rounded-2xl border p-4">
          <div>
            <label className="text-text-side mb-1 block text-xs font-bold">
              식대 (월 최대 20만원)
            </label>
            <div className="relative">
              <input
                type="text"
                value={wizNonTaxFood === 0 ? '' : wizNonTaxFood.toLocaleString()}
                onChange={handleFoodChange}
                placeholder="200,000"
              />
              <span className="text-text-side absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold">
                원
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
