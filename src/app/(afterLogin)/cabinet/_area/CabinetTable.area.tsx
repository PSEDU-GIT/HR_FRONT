'use client';

import SelectCabinetDensityAction from '@/app/(afterLogin)/cabinet/_action/cabinetTable/SelectCabinetDensity.action';
import ReadCabinetTableTbodyAction from '@/app/(afterLogin)/cabinet/_action/cabinetTable/ReadCabinetTableTbody.action';
import ReadCabinetTableFooterAction from '@/app/(afterLogin)/cabinet/_action/cabinetTable/ReadCabinetTableFooter.action';
import Table from '@/app/_component/table/Table';

export default function CabinetTableArea() {
  return (
    <div className="flex w-full flex-col gap-6 text-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-text-title text-base font-bold">계약 목록</h3>
        <SelectCabinetDensityAction />
      </div>

      <Table
        tableClassName="w-full table-fixed border-collapse text-left text-sm min-w-[640px]"
        footer={<ReadCabinetTableFooterAction />}
      >
        <thead>
          <tr className="border-custom-slate-border text-text-title border-b font-semibold">
            <th className="w-[22%] px-3 py-3.5 text-left">서명 대상자</th>
            <th className="w-[14%] px-3 py-3.5 text-left">상태</th>
            <th className="w-[18%] px-3 py-3.5 text-center">계약 유형</th>
            <th className="w-[20%] px-3 py-3.5 text-center">계약서 작성일</th>
            <th className="w-[26%] px-3 py-3.5 text-left">Action</th>
          </tr>
        </thead>
        <ReadCabinetTableTbodyAction />
      </Table>
    </div>
  );
}
