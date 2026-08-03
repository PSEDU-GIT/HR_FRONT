'use client';

import React from 'react';
import cx from 'classnames';

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
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
      {/* Seamless Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-custom-indigo h-4 w-1 rounded-full" />
          <h3 className="text-sm font-extrabold tracking-tight text-slate-800">{title}</h3>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              {onCancelEdit && (
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-800"
                >
                  취소
                </button>
              )}
              <button
                type="button"
                onClick={onToggleEdit}
                className="flex cursor-pointer items-center justify-center rounded-xl bg-custom-indigo px-3.5 py-1.5 text-xs font-bold text-white transition-all"
              >
                완료
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onToggleEdit}
              className="flex cursor-pointer items-center justify-center rounded-xl border border-custom-indigo bg-white px-3.5 py-1.5 text-xs font-bold text-custom-indigo transition-all"
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
