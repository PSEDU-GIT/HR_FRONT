'use client';

import { create } from 'zustand';
import { type ContractArchiveItem } from '@/app/(afterLogin)/cabinet/_model/ContractArchive.model';

export type CabinetStatusFilter = 'all' | 'completed' | 'pending';
export type TableDensity = 'comfortable' | 'standard' | 'compact';
export type { ContractArchiveItem as CabinetContractItem };

interface CabinetState {
  searchQuery: string;
  selectedInstructor: string;
  statusFilter: CabinetStatusFilter;
  density: TableDensity;
  contracts: ContractArchiveItem[];

  setSearchQuery: (query: string) => void;
  setSelectedInstructor: (instructor: string) => void;
  setStatusFilter: (status: CabinetStatusFilter) => void;
  setDensity: (density: TableDensity) => void;
  setContracts: (contracts: ContractArchiveItem[]) => void;
  deleteContract: (id: number | string) => void;
  resetFilter: () => void;
}

export const useCabinetStore = create<CabinetState>((set) => ({
  searchQuery: '',
  selectedInstructor: '전체 강사',
  statusFilter: 'all',
  density: 'standard',
  contracts: [],

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedInstructor: (selectedInstructor) => set({ selectedInstructor }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setDensity: (density) => set({ density }),
  setContracts: (contracts) => set({ contracts }),
  deleteContract: (id) =>
    set((state) => ({
      contracts: state.contracts.filter((item) => String(item.id) !== String(id)),
    })),
  resetFilter: () =>
    set({
      searchQuery: '',
      selectedInstructor: '전체 강사',
      statusFilter: 'all',
    }),
}));
