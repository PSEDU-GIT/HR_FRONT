'use client';

import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { ArrowRightLeft } from 'lucide-react';

interface RecommendationRule {
  id: string;
  targetKeywords: string[];
  title: string;
  description: React.ReactNode;
  recommendation: string;
  matchPattern: RegExp;
}

const RULES: RecommendationRule[] = [
  {
    id: 'penalty',
    targetKeywords: ['벌금', '공제'],
    title: '[주의] 벌금 및 손해배상 예정 금지 조항 대체 추천',
    description: (
      <>
        <p>
          지각·결석에 대해 <strong className="underline">강제 벌금이나 수당 공제</strong>를 약정하는
          것은 근로기준법 제20조 위반으로 무효가 됩니다.
        </p>
        <p className="mt-1 font-extrabold">대체 추천 방향:</p>
        <ul className="ml-4 list-disc space-y-1">
          <li>근무시간 미달 발생 시 해당 소정 시급 일할 정산 적용</li>
          <li>상습 지각 시 복무 징계 절차 적용</li>
        </ul>
      </>
    ),
    recommendation:
      '[특약] 지각·조퇴 등 소정근로시간 미달 발생 시 해당 시간만큼 일할 정산하며, 상습 지각 시 취업규칙에 따른 복무 징계 절차를 적용한다.',
    matchPattern: /\[특약\]\s*지각.*공제한다\.?|벌금.*공제[^\n.]*/g,
  },
  {
    id: 'severance',
    targetKeywords: ['퇴직금', '포기'],
    title: '[주의] 사전 퇴직금 포기 약정 무효 대안 추천',
    description: (
      <>
        <p>
          계약 체결 시 <strong className="underline">사전 퇴직금 포기 합의</strong>는 법적으로 무효
          처리되며 퇴직 시 청구권이 유효하게 발생합니다.
        </p>
        <p className="mt-1 font-extrabold">대체 추천 방향:</p>
        <ul className="ml-4 list-disc space-y-1">
          <li>법정 퇴직금 산정 기준 및 지급 요건 명시</li>
        </ul>
      </>
    ),
    recommendation:
      '[특약] 1년 이상 계속 근로 시 근로자퇴직급여 보장법 등 관련 법령이 정하는 기준에 따라 정당한 퇴직금을 지급한다.',
    matchPattern: /\[특약\]\s*본 계약 체결 시 퇴직금.*요구하지 않는다\.?|퇴직금.*포기[^\n.]*/g,
  },
  {
    id: 'unpaidTime',
    targetKeywords: ['무급', '준비', '회의'],
    title: '[주의] 수업 준비/회의 무급 처리 대안 추천',
    description: (
      <>
        <p>
          사용자의 지휘·감독 하의 <strong className="underline">준비시간 및 회의시간</strong>은 유급
          근로시간으로 산정되어야 합니다.
        </p>
        <p className="mt-1 font-extrabold">대체 추천 방향:</p>
        <ul className="ml-4 list-disc space-y-1">
          <li>공식 회의 및 준비시간을 소정 근로시간에 포함하여 지급</li>
        </ul>
      </>
    ),
    recommendation:
      '[특약] 업무에 수반되는 사전 준비시간 및 주간 회의시간은 소정 근로시간에 포함하여 수당을 정상 지급한다.',
    matchPattern: /\[특약\]\s*수업 전.*간주한다\.?|무급[^\n.]*근로[^\n.]*/g,
  },
  {
    id: 'competePenalty',
    targetKeywords: ['10km', '3년', '위약금'],
    title: '[주의] 과도한 경업금지 및 위약금 대안 추천',
    description: (
      <>
        <p>
          과도한 범위(10km 이상, 3년 이상) 및 <strong className="underline">위약금 설정</strong>은
          무효 위험이 높습니다.
        </p>
        <p className="mt-1 font-extrabold">대체 추천 방향:</p>
        <ul className="ml-4 list-disc space-y-1">
          <li>반경 3km 이내, 6개월 이내의 적정 범위 설정</li>
          <li>경업금지 보상수당 명시</li>
        </ul>
      </>
    ),
    recommendation:
      '[특약] 퇴직 후 6개월간 반경 3km 이내 동일 업종 경쟁 학원 취업 및 원생 유인을 금지하며, 이에 따른 약정 보상수당을 지급한다.',
    matchPattern: /\[특약\]\s*퇴직 후 3년간.*지급한다\.?|위약금[^\n.]*지급[^\n.]*/g,
  },
];

export default function ReadLegalTermRecommendationAction() {
  const { customTerms, setStep3 } = useWizardStore(
    useShallow((state) => ({
      customTerms: state.step3.customTerms,
      setStep3: state.setStep3,
    })),
  );

  const activeRecommendations = RULES.filter((rule) => {
    if (customTerms.includes(rule.recommendation)) return false;
    return rule.targetKeywords.some((kw) => customTerms.includes(kw));
  });

  if (activeRecommendations.length === 0) return null;

  const handleApplyRecommendation = (rule: RecommendationRule) => {
    let newText = customTerms;
    if (rule.matchPattern.test(newText)) {
      newText = newText.replace(rule.matchPattern, rule.recommendation);
    } else {
      const lines = newText.split('\n');
      const filteredLines = lines.filter(
        (line) => !rule.targetKeywords.some((kw) => line.includes(kw)),
      );
      filteredLines.push(rule.recommendation);
      newText = filteredLines.join('\n').trim();
    }
    setStep3({ customTerms: newText });
  };

  return (
    <div className="space-y-3">
      {activeRecommendations.map((rule) => (
        <div
          key={rule.id}
          className="border-custom-yellow-border bg-custom-yellow-bg text-custom-yellow space-y-3 rounded-2xl border p-4 text-xs transition-all"
        >
          <div className="text-xs font-extrabold">{rule.title}</div>
          <div className="space-y-1 text-xs leading-relaxed font-medium">{rule.description}</div>

          <div className="border-custom-yellow-border/40 space-y-2 border-t pt-2.5">
            <div className="border-custom-yellow-border/50 text-text-main rounded-xl border bg-white/95 p-3 text-xs font-bold leading-relaxed shadow-2xs">
              {rule.recommendation}
            </div>
            <button
              type="button"
              onClick={() => handleApplyRecommendation(rule)}
              className="bg-custom-yellow hover:bg-custom-yellow-hover flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-extrabold text-white transition-all active:scale-[0.98]"
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>대체 문구로 교체</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
