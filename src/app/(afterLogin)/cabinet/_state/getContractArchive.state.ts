'use client';

import { useMemo, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import {
  getContractArchive,
  getContractArchiveQueryKey,
} from '@/app/(afterLogin)/cabinet/_lib/getContractArchive';
import { type ContractArchiveResponse } from '@/app/(afterLogin)/cabinet/_model/ContractArchive.model';

export { getContractArchiveQueryKey };

export const useContractArchiveState = () => {
  const {
    searchQuery,
    selectedInstructor,
    statusFilter,
    page,
    take,
    counterparties,
    setCounterparties,
  } = useCabinetStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      selectedInstructor: state.selectedInstructor,
      statusFilter: state.statusFilter,
      page: state.page,
      take: state.take,
      counterparties: state.counterparties,
      setCounterparties: state.setCounterparties,
    })),
  );

  const instructorParam = selectedInstructor === '전체 강사' ? '' : selectedInstructor;
  const statusParam =
    statusFilter === 'all'
      ? ''
      : statusFilter === 'completed'
        ? 'SIGNED'
        : statusFilter === 'sent'
          ? 'SENT'
          : statusFilter === 'draft'
            ? 'DRAFT'
            : statusFilter;

  const { data, isFetching } = useQuery<ContractArchiveResponse>({
    queryKey: [
      ...getContractArchiveQueryKey,
      page,
      take,
      searchQuery,
      instructorParam,
      statusParam,
    ],
    queryFn: async () => {
      const result = await getContractArchive(
        page,
        take,
        searchQuery,
        instructorParam,
        statusParam,
      );
      if (result?.counterparties && result.counterparties.length > 0) {
        useCabinetStore.getState().setCounterparties(result.counterparties);
      }
      return result;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data?.counterparties && data.counterparties.length > 0) {
      setCounterparties(data.counterparties);
    }
  }, [data?.counterparties, setCounterparties]);

  const contracts = useMemo(() => data?.contracts || [], [data?.contracts]);
  const paging = data?.paging || { page: 1, size: 10, totalCount: 0, hasNext: false };

  const filteredContracts = useMemo(() => {
    return contracts.filter((item) => {
      const name =
        item.counterpartyName ||
        item.pendingStaffName ||
        (item.staffId ? `직원 #${item.staffId}` : '');
      if (selectedInstructor !== '전체 강사' && name !== selectedInstructor) {
        return false;
      }
      if (statusFilter === 'completed' && item.status !== 'SIGNED') {
        return false;
      }
      if (statusFilter === 'sent' && item.status !== 'SENT') {
        return false;
      }
      if (statusFilter === 'draft' && item.status !== 'DRAFT') {
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
    const list = [
      { id: 'all', name: '전체 강사', count: counterparties.length || contracts.length },
    ];

    if (counterparties.length > 0) {
      counterparties.forEach((cp, idx) => {
        const count = contracts.filter(
          (c) =>
            c.counterpartyName === cp.name ||
            c.pendingStaffName === cp.name ||
            c.staffId === cp.staffId,
        ).length;
        list.push({
          id: String(cp.staffId || idx + 1),
          name: cp.name,
          count,
        });
      });
    } else {
      const map = new Map<string, number>();
      contracts.forEach((item) => {
        const name =
          item.counterpartyName ||
          item.pendingStaffName ||
          (item.staffId ? `직원 #${item.staffId}` : '미지정');
        map.set(name, (map.get(name) || 0) + 1);
      });
      let idx = 1;
      map.forEach((count, name) => {
        list.push({ id: String(idx++), name, count });
      });
    }

    return list;
  }, [counterparties, contracts]);

  const totalInstructorCount =
    counterparties.length > 0 ? counterparties.length : Math.max(0, instructorList.length - 1);

  return {
    contracts,
    paging,
    counterparties,
    filteredContracts,
    count: paging.totalCount || filteredContracts.length,
    instructorList,
    totalInstructorCount,
    isFetching,
  };
};
