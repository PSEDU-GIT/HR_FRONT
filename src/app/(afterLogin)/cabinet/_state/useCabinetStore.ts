'use client';

import { create } from 'zustand';

export type CabinetStatusFilter = 'all' | 'completed' | 'pending';
export type TableDensity = 'comfortable' | 'standard' | 'compact';

export interface CabinetContractItem {
  id: string;
  instructorName: string;
  instructorPhone: string;
  status: 'completed' | 'pending';
  statusLabel: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

const INITIAL_CONTRACTS: CabinetContractItem[] = [
  {
    id: '1',
    instructorName: '박서준',
    instructorPhone: '010-8273-0192',
    status: 'pending',
    statusLabel: '대기',
    startDate: '2026-07-21',
    endDate: '2027-07-20',
    createdAt: '2026. 07. 21.',
  },
  {
    id: '2',
    instructorName: '박서준',
    instructorPhone: '010-8273-0192',
    status: 'pending',
    statusLabel: '대기',
    startDate: '2026-07-21',
    endDate: '2027-07-20',
    createdAt: '2026. 07. 21.',
  },
  {
    id: '3',
    instructorName: '이지은',
    instructorPhone: '010-1234-5678',
    status: 'completed',
    statusLabel: '체결 완료',
    startDate: '2025-03-01',
    endDate: '2026-02-28',
    createdAt: '2025. 02. 28.',
  },
  {
    id: '4',
    instructorName: '박서준',
    instructorPhone: '010-8273-0192',
    status: 'pending',
    statusLabel: '대기',
    startDate: '2026-07-15',
    endDate: '2027-07-14',
    createdAt: '2026. 07. 08.',
  },
];

interface CabinetState {
  searchQuery: string;
  selectedInstructor: string;
  statusFilter: CabinetStatusFilter;
  density: TableDensity;
  contracts: CabinetContractItem[];

  setSearchQuery: (query: string) => void;
  setSelectedInstructor: (instructor: string) => void;
  setStatusFilter: (status: CabinetStatusFilter) => void;
  setDensity: (density: TableDensity) => void;
  deleteContract: (id: string) => void;
  resetFilter: () => void;
}

export const useCabinetStore = create<CabinetState>((set) => ({
  searchQuery: '',
  selectedInstructor: '전체 강사',
  statusFilter: 'all',
  density: 'standard',
  contracts: INITIAL_CONTRACTS,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedInstructor: (selectedInstructor) => set({ selectedInstructor }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setDensity: (density) => set({ density }),
  deleteContract: (id) =>
    set((state) => ({
      contracts: state.contracts.filter((item) => item.id !== id),
    })),
  resetFilter: () =>
    set({
      searchQuery: '',
      selectedInstructor: '전체 강사',
      statusFilter: 'all',
    }),
}));
