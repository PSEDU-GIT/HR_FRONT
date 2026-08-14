'use client';

import React from 'react';
import cx from 'classnames';

export interface KeyValueItem {
  label: string;
  value: React.ReactNode;
  colSpan?: 1 | 2 | 3;
}

interface SummaryKeyValueListProps {
  items: KeyValueItem[];
  emptyText?: string;
  columns?: 1 | 2 | 3 | 4;
}

export default function SummaryKeyValueListComponent({
  items,
  emptyText = '등록된 정보가 없습니다.',
  columns = 3,
}: SummaryKeyValueListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="border-custom-slate-border bg-custom-slate-bg/40 text-text-side rounded-xl border p-3.5 text-xs font-medium">
        {emptyText}
      </div>
    );
  }

  return (
    <div
      className={cx(
        'grid gap-2.5',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-2 sm:grid-cols-4',
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cx(
            'border-custom-slate-border bg-custom-slate-bg/60 flex flex-col justify-center rounded-xl border px-3.5 py-3 transition-colors',
            item.colSpan === 2 && 'sm:col-span-2',
            item.colSpan === 3 && 'lg:col-span-3',
          )}
        >
          <span className="text-text-side text-11 font-bold tracking-tight">
            {item.label}
          </span>
          <span className="text-text-title mt-1 truncate text-xs font-extrabold">
            {item.value || '-'}
          </span>
        </div>
      ))}
    </div>
  );
}
