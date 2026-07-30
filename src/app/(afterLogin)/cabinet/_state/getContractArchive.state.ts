'use client';

import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import { getContractArchive } from '@/app/(afterLogin)/cabinet/_lib/getContractArchive';
import { type ContractArchiveItem } from '@/app/(afterLogin)/cabinet/_model/ContractArchive.model';

export const getContractArchiveQueryKey = ['contractArchive'];

export const useContractArchiveState = () => {
  const { searchQuery, selectedInstructor, statusFilter } = useCabinetStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      selectedInstructor: state.selectedInstructor,
      statusFilter: state.statusFilter,
    })),
  );

  const { data: contracts } = useSuspenseQuery<ContractArchiveItem[]>({
    queryKey: getContractArchiveQueryKey,
    queryFn: getContractArchive,
    staleTime: 1000 * 60 * 5,
  });

  const filteredContracts = useMemo(() => {
    return (contracts || []).filter((item) => {
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
    });
  }, [contracts, selectedInstructor, statusFilter, searchQuery]);

  const instructorList = useMemo(() => {
    const map = new Map<string, number>();
    (contracts || []).forEach((item) => {
      const name = item.pendingStaffName || (item.staffId ? `직원 #${item.staffId}` : '미지정');
      map.set(name, (map.get(name) || 0) + 1);
    });

    const list = [{ id: 'all', name: '전체 강사', count: (contracts || []).length }];
    let idx = 1;
    map.forEach((count, name) => {
      list.push({ id: String(idx++), name, count });
    });

    return list;
  }, [contracts]);

  const totalInstructorCount = instructorList.length > 1 ? instructorList.length - 1 : 0;

  return {
    contracts: contracts || [],
    filteredContracts,
    count: filteredContracts.length,
    instructorList,
    totalInstructorCount,
  };
};
