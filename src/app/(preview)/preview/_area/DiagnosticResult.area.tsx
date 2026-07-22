'use client';

import { useShallow } from 'zustand/react/shallow';
import cx from 'classnames';
import { useDiagnosticStore, QUESTIONS } from '../_state/useDiagnosticStore';
import { ShieldAlert, AlertTriangle, AlertCircle } from 'lucide-react';

export default function DiagnosticResultArea() {
  const { answers, restart } = useDiagnosticStore(
    useShallow((state) => ({
      answers: state.answers,
      restart: state.restart,
    })),
  );

  const yesCount = answers.filter(Boolean).length;

  let titleText = '현재 큰 분쟁 리스크가 감지되지 않았습니다.';
  let descText =
    '기본 계약 조항을 잘 준수하고 계십니다. 정기적인 노무 검토로 안전한 학원 운영을 유지하세요.';

  if (yesCount >= 5) {
    titleText = '강사 퇴사 시 법적 분쟁 및 소송 위험이 매우 높습니다!';
    descText =
      '비율제 최소보장 미흡, 근로자성 오인, 주휴수당 미지급 등 심각한 노동법 위반 리스크가 감지되었습니다.';
  } else if (yesCount >= 2) {
    titleText = '인사노무 관련 잠재적 분쟁 위험 요소가 존재합니다.';
    descText = '프리랜서 계약서 문구 및 급여 산정 조항에 대한 정밀 수정 및 정비가 필요합니다.';
  }

  const flaggedQuestions = QUESTIONS.filter((_, idx) => answers[idx]);

  return (
    <div className="min-h-screen bg-gray-50 pb-32 text-gray-900 antialiased">
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur-md">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <span>학온 HR 진단</span>
        </div>

        <span
          className={cx(
            'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-bold',
            {
              'border-rose-200 bg-rose-50 text-rose-700': yesCount >= 5,
              'border-orange-300 bg-orange-50 text-orange-800': yesCount >= 2 && yesCount < 5,
              'border-emerald-200 bg-emerald-50 text-emerald-700': yesCount < 2,
            },
          )}
        >
          {yesCount >= 5 && <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-rose-600" />}
          {yesCount >= 2 && yesCount < 5 && (
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-orange-600" />
          )}
          {yesCount < 2 && <AlertCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600" />}
          <span>{yesCount >= 5 ? '위험' : yesCount >= 2 ? '경고' : '주의'}</span>
        </span>
      </header>

      <main className="mx-auto max-w-md px-4 pt-20">
        <div className="space-y-3">
          <h1 className="text-lg font-bold leading-snug tracking-tight text-gray-900">
            {titleText}
          </h1>

          <p className="text-xs font-medium leading-relaxed text-gray-600">{descText}</p>
        </div>

        {flaggedQuestions.length > 0 && (
          <div className="mt-5 space-y-2.5">
            <h2 className="text-xs font-bold tracking-wider text-gray-900 uppercase">
              점검이 필요한 핵심 리스크 ({flaggedQuestions.length}건)
            </h2>

            <div className="space-y-2">
              {flaggedQuestions.map((q) => (
                <div
                  key={q.id}
                  className={cx(
                    'flex items-center gap-2.5 rounded-xl border p-3.5 shadow-2xs transition-all',
                    {
                      'border-rose-200 bg-rose-50/50 text-rose-950': q.riskLevel === 'critical',
                      'border-orange-300 bg-orange-50/60 text-orange-950': q.riskLevel === 'high',
                      'border-yellow-300 bg-yellow-50/80 text-yellow-950': q.riskLevel === 'mid',
                    },
                  )}
                >
                  {q.riskLevel === 'critical' && (
                    <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600" />
                  )}
                  {q.riskLevel === 'high' && (
                    <AlertTriangle className="h-4 w-4 shrink-0 text-orange-600" />
                  )}
                  {q.riskLevel === 'mid' && (
                    <AlertCircle className="h-4 w-4 shrink-0 text-yellow-600" />
                  )}

                  <span className="text-xs font-bold leading-snug">
                    {q.question}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 rounded-2xl border border-rose-100/60 bg-[#FFF0F3] p-4.5 shadow-2xs">
          <h3 className="mb-2 text-sm font-bold leading-snug tracking-tight text-[#1F194C]">
            분쟁은 퇴사 때 터지지만, 씨앗은 계약 설계에서 심어집니다.
          </h3>
          <p className="text-xs font-medium leading-relaxed text-gray-700">
            오늘 확인하신 위험 신호들은 대부분 계약서 설계 단계에서 막을 수 있습니다. 학온은 대치동
            학원가 10년 현장 경험과 실제 분쟁 1,500건 데이터를 기반으로, 분쟁이 생기기 전에 리스크를
            차단하는 학원 전문 HR·운영 표준 플랫폼입니다.
          </p>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3.5 backdrop-blur-md">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={restart}
            className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-xs transition-all active:scale-[98%]"
          >
            <span>다시 진단하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
