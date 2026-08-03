'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import cx from 'classnames';

import Select, { type SelectDataTypes } from '@/app/_component/select/Select';

export interface PaginationFooterProps {
  page: number;
  take: number;
  totalCount: number;
  hasNext?: boolean;
  onPageChange: (nextPage: number) => void;
  onTakeChange: (nextTake: number) => void;
  options?: number[];
  className?: string;
}

export default function PaginationFooter({
  page,
  take,
  totalCount,
  hasNext,
  onPageChange,
  onTakeChange,
  options = [5, 10, 20],
  className,
}: PaginationFooterProps) {
  const startIdx = totalCount > 0 ? (page - 1) * take + 1 : 0;
  const endIdx = Math.min(page * take, totalCount);
  const totalPages = Math.ceil(totalCount / take) || 1;

  const selectDataList: SelectDataTypes[] = options.map((opt) => ({
    id: opt,
    displayName: String(opt),
  }));

  const currentSelectData: SelectDataTypes = {
    id: take,
    displayName: String(take),
  };

  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (hasNext || page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div
      className={cx(
        'flex items-center justify-between pt-2 text-sm font-medium text-gray-500',
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        <span>Show</span>
        <Select
          data={selectDataList}
          selectData={currentSelectData}
          onChangeAction={(item) => onTakeChange(Number(item.id))}
          direction="up"
          buttonClassName="!py-1"
          itemClassName="!py-1"
        />
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
            className={cx(
              'flex cursor-pointer items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-700',
              { 'pointer-events-none opacity-30': page <= 1 },
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="border-custom-indigo-border bg-custom-indigo-bg text-custom-indigo flex h-7 w-7 items-center justify-center rounded-md border text-xs font-bold">
            {page}
          </span>
          <button
            type="button"
            disabled={!hasNext && page >= totalPages}
            onClick={handleNext}
            className={cx(
              'flex h-7 w-7 cursor-pointer items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-700',
              { 'pointer-events-none opacity-30': !hasNext && page >= totalPages },
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
