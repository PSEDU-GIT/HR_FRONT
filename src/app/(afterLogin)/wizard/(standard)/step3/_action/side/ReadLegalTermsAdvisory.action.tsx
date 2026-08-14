'use client';

export default function ReadLegalTermsAdvisoryAction() {
  return (
    <div className="border-custom-slate-border-side space-y-2 rounded-2xl border bg-white p-4 transition-all dark:bg-slate-900">
      <div className="text-text-title text-xs font-extrabold">
        [자문] 특약사항 법적 유효성 가이드
      </div>
      <p className="text-text-sub text-xs leading-relaxed font-medium">
        근로기준법에 반하는 강제적인 벌금 부과나 퇴직금 포기 합의 등은 특약으로 기재하더라도 전부
        무효가 되며 오히려 임금체불이나 근로기준법 위반으로 형사 처벌 대상이 될 수 있습니다.
      </p>
    </div>
  );
}
