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
  const displayName = item.pendingStaffName || (item.staffId ? `직원 #${item.staffId}` : '미지정 강사');
  const displayPhone = item.phone || '010-0000-0000';

  switch (columnKey) {
    case 'instructor':
      return (
        <td className={cx('px-3 text-left', cellPadding)}>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-900">{displayName}</span>
            <span className="text-xs font-normal text-gray-500">{displayPhone}</span>
          </div>
        </td>
      );

    case 'status':
      return (
        <td className={cx('px-3 text-left', cellPadding)}>
          {item.status === 'SIGNED' ? (
            <span className="inline-flex items-center justify-center rounded-full bg-[#e6fffa] px-2.5 py-0.5 text-xs font-bold text-[#0d9488]">
              체결 완료
            </span>
          ) : item.status === 'SENT' ? (
            <span className="inline-flex items-center justify-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-600 border border-amber-200">
              대기
            </span>
          ) : item.status === 'DRAFT' ? (
            <span className="inline-flex items-center justify-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600 border border-blue-200">
              작성 중
            </span>
          ) : (
            <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-500 border border-gray-200">
              파기
            </span>
          )}
        </td>
      );

    case 'contractType':
      return (
        <td className={cx('px-3 text-left font-semibold text-neutral-800', cellPadding)}>
          {getContractTypeLabel(item.contractType)}
        </td>
      );

    case 'createdAt':
      return (
        <td className={cx('px-3 text-center font-semibold text-neutral-800', cellPadding)}>
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
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95"
              >
                <Eye className="h-4 w-4" />
              </button>
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-md transition-all duration-150 group-hover:-top-9 group-hover:opacity-100 z-20">
                상세보기
              </span>
            </div>

            {item.status !== 'SIGNED' ? (
              <>
                <div className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={onEdit}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-md transition-all duration-150 group-hover:-top-9 group-hover:opacity-100 z-20">
                    수정
                  </span>
                </div>

                <div className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={() => onShare(item.id, displayName)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-md transition-all duration-150 group-hover:-top-9 group-hover:opacity-100 z-20">
                    카카오톡 공유
                  </span>
                </div>

                <div className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-600 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-md transition-all duration-150 group-hover:-top-9 group-hover:opacity-100 z-20">
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
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-md transition-all duration-150 group-hover:-top-9 group-hover:opacity-100 z-20">
                    다운로드
                  </span>
                </div>

                <div className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={() => onShare(item.id, displayName)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-md transition-all duration-150 group-hover:-top-9 group-hover:opacity-100 z-20">
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
