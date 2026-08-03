'use client';

import { useRouter } from 'next/navigation';
import { useRenewalContractsState } from '@/app/(afterLogin)/dashboard/_state/getRenewalContracts.state';
import RenewalContractTableCell, {
  RenewalColumnKey,
} from '@/app/(afterLogin)/dashboard/_component/RenewalContractTableCell';

const COLUMN_KEYS: RenewalColumnKey[] = ['signer', 'date', 'remaining', 'action'];

export default function ReadRenewalContractsAction() {
  const router = useRouter();
  const { contracts } = useRenewalContractsState();

  const handleRecontract = () => {
    router.push('/wizard/step1');
  };

  if (contracts.length === 0) {
    return (
      <tr>
        <td colSpan={4} className="text-text-side p-8 text-center font-medium">
          갱신이 필요한 계약서가 없습니다.
        </td>
      </tr>
    );
  }

  return (
    <>
      {contracts.map((item) => (
        <tr key={item.hrDocumentId} className="hover:bg-custom-slate-hover transition-colors">
          {COLUMN_KEYS.map((key) => (
            <RenewalContractTableCell
              key={key}
              columnKey={key}
              item={item}
              onRecontract={handleRecontract}
            />
          ))}
        </tr>
      ))}
    </>
  );
}
