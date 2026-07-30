'use client';

import { create } from 'zustand';

interface DashboardState {
  searchQuery: string;
  page: number;
  take: number;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setTake: (take: number) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  searchQuery: '',
  page: 1,
  take: 10,
  setSearchQuery: (searchQuery) => set({ searchQuery, page: 1 }),
  setPage: (page) => set({ page }),
  setTake: (take) => set({ take, page: 1 }),
}));
