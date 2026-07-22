'use client';

import ReadFilterSearchAction from '@/app/(afterLogin)/cabinet/_action/cabinetFilter/ReadFilterSearch.action';
import ReadFilterStatusAction from '@/app/(afterLogin)/cabinet/_action/cabinetFilter/ReadFilterStatus.action';
import ReadFilterInstructorListAction from '@/app/(afterLogin)/cabinet/_action/cabinetFilter/ReadFilterInstructorList.action';
import ReadFilterResetAction from '@/app/(afterLogin)/cabinet/_action/cabinetFilter/ReadFilterReset.action';
import ReadFilterInstructorCountAction from '@/app/(afterLogin)/cabinet/_action/cabinetFilter/ReadFilterInstructorCount.action';

export default function CabinetFilterArea() {
  return (
    <aside className="border-custom-slate-border-side w-full shrink-0 space-y-6 rounded-2xl border bg-white p-5 lg:w-80 xl:w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-text-title text-sm font-extrabold tracking-tight">상세 검색 및 필터</h3>
          <ReadFilterResetAction />
        </div>

        <div className="space-y-1.5">
          <label className="text-text-title text-xs font-bold">통합 검색</label>
          <ReadFilterSearchAction />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-text-title text-xs font-bold">계약 상태</label>
        <ReadFilterStatusAction />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <h4 className="text-text-title text-xs font-extrabold">강사 목록</h4>
          <ReadFilterInstructorCountAction />
        </div>
        <ReadFilterInstructorListAction />
      </div>
    </aside>
  );
}
