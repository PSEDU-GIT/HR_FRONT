'use client';

import cx from 'classnames';
import { Eye, Pencil, Trash2, Download, Share2 } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { type ContractArchiveItem } from '@/app/(afterLogin)/cabinet/_model/ContractArchive.model';

export type ColumnKey = 'instructor' | 'status' | 'contractType' | 'createdAt' | 'action';

interface CabinetTableCellComponentProps {
  columnKey: ColumnKey;
  item: ContractArchiveItem;
  cellPadding: string;
  onDetail: () => void;
  onEdit: () => void;
  onDelete: (id: number) => void;
  onDownload: () => void;
  onShare: (id: number, name: string) => void;
}

const getFormattedDate = (dateStr?: string | null) => {
  if (!dateStr) return '-';
  try {
    const formattedStr = dateStr.replace(' ', 'T');
    const parsed = parseISO(formattedStr);
    if (isValid(parsed)) {
      return format(parsed, 'yyyy. MM. dd.');
    }
  } catch (e) {
    // fallback
  }
  return dateStr;
};

const getContractTypeLabel = (type: string) => {
  switch (type) {
    case 'TEACHER':
      return '강사 근로계약서';
    case 'FREELANCER':
      return '프리랜서 계약서';
    case 'GENERAL_STAFF':
      return '일반 직원 계약서';
    default:
      return type;
  }
};

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
  const displayName = item.counterpartyName || item.pendingStaffName || (item.staffId ? `직원 #${item.staffId}` : '미지정 강사');
  const displayPhone = item.counterpartyPhone || item.phone || '010-0000-0000';

  switch (columnKey) {
    case 'instructor':
      return (
        <td className={cx('px-3 text-left', cellPadding)}>
          <div className="flex flex-col gap-0.5">
            <span className="text-text-main font-bold">{displayName}</span>
            <span className="text-text-sub text-xs font-normal">{displayPhone}</span>
          </div>
        </td>
      );

    case 'status':
      return (
        <td className={cx('px-3 text-left', cellPadding)}>
          {item.status === 'SIGNED' ? (
            <span className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
              체결 완료
            </span>
          ) : item.status === 'SENT' ? (
            <span className="bg-custom-yellow-bg border-custom-yellow-border text-custom-yellow inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-bold">
              대기
            </span>
          ) : item.status === 'DRAFT' ? (
            <span className="bg-custom-indigo-bg border-custom-indigo-border text-custom-indigo inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-bold">
              작성 중
            </span>
          ) : (
            <span className="bg-custom-slate-bg border-custom-slate-border text-text-side inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-bold">
              파기
            </span>
          )}
        </td>
      );

    case 'contractType':
      return (
        <td className={cx('text-text-main px-3 text-left font-semibold', cellPadding)}>
          {getContractTypeLabel(item.contractType)}
        </td>
      );

    case 'createdAt':
      return (
        <td className={cx('text-text-main px-3 text-center font-semibold', cellPadding)}>
          {getFormattedDate(item.createdAt)}
        </td>
      );

    case 'action':
      return (
        <td className={cx('px-3 text-left', cellPadding)}>
          <div className="flex items-center justify-start gap-1.5">
            <div className="group relative inline-flex">
              <button
                type="button"
                onClick={onDetail}
                className="bg-custom-slate-bg text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
              >
                <Eye className="h-4 w-4" />
              </button>
              <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                상세보기
              </span>
            </div>

            {item.status !== 'SIGNED' ? (
              <>
                <div className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={onEdit}
                    className="bg-custom-slate-bg text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                    수정
                  </span>
                </div>

                <div className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={() => onShare(item.id, displayName)}
                    className="bg-custom-slate-bg text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                    카카오톡 공유
                  </span>
                </div>

                <div className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="bg-custom-slate-bg text-text-side hover:bg-custom-rose-bg hover:text-custom-rose flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                    삭제
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={onDownload}
                    className="bg-custom-slate-bg text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                    다운로드
                  </span>
                </div>

                <div className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={() => onShare(item.id, displayName)}
                    className="bg-custom-slate-bg text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                    카카오톡 공유
                  </span>
                </div>
              </>
            )}
          </div>
        </td>
      );
  }
}
