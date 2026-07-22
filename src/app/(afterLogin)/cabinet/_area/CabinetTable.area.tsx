'use client';

import ReadCabinetTableCountAction from '@/app/(afterLogin)/cabinet/_action/cabinetTable/ReadCabinetTableCount.action';
import SelectCabinetDensityAction from '@/app/(afterLogin)/cabinet/_action/cabinetTable/SelectCabinetDensity.action';
import ReadCabinetTableTbodyAction from '@/app/(afterLogin)/cabinet/_action/cabinetTable/ReadCabinetTableTbody.action';

export default function CabinetTableArea() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-text-title text-sm font-extrabold">계약 목록</span>
          <ReadCabinetTableCountAction />
        </div>
        <SelectCabinetDensityAction />
      </div>

      <div className="border-custom-slate-border-side hidden rounded-2xl border bg-white md:block">
        <table className="font-variant-numeric: w-full border-collapse text-left text-xs tabular-nums">
          <thead className="bg-slate-50">
            <tr className="border-custom-slate-border-side text-text-sub border-b text-[11px] font-bold">
              <th className="w-[25%] px-4 py-3 text-left">서명 대상자</th>
              <th className="w-[15%] px-4 py-3 text-left">상태</th>
              <th className="w-[30%] px-4 py-3 text-left">계약일</th>
              <th className="w-[15%] px-4 py-3 text-center">계약서 작성일</th>
              <th className="w-[15%] px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <ReadCabinetTableTbodyAction />
        </table>
      </div>
    </div>
  );
}
