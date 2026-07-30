'use client';

import { Edit3 } from 'lucide-react';
import { type RenewalContractItem } from '@/app/(afterLogin)/dashboard/_model/RenewalContracts.model';

export type RenewalColumnKey = 'signer' | 'date' | 'remaining' | 'action';

interface RenewalContractTableCellProps {
  columnKey: RenewalColumnKey;
  item: RenewalContractItem;
  onRecontract: () => void;
}

export default function RenewalContractTableCell({
  columnKey,
  item,
  onRecontract,
}: RenewalContractTableCellProps) {
  const isExpired = item.remainingDays <= 0;
  const dDayLabel = isExpired ? '만료됨' : `D-${item.remainingDays}`;

  switch (columnKey) {
    case 'signer':
      return (
        <td className="px-3 py-4">
          <span className="font-bold text-neutral-900">{item.signerName}</span>
          <span className="ml-2 text-xs font-normal text-gray-500">
            ({item.signerPhone || '010-0000-0000'})
          </span>
        </td>
      );
    case 'date':
      return (
        <td className="px-3 py-4 font-semibold text-neutral-800">
          {item.contractStartDate} ~ {item.contractEndDate}
        </td>
      );
    case 'remaining':
      return (
        <td className="px-3 py-4">
          {isExpired ? (
            <span className="inline-flex items-center justify-center rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-bold text-rose-500">
              {dDayLabel}
            </span>
          ) : (
            <span className="inline-flex items-center justify-center rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-600">
              {dDayLabel}
            </span>
          )}
        </td>
      );
    case 'action':
      return (
        <td className="px-3 py-4 text-center">
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={onRecontract}
              title="재계약 작성"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          </div>
        </td>
      );
    default:
      return null;
  }
}
