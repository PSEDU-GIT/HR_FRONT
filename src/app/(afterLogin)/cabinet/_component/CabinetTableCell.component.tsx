'use client';

import { Eye, Pencil, Share2, Trash2, Download } from 'lucide-react';
import cx from 'classnames';
import {
  type ContractArchiveItem,
  type ContractType,
} from '@/app/(afterLogin)/cabinet/_model/ContractArchive.model';
import { formatPhoneNumber } from '@/app/util/formatPhoneNumber.util';

export type ColumnKey = 'instructor' | 'status' | 'contractType' | 'createdAt' | 'action';

interface CabinetTableCellProps {
  columnKey: ColumnKey;
  item: ContractArchiveItem;
  density?: 'comfortable' | 'standard' | 'compact';
  cellPadding?: string;
  onDetail: (id: number) => void;
  onEdit: (id: number) => void;
  onShare: (id: number, name: string) => void;
  onDelete: (id: number) => void;
  onDownload: () => void;
}

const getContractTypeLabel = (type: ContractType) => {
  switch (type) {
    case 'TEACHER':
      return '강사근로계약서';
    case 'FREELANCER':
      return '프리랜서계약서';
    case 'GENERAL_STAFF':
      return '일반직원계약서';
    default:
      return type;
  }
};

const getFormattedDate = (dateString: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
};

export default function CabinetTableCell({
  columnKey,
  item,
  density = 'standard',
  cellPadding: customPadding,
  onDetail,
  onEdit,
  onShare,
  onDelete,
  onDownload,
}: CabinetTableCellProps) {
  const cellPadding =
    customPadding || (density === 'comfortable' ? 'py-4' : density === 'compact' ? 'py-2' : 'py-3');

  const displayName =
    item.counterpartyName ||
    item.pendingStaffName ||
    (item.staffId ? `직원 #${item.staffId}` : '미지정 강사');
  const displayPhone = formatPhoneNumber(item.counterpartyPhone || item.phone) || '010-0000-0000';

  switch (columnKey) {
    case 'instructor':
      return (
        <td className={cx('px-3 text-left', cellPadding)}>
          <div className="flex flex-col gap-0.5">
            <span className="text-text-main font-semibold">{displayName}</span>
            <span className="text-text-sub text-xs font-normal">{displayPhone}</span>
          </div>
        </td>
      );

    case 'status':
      return (
        <td className={cx('px-3 text-left', cellPadding)}>
          {item.status === 'SIGNED' ? (
            <span className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
              체결 완료
            </span>
          ) : item.status === 'SENT' ? (
            <span className="inline-flex items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400">
              서명 대기
            </span>
          ) : item.status === 'DRAFT' ? (
            <span className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
              임시 저장
            </span>
          ) : (
            <span className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-500">
              대기
            </span>
          )}
        </td>
      );

    case 'contractType':
      return (
        <td className={cx('text-text-main px-3 text-center font-medium', cellPadding)}>
          {getContractTypeLabel(item.contractType)}
        </td>
      );

    case 'createdAt':
      return (
        <td className={cx('text-text-main px-3 text-center font-medium', cellPadding)}>
          {getFormattedDate(item.createdAt)}
        </td>
      );

    case 'action':
      return (
        <td className={cx('px-3 text-left', cellPadding)}>
          <div className="flex items-center justify-start gap-1.5">
            {/* 상세보기 (항상 표시) */}
            <div className="group relative inline-flex">
              <button
                type="button"
                onClick={() => onDetail(item.id)}
                className="bg-custom-slate-bg text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
              >
                <Eye className="h-4 w-4" />
              </button>
              <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                상세보기
              </span>
            </div>

            {/* 수정 (DRAFT 임시 저장 상태만 표시) */}
            {item.status === 'DRAFT' && (
              <div className="group relative inline-flex">
                <button
                  type="button"
                  onClick={() => onEdit(item.id)}
                  className="bg-custom-slate-bg text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                  수정
                </span>
              </div>
            )}

            {/* 공유 (미체결 상태 표시) */}
            {item.status !== 'SIGNED' && (
              <div className="group relative inline-flex">
                <button
                  type="button"
                  onClick={() => onShare(item.id, displayName)}
                  className="bg-custom-slate-bg text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                  공유
                </span>
              </div>
            )}

            {/* 삭제 (DRAFT 임시 저장 상태만 표시) */}
            {item.status === 'DRAFT' && (
              <div className="group relative inline-flex">
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="bg-custom-slate-bg text-text-side hover:bg-custom-rose-bg hover:text-custom-rose flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                  삭제
                </span>
              </div>
            )}

            {/* 체결 완료 상태 액션 */}
            {item.status === 'SIGNED' && (
              <>
                <div className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={onDownload}
                    className="bg-custom-slate-bg text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
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
                  <span className="bg-text-title pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap text-white opacity-0 transition-all duration-150 group-hover:-top-9 group-hover:opacity-100">
                    공유
                  </span>
                </div>
              </>
            )}
          </div>
        </td>
      );
  }
}
