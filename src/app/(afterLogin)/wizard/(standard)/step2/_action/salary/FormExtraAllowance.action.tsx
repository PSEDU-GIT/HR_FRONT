'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import cx from 'classnames';

export default function FormExtraAllowanceAction() {
  const {
    wizHasExtraAllowance,
    wizOvertimeAllowance,
    wizPositionAllowance,
    wizOtherAllowance,
    wizOtherAllowanceName,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizHasExtraAllowance: state.step2.wizHasExtraAllowance,
      wizOvertimeAllowance: state.step2.wizOvertimeAllowance,
      wizPositionAllowance: state.step2.wizPositionAllowance,
      wizOtherAllowance: state.step2.wizOtherAllowance,
      wizOtherAllowanceName: state.step2.wizOtherAllowanceName,
      setStep2: state.setStep2,
    })),
  );

  const handleSelectNo = () => {
    setStep2({
      wizHasExtraAllowance: false,
      wizOvertimeAllowance: 0,
      wizPositionAllowance: 0,
      wizOtherAllowance: 0,
      wizOtherAllowanceName: '',
    });
  };

  const handleSelectYes = () => {
    setStep2({
      wizHasExtraAllowance: true,
      wizPositionAllowance: wizPositionAllowance || 50000,
    });
  };

  const handleOvertimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value.replace(/[^0-9]/g, ''));
    setStep2({ wizOvertimeAllowance: Math.min(num, 1000000000) });
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value.replace(/[^0-9]/g, ''));
    setStep2({ wizPositionAllowance: Math.min(num, 1000000000) });
  };

  const handleOtherAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value.replace(/[^0-9]/g, ''));
    setStep2({ wizOtherAllowance: Math.min(num, 1000000000) });
  };

  const handleOtherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStep2({ wizOtherAllowanceName: e.target.value });
  };

  return (
    <div className="space-y-3">
      {/* 아니오 / 예 2개 선택 카드 */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleSelectNo}
          className={cx(
            'flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-4 py-3 text-center transition-all duration-200',
            !wizHasExtraAllowance
              ? 'border-custom-indigo-border ring-custom-indigo-border bg-white ring-2 dark:border-custom-indigo/60 dark:bg-slate-900 dark:ring-custom-indigo/40'
              : 'border-custom-slate-border bg-white hover:border-slate-300 hover:bg-slate-50/60 dark:bg-slate-900/60 dark:hover:bg-slate-800',
          )}
        >
          <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">아니오</span>
          <span className="text-text-side mt-0.5 text-11 font-medium">추가 수당 없음</span>
        </button>

        <button
          type="button"
          onClick={handleSelectYes}
          className={cx(
            'flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-4 py-3 text-center transition-all duration-200',
            wizHasExtraAllowance
              ? 'border-custom-indigo-border ring-custom-indigo-border bg-white ring-2 dark:border-custom-indigo/60 dark:bg-slate-900 dark:ring-custom-indigo/40'
              : 'border-custom-slate-border bg-white hover:border-slate-300 hover:bg-slate-50/60 dark:bg-slate-900/60 dark:hover:bg-slate-800',
          )}
        >
          <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">예</span>
          <span className="text-text-side mt-0.5 text-11 font-medium">
            직책/연장/기타 수당 설정
          </span>
        </button>
      </div>

      {/* "예" 선택 시 하단 2개씩(2열 그리드) 펼쳐지는 추가 고정수당 입력 박스 */}
      {wizHasExtraAllowance && (
        <div className="border-custom-slate-border bg-custom-slate-bg/60 space-y-3 rounded-2xl border p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-text-side mb-1 block text-xs font-bold">연장근로수당</label>
              <div className="relative">
                <input
                  type="text"
                  value={wizOvertimeAllowance === 0 ? '' : wizOvertimeAllowance.toLocaleString()}
                  onChange={handleOvertimeChange}
                  placeholder="0"
                />
                <span className="text-text-side absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold">
                  원
                </span>
              </div>
              <p className="text-text-side mt-1 text-11 font-medium">
                주 40시간 이하인 경우 선택사항
              </p>
            </div>

            <div>
              <label className="text-text-side mb-1 block text-xs font-bold">직책수당</label>
              <div className="relative">
                <input
                  type="text"
                  value={wizPositionAllowance === 0 ? '' : wizPositionAllowance.toLocaleString()}
                  onChange={handlePositionChange}
                  placeholder="50,000"
                />
                <span className="text-text-side absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold">
                  원
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-text-side mb-1 block text-xs font-bold">기타수당</label>
              <div className="relative">
                <input
                  type="text"
                  value={wizOtherAllowance === 0 ? '' : wizOtherAllowance.toLocaleString()}
                  onChange={handleOtherAmountChange}
                  placeholder="0"
                />
                <span className="text-text-side absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold">
                  원
                </span>
              </div>
            </div>

            <div>
              <label className="text-text-side mb-1 block text-xs font-bold">기타수당 명칭</label>
              <input
                type="text"
                value={wizOtherAllowanceName}
                onChange={handleOtherNameChange}
                placeholder="예: 식대 지원, 차량보조"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
