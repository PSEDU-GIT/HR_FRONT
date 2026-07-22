'use client';

import { useShallow } from 'zustand/react/shallow';
import { useDiagnosticStore, QUESTIONS } from '../_state/useDiagnosticStore';
import { ShieldAlert, AlertTriangle, AlertCircle } from 'lucide-react';

function RiskLevelBadge({
  level,
  category,
}: {
  level: 'critical' | 'high' | 'mid';
  category: string;
}) {
  if (level === 'critical') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-700">
        <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-rose-600" />
        <span>{category}</span>
      </span>
    );
  }

  if (level === 'high') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-orange-300 bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-800">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-orange-600" />
        <span>{category}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-yellow-300 bg-yellow-50 px-2 py-0.5 text-[11px] font-bold text-yellow-900">
      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-yellow-600" />
      <span>{category}</span>
    </span>
  );
}

export default function DiagnosticQuestionArea() {
  const { questionIndex, answers, answerQuestion, prevQuestion } = useDiagnosticStore(
    useShallow((state) => ({
      questionIndex: state.questionIndex,
      answers: state.answers,
      answerQuestion: state.answerQuestion,
      prevQuestion: state.prevQuestion,
    })),
  );

  const currentQ = QUESTIONS[questionIndex];
  const selectedAnswer = answers[questionIndex];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="flex h-12 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <span>학온 HR 진단</span>
          </div>

          <span className="font-mono text-[11px] font-bold text-blue-600">
            {questionIndex + 1} / {QUESTIONS.length}
          </span>
        </div>

        <div className="flex h-1 w-full gap-0.5 bg-gray-100 px-1">
          {QUESTIONS.map((_, idx) => (
            <div
              key={idx}
              className={`h-full flex-1 rounded-full transition-colors ${
                idx <= questionIndex ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 pt-18 pb-24">
        <div className="space-y-2">
          <RiskLevelBadge level={currentQ.riskLevel} category={currentQ.category} />

          <h1 className="mt-1 text-lg leading-snug font-bold tracking-tight text-gray-900">
            {currentQ.question}
          </h1>

          <p className="text-xs leading-relaxed font-medium text-gray-500">{currentQ.helperText}</p>
        </div>

        <div className="mt-5 space-y-2.5">
          <div
            onClick={() => answerQuestion(true)}
            className={`flex min-h-[52px] w-full cursor-pointer items-center justify-center rounded-xl border px-4 py-3.5 text-center shadow-2xs transition-all active:scale-[98%] ${
              selectedAnswer === true
                ? 'border-blue-600 bg-blue-600 font-bold text-white shadow-sm'
                : 'border-gray-200 bg-white font-semibold text-gray-900 hover:border-gray-300 hover:bg-gray-50/80'
            }`}
          >
            <span className="text-xs">예, 해당됩니다</span>
          </div>

          <div
            onClick={() => answerQuestion(false)}
            className={`flex min-h-[52px] w-full cursor-pointer items-center justify-center rounded-xl border px-4 py-3.5 text-center shadow-2xs transition-all active:scale-[98%] ${
              selectedAnswer === false
                ? 'border-blue-600 bg-blue-600 font-bold text-white shadow-sm'
                : 'border-gray-200 bg-white font-semibold text-gray-900 hover:border-gray-300 hover:bg-gray-50/80'
            }`}
          >
            <span className="text-xs">아니요, 해당 없습니다</span>
          </div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <button
            type="button"
            onClick={prevQuestion}
            className="cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-900"
          >
            ← 이전 문항
          </button>
          <span className="text-[10px] font-medium text-gray-400">
            옵션을 선택하면 다음 문항으로 이동합니다
          </span>
        </div>
      </div>
    </div>
  );
}
