'use client';

export default function ReadPreviousContractSummaryAction() {
  return (
    <div className="border-custom-slate-border bg-custom-slate-bg/50 space-y-2.5 rounded-2xl border p-4 text-xs">
      <div className="flex justify-between">
        <span className="text-text-side font-semibold">계약서 명칭</span>
        <span className="text-text-title font-extrabold">박서준 강사 임용 근로계약서</span>
      </div>
      <div className="flex justify-between">
        <span className="text-text-side font-semibold">계약 유형</span>
        <span className="text-text-title font-extrabold">강사근로계약서</span>
      </div>
      <div className="flex justify-between">
        <span className="text-text-side font-semibold">급여 조건</span>
        <span className="text-text-title font-extrabold">시급 10,500원</span>
      </div>
      <div className="flex justify-between">
        <span className="text-text-side font-semibold">계약 기간</span>
        <span className="text-text-title font-extrabold">2026-07-15 ~ 2027-07-14</span>
      </div>
    </div>
  );
}
