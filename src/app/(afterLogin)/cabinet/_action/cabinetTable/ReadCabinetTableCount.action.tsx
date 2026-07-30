'use client';

import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';

export default function ReadCabinetTableCountAction() {
  const { searchQuery, selectedInstructor, statusFilter, contracts } = useCabinetStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      selectedInstructor: state.selectedInstructor,
      statusFilter: state.statusFilter,
      contracts: state.contracts,
    })),
  );

  const count = useMemo(() => {
    return contracts.filter((item) => {
      const name = item.pendingStaffName || (item.staffId ? `직원 #${item.staffId}` : '');
      if (selectedInstructor !== '전체 강사' && name !== selectedInstructor) {
        return false;
      }
      if (statusFilter === 'completed' && item.status !== 'SIGNED') {
        return false;
      }
      if (statusFilter === 'pending' && item.status === 'SIGNED') {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = name.toLowerCase().includes(q);
        if (!matchName) return false;
      }
      return true;
    }).length;
  }, [contracts, selectedInstructor, statusFilter, searchQuery]);

  return (
    <span className="bg-custom-indigo-bg border-custom-indigo-border text-custom-indigo rounded-full border px-2 py-0.5 text-[10px] font-extrabold">
      {count}건
    </span>
  );
}
