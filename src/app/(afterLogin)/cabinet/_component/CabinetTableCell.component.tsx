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
        <td className={cx('px-3 py-4 text-left', cellPadding)}>
          <span className="font-bold text-neutral-900">{item.instructorName}</span>
          <span className="ml-2 text-xs font-normal text-gray-500">({item.instructorPhone})</span>
        </td>
      );

    case 'status':
      return (
        <td className={cx('px-3 py-4 text-left', cellPadding)}>
          {item.status === 'pending' ? (
            <span className="inline-flex items-center justify-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-600 border border-amber-200">
              대기
            </span>
          ) : (
            <span className="inline-flex items-center justify-center rounded-full bg-[#e6fffa] px-2.5 py-0.5 text-xs font-bold text-[#0d9488]">
              체결 완료
            </span>
          )}
        </td>
      );

    case 'contractPeriod':
      return (
        <td className={cx('px-3 py-4 text-left font-semibold text-neutral-800', cellPadding)}>
          {item.startDate} ~ {item.endDate}
        </td>
      );

    case 'createdAt':
      return (
        <td className={cx('px-3 py-4 text-center font-semibold text-neutral-800', cellPadding)}>
          {item.createdAt}
        </td>
      );

    case 'action':
      return (
        <td className={cx('px-3 py-4 text-center', cellPadding)}>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onDetail}
              title="상세보기"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Eye className="h-4 w-4" />
            </button>

            {item.status === 'pending' ? (
              <>
                <button
                  type="button"
                  onClick={onEdit}
                  title="수정"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onShare(item.instructorName)}
                  title="카카오톡 공유"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Share2 className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  title="삭제"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onDownload}
                  title="다운로드"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Download className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onShare(item.instructorName)}
                  title="카카오톡 공유"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </td>
      );
  }
}
