'use client';

import { create } from 'zustand';
import { type CounterpartyItem } from '@/app/(afterLogin)/cabinet/_model/ContractArchive.model';

export type CabinetStatusFilter = 'all' | 'completed' | 'sent' | 'draft' | 'pending';
export type TableDensity = 'comfortable' | 'standard' | 'compact';

interface CabinetState {
  searchQuery: string;
  selectedInstructor: string;
  statusFilter: CabinetStatusFilter;
  density: TableDensity;
  page: number;
  take: number;
  counterparties: CounterpartyItem[];

  setSearchQuery: (query: string) => void;
  setSelectedInstructor: (instructor: string) => void;
  setStatusFilter: (status: CabinetStatusFilter) => void;
  setDensity: (density: TableDensity) => void;
  setPage: (page: number) => void;
  setTake: (take: number) => void;
  setCounterparties: (counterparties: CounterpartyItem[]) => void;
  resetFilter: () => void;
}

export const useCabinetStore = create<CabinetState>((set) => ({
  searchQuery: '',
  selectedInstructor: '전체 강사',
  statusFilter: 'all',
  density: 'standard',
  page: 1,
  take: 10,
  counterparties: [],

  setSearchQuery: (searchQuery) => set({ searchQuery, page: 1 }),
  setSelectedInstructor: (selectedInstructor) => set({ selectedInstructor, page: 1 }),
  setStatusFilter: (statusFilter) => set({ statusFilter, page: 1 }),
  setDensity: (density) => set({ density }),
  setPage: (page) => set({ page }),
  setTake: (take) => set({ take, page: 1 }),
  setCounterparties: (counterparties) => set({ counterparties }),
  resetFilter: () =>
    set({
      searchQuery: '',
      selectedInstructor: '전체 강사',
      statusFilter: 'all',
      page: 1,
    }),
}));


