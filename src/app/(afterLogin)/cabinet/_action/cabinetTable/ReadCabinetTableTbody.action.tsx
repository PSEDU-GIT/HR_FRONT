'use client';

import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import { getContractArchiveQuery } from '@/app/(afterLogin)/cabinet/_lib/getContractArchiveQuery';
import CabinetTableCellComponent, {
  ColumnKey,
} from '@/app/(afterLogin)/cabinet/_component/CabinetTableCell.component';

const COLUMN_KEYS: ColumnKey[] = [
  'instructor',
  'status',
  'contractType',
  'createdAt',
  'action',
];

export default function ReadCabinetTableTbodyAction() {
  const router = useRouter();
  const { data: archiveData } = getContractArchiveQuery();

  const { searchQuery, selectedInstructor, statusFilter, density, contracts, setContracts, deleteContract } =
    useCabinetStore(
      useShallow((state) => ({
        searchQuery: state.searchQuery,
        selectedInstructor: state.selectedInstructor,
        statusFilter: state.statusFilter,
        density: state.density,
        contracts: state.contracts,
        setContracts: state.setContracts,
        deleteContract: state.deleteContract,
      })),
    );

  useEffect(() => {
    if (archiveData) {
      setContracts(archiveData);
    }
  }, [archiveData, setContracts]);

  const filteredContracts = useMemo(() => {
    return contracts.filter((item) => {
      const name = item.pendingStaffName || (item.staffId ? `직원 #${item.staffId}` : '');
      if (selectedInstructor !== '전체 강사' && name !== selectedInstructor) {
        return false;
      }
      if (statusFilter === 'completed' && item.status !== 'SIGNED') {
        return false;
      }
      if (statusFilter === 'pending' && item.status === 'SIGNED') {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = name.toLowerCase().includes(q);
        if (!matchName) return false;
      }
      return true;
    });
  }, [contracts, selectedInstructor, statusFilter, searchQuery]);

  const handleDetail = (id: number) => {
    router.push(`/cabinet/${id}`);
  };

  const handleEdit = () => {
    router.push('/wizard/step1');
  };

  const handleDelete = (id: number) => {
    if (confirm('해당 계약서를 삭제하시겠습니까?')) {
      deleteContract(id);
    }
  };

  const handleDownload = () => {
    alert('계약서 PDF 다운로드가 시작됩니다.');
  };

  const handleShare = (name: string) => {
    alert(`${name} 강사님께 카카오톡 서명 링크가 전달되었습니다.`);
  };

  const cellPadding =
    density === 'comfortable' ? 'py-5' : density === 'compact' ? 'py-1.5' : 'py-3';

  return (
    <tbody className="divide-y divide-gray-100">
      {filteredContracts.length > 0 ? (
        filteredContracts.map((item) => (
          <tr key={item.id} className="transition-colors hover:bg-gray-50/60">
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
          <td colSpan={5} className="p-8 text-center font-medium text-gray-400">
            검색 조건에 맞는 계약서가 없습니다.
          </td>
        </tr>
      )}
    </tbody>
  );
}
