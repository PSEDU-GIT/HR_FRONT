'use client';

import React from 'react';

interface SummaryCardComponentProps {
  title: string;
  isEditing: boolean;
  onToggleEdit: () => void;
  onCancelEdit?: () => void;
  children: React.ReactNode;
}

export default function SummaryCardComponent({
  title,
  isEditing,
  onToggleEdit,
  onCancelEdit,
  children,
}: SummaryCardComponentProps) {
  return (
    <div className="border-custom-slate-border rounded-2xl border bg-white p-5 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
      {/* Seamless Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-custom-indigo h-4 w-1 rounded-full" />
          <h3 className="text-text-title text-sm font-extrabold tracking-tight dark:text-slate-100">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              {onCancelEdit && (
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="border-custom-slate-border text-text-sub hover:bg-custom-slate-bg hover:text-text-title flex cursor-pointer items-center justify-center rounded-xl border bg-white px-3.5 py-1.5 text-xs font-bold transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  취소
                </button>
              )}
              <button
                type="button"
                onClick={onToggleEdit}
                className="bg-custom-indigo flex cursor-pointer items-center justify-center rounded-xl px-3.5 py-1.5 text-xs font-bold text-white transition-all"
              >
                완료
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onToggleEdit}
              className="border-custom-indigo text-custom-indigo hover:bg-custom-indigo-bg flex cursor-pointer items-center justify-center rounded-xl border bg-white px-3.5 py-1.5 text-xs font-bold transition-all dark:bg-slate-800 dark:hover:bg-indigo-950/40"
            >
              수정
            </button>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div>{children}</div>
    </div>
  );
}
