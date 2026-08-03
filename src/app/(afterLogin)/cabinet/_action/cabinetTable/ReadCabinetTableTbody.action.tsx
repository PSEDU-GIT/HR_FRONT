'use client';

import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import { useContractArchiveState } from '@/app/(afterLogin)/cabinet/_state/getContractArchive.state';
import { useDownloadContractPdfState } from '@/app/(afterLogin)/cabinet/_state/downloadContractPdf.state';
import { updateSendSignatureLinkMutation } from '@/app/(afterLogin)/cabinet/_lib/updateSendSignatureLinkMutation';
import { deleteContractMutation } from '@/app/(afterLogin)/cabinet/_lib/deleteContractMutation';
import CabinetTableCellComponent, {
  ColumnKey,
} from '@/app/(afterLogin)/cabinet/_component/CabinetTableCell.component';

import { useAlert } from '@/app/(afterLogin)/_state/useAlert';

const COLUMN_KEYS: ColumnKey[] = ['instructor', 'status', 'contractType', 'createdAt', 'action'];

export default function ReadCabinetTableTbodyAction() {
  const router = useRouter();

  const { filteredContracts } = useContractArchiveState();
  const { downloadContractPdf } = useDownloadContractPdfState();
  const { mutate: sendSignatureLink } = updateSendSignatureLinkMutation();
  const { mutate: removeContract } = deleteContractMutation();
  const { handleAlert } = useAlert();

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
      removeContract(id, {
        onSuccess: (res) => {
          handleAlert({
            type: 'success',
            title: '삭제 완료',
            description: res?.message || '해당 계약서 삭제 요청이 처리되었습니다.',
          });
        },
        onError: (err: any) => {
          handleAlert({
            type: 'error',
            title: '삭제 실패',
            description: err.message || '계약서 삭제 처리에 실패했습니다.',
          });
        },
      });
    }
  };

  const handleShare = (contractId: number, name: string) => {
    sendSignatureLink(contractId, {
      onSuccess: (res) => {
        handleAlert({
          type: 'success',
          title: '링크 발송 성공',
          description: res?.message || `${name}님께 문자로 서명 링크가 발송되었습니다.`,
        });
      },
      onError: (err: any) => {
        handleAlert({
          type: 'error',
          title: '발송 실패',
          description: err.message || '문자 서명 링크 발송에 실패했습니다.',
        });
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
                onDownload={() =>
                  downloadContractPdf(
                    item.id,
                    item.counterpartyName || item.pendingStaffName || undefined,
                  )
                }
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
