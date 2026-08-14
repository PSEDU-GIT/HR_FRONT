'use client';

import { RotateCcw } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';

export default function ReadFilterResetAction() {
  const { searchQuery, selectedInstructor, statusFilter, resetFilter } = useCabinetStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      selectedInstructor: state.selectedInstructor,
      statusFilter: state.statusFilter,
      resetFilter: state.resetFilter,
    })),
  );

  const isFiltered =
    searchQuery.trim() !== '' || selectedInstructor !== '전체 강사' || statusFilter !== 'all';

  if (!isFiltered) return null;

  return (
    <button
      type="button"
      onClick={resetFilter}
      className="text-text-side hover:text-rose-600 active:scale-95 flex cursor-pointer items-center gap-1 text-11 font-bold transition-all"
    >
      <RotateCcw className="h-3 w-3" />
      <span>필터 초기화</span>
    </button>
  );
}
