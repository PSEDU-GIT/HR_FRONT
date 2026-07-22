'use client';

import { Search, X } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';

export default function ReadFilterSearchAction() {
  const { searchQuery, setSearchQuery } = useCabinetStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      setSearchQuery: state.setSearchQuery,
    })),
  );

  return (
    <div className="relative w-full">
      <Search className="text-text-side absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />

      <input
        placeholder="강사명 또는 계약서 검색..."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-8 pl-8.5"
      />

      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          className="text-text-side hover:text-text-title absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-full p-0.5 transition-colors"
          aria-label="검색어 지우기"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
