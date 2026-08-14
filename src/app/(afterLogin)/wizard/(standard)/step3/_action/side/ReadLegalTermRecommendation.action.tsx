'use client';

import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { ArrowRightLeft } from 'lucide-react';
import { useContractRiskRulesState } from '@/app/(afterLogin)/wizard/(standard)/step3/_state/getContractRiskRules.state';
import { RiskRuleGetDto } from '@/app/(afterLogin)/wizard/_model/ContractRiskRule.model';

const formatBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-extrabold underline">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const renderMarkdownDescription = (text: string | null | undefined) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-1 text-xs leading-relaxed font-medium">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ')) {
          return (
            <li key={idx} className="ml-4 list-disc">
              {formatBoldText(trimmed.slice(2))}
            </li>
          );
        }
        return <p key={idx}>{formatBoldText(line)}</p>;
      })}
    </div>
  );
};

export default function ReadLegalTermRecommendationAction() {
  const { customTerms, setStep3 } = useWizardStore(
    useShallow((state) => ({
      customTerms: state.step3.customTerms,
      setStep3: state.setStep3,
    })),
  );

  const { riskRules } = useContractRiskRulesState('TEACHER');

  const toxicRules = riskRules?.filter((r) => r.ruleType === 'TOXIC_CLAUSE') || [];

  const activeRecommendations = toxicRules.filter((rule) => {
    if (!rule.recommendation) return false;
    if (customTerms.includes(rule.recommendation)) return false;

    const keywords = rule.targetKeywords || [];
    if (keywords.length === 0) return false;

    return keywords.some((kw) => kw && customTerms.includes(kw));
  });

  if (activeRecommendations.length === 0) return null;

  const handleApplyRecommendation = (rule: RiskRuleGetDto) => {
    if (!rule.recommendation) return;
    let newText = customTerms;

    let regex: RegExp | null = null;
    if (rule.matchPattern) {
      try {
        regex = new RegExp(rule.matchPattern, rule.matchPatternFlags || 'g');
      } catch (err) {
        console.error('Invalid regex pattern from rule:', err); } } if (regex && regex.test(newText)) { newText = newText.replace(regex, rule.recommendation); } else { const keywords = rule.targetKeywords || []; const lines = newText.split('\n');
      const filteredLines = lines.filter((line) => !keywords.some((kw) => kw && line.includes(kw)));
      filteredLines.push(rule.recommendation);
      newText = filteredLines.join('\n').trim();
    }

    setStep3({ customTerms: newText });
  };

  return (
    <div className="space-y-3">
      {activeRecommendations.map((rule, idx) => (
        <div
          key={rule.ruleKey || idx}
          className="border-custom-yellow-border bg-custom-yellow-bg text-custom-yellow space-y-3 rounded-2xl border p-4 text-xs transition-all"
        >
          <div className="text-xs font-extrabold">
            {rule.advisoryTitle || '[주의] 독소 조항 검출'}
          </div>
          {renderMarkdownDescription(rule.advisoryDescriptionMarkdown)}

          {rule.recommendation && (
            <div className="border-custom-yellow-border/40 space-y-2 border-t pt-2.5">
              <div className="border-custom-yellow-border/50 text-text-main rounded-xl border bg-white/95 p-3 text-xs leading-relaxed font-bold shadow-2xs">
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
          )}
        </div>
      ))}
    </div>
  );
}
