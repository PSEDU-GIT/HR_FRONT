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
      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 text-xs font-medium text-slate-400">
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
            'flex flex-col justify-center rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3',
            item.colSpan === 2 && 'sm:col-span-2',
            item.colSpan === 3 && 'lg:col-span-3',
          )}
        >
          <span className="text-[11px] font-bold tracking-tight text-slate-400">
            {item.label}
          </span>
          <span className="mt-1 truncate text-xs font-extrabold text-slate-800">
            {item.value || '-'}
          </span>
        </div>
      ))}
    </div>
  );
}
