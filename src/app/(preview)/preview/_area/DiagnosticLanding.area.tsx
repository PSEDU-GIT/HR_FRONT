'use client';

import { useShallow } from 'zustand/react/shallow';
import { useDiagnosticStore } from '../_state/useDiagnosticStore';

export default function DiagnosticLandingArea() {
  const { startDiagnostic } = useDiagnosticStore(
    useShallow((state) => ({
      startDiagnostic: state.startDiagnostic,
    })),
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur-md">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <span>학온 HR 진단</span>
        </div>

        <span className="text-11 font-semibold text-gray-500">진단 시작</span>
      </header>

      <main className="mx-auto max-w-md px-4 pt-20">
        <div className="space-y-3">
          <h1 className="text-xl leading-snug font-bold tracking-tight text-gray-900">
            우리 학원 강사 계약서,
            <br />
            분쟁 위험은 얼마나 될까요?
          </h1>

          <p className="text-xs leading-relaxed font-medium text-gray-600">
            8개 문항, 1분이면 충분합니다. 실제 분쟁 1,500건 데이터를 기반으로 원장님 학원의 인사노무
            리스크를 사전 점검합니다.
          </p>
        </div>

        <div className="mt-5 space-y-2.5 rounded-xl border border-gray-200 bg-white p-4 shadow-2xs">
          <h2 className="text-xs font-bold tracking-wider text-gray-900 uppercase">
            이런 원장님께 꼭 필요합니다
          </h2>
          <ul className="space-y-2 text-xs font-medium text-gray-700">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              <span>비율제(인센티브) 강사를 두고 있다</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              <span>프리랜서 계약서를 인터넷 양식으로 쓰고 있다</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              <span>강사 퇴사 후 분쟁이 걱정된다</span>
            </li>
          </ul>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3.5 backdrop-blur-md">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={startDiagnostic}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-xs transition-all active:scale-[98%]"
          >
            <span>무료 진단 시작하기 →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
