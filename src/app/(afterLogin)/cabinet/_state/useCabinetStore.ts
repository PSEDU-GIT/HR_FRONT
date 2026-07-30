'use client';

import { create } from 'zustand';

export type CabinetStatusFilter = 'all' | 'completed' | 'pending';
export type TableDensity = 'comfortable' | 'standard' | 'compact';

interface CabinetState {
  searchQuery: string;
  selectedInstructor: string;
  statusFilter: CabinetStatusFilter;
  density: TableDensity;

  setSearchQuery: (query: string) => void;
  setSelectedInstructor: (instructor: string) => void;
  setStatusFilter: (status: CabinetStatusFilter) => void;
  setDensity: (density: TableDensity) => void;
  resetFilter: () => void;
}

export const useCabinetStore = create<CabinetState>((set) => ({
  searchQuery: '',
  selectedInstructor: '전체 강사',
  statusFilter: 'all',
  density: 'standard',

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedInstructor: (selectedInstructor) => set({ selectedInstructor }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setDensity: (density) => set({ density }),
  resetFilter: () =>
    set({
      searchQuery: '',
      selectedInstructor: '전체 강사',
      statusFilter: 'all',
    }),
}));
