'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { useCabinetStore } from '@/app/(afterLogin)/cabinet/_state/useCabinetStore';
import CabinetTableCellComponent, {
  ColumnKey,
} from '@/app/(afterLogin)/cabinet/_component/CabinetTableCell.component';

const COLUMN_KEYS: ColumnKey[] = [
  'instructor',
  'status',
  'contractPeriod',
  'createdAt',
  'action',
];

export default function ReadCabinetTableTbodyAction() {
  const router = useRouter();

  const { searchQuery, selectedInstructor, statusFilter, density, contracts, deleteContract } =
    useCabinetStore(
      useShallow((state) => ({
        searchQuery: state.searchQuery,
        selectedInstructor: state.selectedInstructor,
        statusFilter: state.statusFilter,
        density: state.density,
        contracts: state.contracts,
        deleteContract: state.deleteContract,
      })),
    );

  const filteredContracts = useMemo(() => {
    return contracts.filter((item) => {
      if (selectedInstructor !== '전체 강사' && item.instructorName !== selectedInstructor) {
        return false;
      }
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.instructorName.toLowerCase().includes(q);
        const matchPhone = item.instructorPhone.includes(q);
        if (!matchName && !matchPhone) return false;
      }
      return true;
    });
  }, [contracts, selectedInstructor, statusFilter, searchQuery]);

  const handleDetail = (id: string) => {
    router.push(`/cabinet/${id}`);
  };

  const handleEdit = () => {
    router.push('/wizard/step1');
  };

  const handleDelete = (id: string) => {
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
    density === 'comfortable' ? 'py-3.5' : density === 'compact' ? 'py-1.5' : 'py-2.5';

  return (
    <tbody className="divide-y divide-slate-100">
      {filteredContracts.length > 0 ? (
        filteredContracts.map((item) => (
          <tr key={item.id} className="group hover:bg-slate-50/60 transition-colors">
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
          <td colSpan={5} className="text-text-side py-12 text-center text-xs font-semibold">
            검색 조건에 맞는 계약서가 없습니다.
          </td>
        </tr>
      )}
    </tbody>
  );
}
