'use client';

import ReadCabinetTableCountAction from '@/app/(afterLogin)/cabinet/_action/cabinetTable/ReadCabinetTableCount.action';
import SelectCabinetDensityAction from '@/app/(afterLogin)/cabinet/_action/cabinetTable/SelectCabinetDensity.action';
import ReadCabinetTableTbodyAction from '@/app/(afterLogin)/cabinet/_action/cabinetTable/ReadCabinetTableTbody.action';

export default function CabinetTableArea() {
  return (
    <div className="flex w-full flex-col gap-6 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-neutral-900">계약 목록</h3>
          <ReadCabinetTableCountAction />
        </div>
        <SelectCabinetDensityAction />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 font-bold text-neutral-900">
              <th className="w-[17%] px-3 py-3.5 text-left">서명 대상자</th>
              <th className="w-[13%] px-3 py-3.5 text-left">상태</th>
              <th className="w-[23%] px-3 py-3.5 text-left">계약 유형</th>
              <th className="w-[20%] px-3 py-3.5 text-center">계약서 작성일</th>
              <th className="w-[27%] px-3 py-3.5 text-left">Action</th>
            </tr>
          </thead>
          <ReadCabinetTableTbodyAction />
        </table>
      </div>
    </div>
  );
}
