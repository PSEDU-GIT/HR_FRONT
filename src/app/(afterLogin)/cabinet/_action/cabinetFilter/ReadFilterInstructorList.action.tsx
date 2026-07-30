'use client';

import { useMemo } from 'react';
import cx from 'classnames';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';

export interface InstructorFilterItem {
  id: string;
  name: string;
  count: number;
}

export default function ReadFilterInstructorListAction() {
  const { selectedInstructor, setSelectedInstructor, contracts } = useCabinetStore(
    useShallow((state) => ({
      selectedInstructor: state.selectedInstructor,
      setSelectedInstructor: state.setSelectedInstructor,
      contracts: state.contracts,
    })),
  );

  const instructors = useMemo<InstructorFilterItem[]>(() => {
    const map = new Map<string, number>();
    contracts.forEach((item) => {
      const name = item.pendingStaffName || (item.staffId ? `직원 #${item.staffId}` : '미지정');
      map.set(name, (map.get(name) || 0) + 1);
    });

    const list: InstructorFilterItem[] = [
      { id: 'all', name: '전체 강사', count: contracts.length },
    ];

    let idx = 1;
    map.forEach((count, name) => {
      list.push({ id: String(idx++), name, count });
    });

    return list;
  }, [contracts]);

  return (
    <div className="border-custom-slate-border-side max-h-[320px] space-y-1 overflow-y-auto rounded-xl border bg-slate-50/40 p-1.5">
      {instructors.map((item) => {
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
