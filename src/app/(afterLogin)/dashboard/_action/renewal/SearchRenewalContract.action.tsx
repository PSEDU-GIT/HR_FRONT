'use client';

import { Search } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useDashboardStore } from '@/app/(afterLogin)/dashboard/_state/useDashboardStore';

export default function SearchRenewalContractAction() {
  const { searchQuery, setSearchQuery } = useDashboardStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      setSearchQuery: state.setSearchQuery,
    })),
  );

  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="강사명 또는 연락처 검색..."
        className="h-9 w-full rounded-lg border border-gray-200 bg-white pr-3 pl-9 text-sm text-neutral-900 transition-colors outline-none placeholder:text-gray-400 focus:border-gray-400"
      />
    </div>
  );
}
