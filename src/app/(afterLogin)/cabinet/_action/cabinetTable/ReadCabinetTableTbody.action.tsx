'use client';

import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import { useContractArchiveState } from '@/app/(afterLogin)/cabinet/_state/getContractArchive.state';
import { updateSendSignatureLinkMutation } from '@/app/(afterLogin)/cabinet/_lib/updateSendSignatureLinkMutation';
import CabinetTableCellComponent, {
  ColumnKey,
} from '@/app/(afterLogin)/cabinet/_component/CabinetTableCell.component';

const COLUMN_KEYS: ColumnKey[] = ['instructor', 'status', 'contractType', 'createdAt', 'action'];

export default function ReadCabinetTableTbodyAction() {
  const router = useRouter();
  const { filteredContracts } = useContractArchiveState();
  const { mutate: sendSignatureLink } = updateSendSignatureLinkMutation();

  const { density } = useCabinetStore(
    useShallow((state) => ({
      density: state.density,
    })),
  );

  const handleDetail = (id: number) => {
    router.push(`/cabinet/${id}`);
  };

  const handleEdit = () => {
    router.push('/wizard/summary');
  };

  const handleDelete = (id: number) => {
    if (confirm('해당 계약서를 삭제하시겠습니까?')) {
      alert('삭제 요청이 처리되었습니다.');
    }
  };

  const handleDownload = () => {
    alert('계약서 PDF 다운로드가 시작됩니다.');
  };

  const handleShare = (contractId: number, name: string) => {
    sendSignatureLink(contractId, {
      onSuccess: (res) => {
        alert(res?.message || `${name} 강사님께 카카오톡 서명 링크가 발송되었습니다.`);
      },
      onError: (err: any) => {
        alert(err.message || '카카오톡 서명 링크 발송에 실패했습니다.');
      },
    });
  };

  const cellPadding =
    density === 'comfortable' ? 'py-5' : density === 'compact' ? 'py-1.5' : 'py-3';

  return (
    <tbody className="divide-custom-slate-border divide-y">
      {filteredContracts.length > 0 ? (
        filteredContracts.map((item) => (
          <tr key={item.id} className="hover:bg-custom-slate-hover transition-colors">
            {COLUMN_KEYS.map((key) => (
              <CabinetTableCellComponent
                key={key}
                columnKey={key}
                item={item}
                cellPadding={cellPadding}
                onDetail={() => handleDetail(item.id)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDownload={handleDownload}
                onShare={handleShare}
              />
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-text-side p-8 text-center font-medium">
            검색 조건에 맞는 계약서가 없습니다.
          </td>
        </tr>
      )}
    </tbody>
  );
}
