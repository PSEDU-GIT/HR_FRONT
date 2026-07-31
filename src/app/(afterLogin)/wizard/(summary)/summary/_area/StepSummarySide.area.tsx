'use client';

import NextStepBtn from '@/app/(afterLogin)/wizard/_component/NextStepBtn';

export default function StepSummarySideArea() {
  return (
    <aside className="ml-6 w-[540px] shrink-0 space-y-4">
      <div className="absolute top-[14px] right-0 flex justify-end">
        <NextStepBtn className="w-48" />
      </div>

      <div className="rounded-3xl border border-custom-slate-border-side bg-white p-6 space-y-4">
        <h4 className="text-13 font-bold text-text-title">이전 계약 불러오기 요약 가이드</h4>
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
          <p>
            • 기존 계약서의 조건들이 자동으로 입력되었습니다.
          </p>
          <p>
            • 변경된 급여나 근무 일정 등 수정할 사항이 있는 경우 왼쪽 영역에서 즉시 수정할 수 있습니다.
          </p>
          <p className="text-indigo-600 font-bold">
            • [다음 단계로] 버튼을 클릭하면 4단계 계약서 초안 검토 페이지로 바로 이동합니다.
          </p>
        </div>
      </div>
    </aside>
  );
}
