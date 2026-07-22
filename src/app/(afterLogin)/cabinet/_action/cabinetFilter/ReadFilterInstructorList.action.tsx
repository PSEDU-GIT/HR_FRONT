'use client';

import cx from 'classnames';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';

export interface InstructorFilterItem {
  id: string;
  name: string;
  count: number;
}

const INSTRUCTORS: InstructorFilterItem[] = [
  { id: 'all', name: '전체 강사', count: 4 },
  { id: '1', name: '김태희', count: 0 },
  { id: '2', name: '박서준', count: 3 },
  { id: '3', name: '이지은', count: 1 },
  { id: '4', name: '이민호', count: 0 },
];

export default function ReadFilterInstructorListAction() {
  const { selectedInstructor, setSelectedInstructor } = useCabinetStore(
    useShallow((state) => ({
      selectedInstructor: state.selectedInstructor,
      setSelectedInstructor: state.setSelectedInstructor,
    })),
  );

  return (
    <div className="border-custom-slate-border-side max-h-[320px] space-y-1 overflow-y-auto rounded-xl border bg-slate-50/40 p-1.5">
      {INSTRUCTORS.map((item) => {
        const isSelected = selectedInstructor === item.name;
        const isDisabled = item.count === 0;

        return (
          <button
            key={item.id}
            type="button"
            disabled={isDisabled}
            onClick={() => !isDisabled && setSelectedInstructor(item.name)}
            className={cx(
              'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-all duration-150',
              isDisabled
                ? 'opacity-45 cursor-not-allowed pointer-events-none select-none bg-transparent text-slate-400'
                : isSelected
                  ? 'bg-custom-indigo-bg border-custom-indigo-border text-custom-indigo border font-extrabold shadow-2xs cursor-pointer'
                  : 'hover:bg-white text-text-sub hover:text-text-title border border-transparent font-semibold cursor-pointer',
            )}
          >
            <span>{item.name}</span>
            <span
              className={cx(
                'rounded-md px-1.5 py-0.5 text-[10px] font-extrabold transition-colors',
                isDisabled
                  ? 'bg-slate-200/50 text-slate-400'
                  : isSelected
                    ? 'bg-custom-indigo text-white'
                    : 'bg-slate-200/80 text-slate-500',
              )}
            >
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
