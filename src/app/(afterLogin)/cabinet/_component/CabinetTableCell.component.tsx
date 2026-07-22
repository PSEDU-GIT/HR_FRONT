'use client';

import cx from 'classnames';
import { Eye, Pencil, Trash2, Download, Share2 } from 'lucide-react';
import { CabinetContractItem } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';

export type ColumnKey = 'instructor' | 'status' | 'contractPeriod' | 'createdAt' | 'action';

interface CabinetTableCellComponentProps {
  columnKey: ColumnKey;
  item: CabinetContractItem;
  cellPadding: string;
  onDetail: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onDownload: () => void;
  onShare: (name: string) => void;
}

export default function CabinetTableCellComponent({
  columnKey,
  item,
  cellPadding,
  onDetail,
  onEdit,
  onDelete,
  onDownload,
  onShare,
}: CabinetTableCellComponentProps) {
  switch (columnKey) {
    case 'instructor':
      return (
        <td className={cx('sticky left-0 w-[25%] bg-white group-hover:bg-slate-50/60 px-4 transition-colors', cellPadding)}>
          <div className="text-text-title font-bold">{item.instructorName}</div>
          <span className="text-text-side font-mono text-[10px]">{item.instructorPhone}</span>
        </td>
      );

    case 'status':
      return (
        <td className={cx('w-[15%] px-4 text-left', cellPadding)}>
          {item.status === 'pending' ? (
            <span className="bg-custom-yellow-bg border-custom-yellow-border text-custom-yellow inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-extrabold">
              <span>대기</span>
            </span>
          ) : (
            <span className="bg-custom-emerald-bg border-custom-emerald-border text-custom-emerald inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-extrabold">
              <span>체결 완료</span>
            </span>
          )}
        </td>
      );

    case 'contractPeriod':
      return (
        <td className={cx('text-text-main w-[30%] px-4 text-left font-mono text-xs font-medium', cellPadding)}>
          {item.startDate} ~ {item.endDate}
        </td>
      );

    case 'createdAt':
      return (
        <td className={cx('text-text-side w-[15%] px-4 text-center font-mono text-xs font-medium', cellPadding)}>
          {item.createdAt}
        </td>
      );

    case 'action':
      return (
        <td className={cx('w-[15%] px-4 text-right', cellPadding)}>
          <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="relative group/tooltip inline-flex items-center justify-center">
              <button
                type="button"
                onClick={onDetail}
                className="text-text-side hover:text-text-title active:scale-95 cursor-pointer p-1 transition-colors"
                aria-label="상세보기"
              >
                <Eye className="h-4 w-4" />
              </button>
              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 z-30">
                상세보기
              </div>
            </div>

            {item.status === 'pending' ? (
              <>
                <div className="relative group/tooltip inline-flex items-center justify-center">
                  <button
                    type="button"
                    onClick={onEdit}
                    className="text-text-side hover:text-text-title active:scale-95 cursor-pointer p-1 transition-colors"
                    aria-label="수정"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 z-30">
                    수정
                  </div>
                </div>

                <div className="relative group/tooltip inline-flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onShare(item.instructorName)}
                    className="text-text-side hover:text-text-title active:scale-95 cursor-pointer p-1 transition-colors"
                    aria-label="카카오톡 링크 공유"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 z-30">
                    카카오톡 공유
                  </div>
                </div>

                <div className="relative group/tooltip inline-flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="text-rose-400 hover:text-rose-600 active:scale-95 cursor-pointer p-1 transition-colors"
                    aria-label="삭제"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-rose-600 px-2 py-1 text-[10px] font-bold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 z-30">
                    삭제
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="relative group/tooltip inline-flex items-center justify-center">
                  <button
                    type="button"
                    onClick={onDownload}
                    className="text-text-side hover:text-text-title active:scale-95 cursor-pointer p-1 transition-colors"
                    aria-label="다운로드"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 z-30">
                    다운로드
                  </div>
                </div>

                <div className="relative group/tooltip inline-flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onShare(item.instructorName)}
                    className="text-text-side hover:text-text-title active:scale-95 cursor-pointer p-1 transition-colors"
                    aria-label="카카오톡 링크 공유"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 z-30">
                    카카오톡 공유
                  </div>
                </div>
              </>
            )}
          </div>
        </td>
      );
  }
}
