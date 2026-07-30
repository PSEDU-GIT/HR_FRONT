'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useDashboardStore } from '@/app/(afterLogin)/dashboard/_state/useDashboardStore';
import { useRenewalContractsState } from '@/app/(afterLogin)/dashboard/_state/getRenewalContracts.state';

export default function ReadRenewalContractsFooterAction() {
  const { page, take, setPage, setTake } = useDashboardStore(
    useShallow((state) => ({
      page: state.page,
      take: state.take,
      setPage: state.setPage,
      setTake: state.setTake,
    })),
  );

  const { paging } = useRenewalContractsState();

  const totalCount = paging?.totalCount ?? 0;
  const startIdx = totalCount > 0 ? (page - 1) * take + 1 : 0;
  const endIdx = Math.min(page * take, totalCount);
  const totalPages = Math.ceil(totalCount / take) || 1;

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (paging?.hasNext || page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-between pt-2 text-sm font-medium text-gray-500">
      <div className="flex items-center gap-1.5">
        <span>Show</span>
        <select
          value={take}
          onChange={(e) => setTake(Number(e.target.value))}
          className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-bold text-neutral-900 outline-none"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <span>per page</span>
      </div>

      <div className="flex items-center gap-3">
        <span>
          {startIdx}-{endIdx} of {totalCount}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={handlePrev}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-700 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50 text-xs font-bold text-indigo-600 border border-indigo-100">
            {page}
          </span>
          <button
            type="button"
            disabled={!paging?.hasNext && page >= totalPages}
            onClick={handleNext}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-700 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
