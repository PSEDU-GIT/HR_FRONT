'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore, SalaryType } from '@/app/(afterLogin)/wizard/store';
import cx from 'classnames';

const SALARY_TYPE_OPTIONS: { id: SalaryType; title: string; description: string }[] = [
  {
    id: 'monthly',
    title: '고정급 (월급제)',
    description: '매월 고정된 기본급을 지급받는 가장 일반적인 근로 형태입니다.',
  },
  {
    id: 'commission',
    title: '비율제 (인센티브)',
    description: '수업 매출액에 약정된 비율(%)을 곱해 생산성에 따라 정산받습니다.',
  },
  {
    id: 'hourly',
    title: '시급제 (단시간)',
    description: '실제 근무한 시간만큼 시급 단위로 계산하여 매월 정산받습니다.',
  },
];

export default function SelectSalaryTypeAction() {
  const { wizSalaryType, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizSalaryType: state.step2.wizSalaryType,
      setStep2: state.setStep2,
    })),
  );

  return (
    <div className="space-y-2.5">
      {SALARY_TYPE_OPTIONS.map((option) => {
        const isSelected = wizSalaryType === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setStep2({ wizSalaryType: option.id })}
            className={cx(
              'group relative flex w-full cursor-pointer flex-col items-start rounded-2xl border p-4 text-left transition-all duration-200',
              isSelected
                ? 'border-custom-indigo-border ring-custom-indigo-border bg-white ring-2 dark:border-custom-indigo/60 dark:bg-slate-900 dark:ring-custom-indigo/40'
                : 'border-custom-slate-border bg-white hover:border-slate-300 hover:bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800',
            )}
          >
            <span
              className={cx(
                'text-xs font-black tracking-tight',
                isSelected ? 'text-custom-indigo' : 'text-slate-900 dark:text-slate-100',
              )}
            >
              {option.title}
            </span>
            <p className="text-text-sub mt-1 text-xs leading-relaxed font-medium dark:text-slate-400">
              {option.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
