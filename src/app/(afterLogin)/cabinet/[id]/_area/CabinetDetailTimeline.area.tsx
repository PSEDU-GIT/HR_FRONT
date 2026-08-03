'use client';

import ReadCabinetDetailTimelineAction from '../_action/ReadCabinetDetailTimeline.action';

export default function CabinetDetailTimelineArea() {
  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <span className="mb-4 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
          이 문서의 흐름 타임라인
        </span>
        <ReadCabinetDetailTimelineAction />
      </div>
    </div>
  );
}
