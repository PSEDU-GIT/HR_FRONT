'use client';

import cx from 'classnames';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import { useContractArchiveState } from '@/app/(afterLogin)/cabinet/_state/getContractArchive.state';

export interface InstructorFilterItem {
  id: string;
  name: string;
  count: number;
}

export default function ReadFilterInstructorListAction() {
  const { selectedInstructor, setSelectedInstructor } = useCabinetStore(
    useShallow((state) => ({
      selectedInstructor: state.selectedInstructor,
      setSelectedInstructor: state.setSelectedInstructor,
    })),
  );

  const { instructorList } = useContractArchiveState();

  return (
    <div className="border-custom-slate-border-side max-h-[320px] space-y-1 overflow-y-auto rounded-xl border bg-custom-slate-bg p-1.5">
      {instructorList.map((item) => {
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
                ? 'opacity-45 cursor-not-allowed pointer-events-none select-none bg-transparent text-text-side'
                : isSelected
                  ? 'bg-custom-indigo-bg border-custom-indigo-border text-custom-indigo border font-extrabold shadow-2xs cursor-pointer'
                  : 'hover:bg-custom-slate-hover text-text-sub hover:text-text-title border border-transparent font-semibold cursor-pointer',
            )}
          >
            <span>{item.name}</span>
            <span
              className={cx(
                'rounded-md px-1.5 py-0.5 text-[10px] font-extrabold transition-colors',
                isDisabled
                  ? 'bg-custom-slate text-text-side'
                  : isSelected
                    ? 'bg-custom-indigo text-white'
                    : 'bg-custom-slate text-text-sub',
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
