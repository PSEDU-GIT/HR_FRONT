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
          <span className="text-text-main font-bold">{item.signerName}</span>
          <span className="text-text-sub ml-2 text-xs font-normal">
            ({item.signerPhone || '010-0000-0000'})
          </span>
        </td>
      );
    case 'date':
      return (
        <td className="text-text-main px-3 py-4 font-semibold">
          {item.contractStartDate} ~ {item.contractEndDate}
        </td>
      );
    case 'remaining':
      return (
        <td className="px-3 py-4">
          {isExpired ? (
            <span className="bg-custom-rose-bg border-custom-rose-border text-custom-rose inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-bold">
              {dDayLabel}
            </span>
          ) : (
            <span className="bg-custom-yellow-bg border-custom-yellow-border text-custom-yellow inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-bold">
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
              className="bg-custom-slate-bg text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
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
