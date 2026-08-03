'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import SummaryCardComponent from '../_component/SummaryCard.component';

export default function SummarySpecialTermsCardAction() {
  const { step3, setStep3 } = useWizardStore(
    useShallow((state) => ({
      step3: state.step3,
      setStep3: state.setStep3,
    })),
  );

  const [isEditing, setIsEditing] = useState(false);
  const [draftCustomTerms, setDraftCustomTerms] = useState(step3.customTerms || '');

  const handleToggleEdit = () => {
    if (isEditing) {
      setStep3({ customTerms: draftCustomTerms });
      setIsEditing(false);
    } else {
      setDraftCustomTerms(step3.customTerms || '');
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setDraftCustomTerms(step3.customTerms || '');
    setIsEditing(false);
  };

  return (
    <SummaryCardComponent
      title="특약 사항 (선택)"
      isEditing={isEditing}
      onToggleEdit={handleToggleEdit}
      onCancelEdit={handleCancelEdit}
    >
      {isEditing ? (
        <div>
          <textarea
            rows={4}
            value={draftCustomTerms}
            onChange={(e) => setDraftCustomTerms(e.target.value)}
            className="border-custom-slate-border-side text-text-title w-full resize-none rounded-2xl border bg-white p-4 text-xs leading-relaxed font-medium transition-all focus:border-custom-indigo focus:outline-none"
            placeholder="추가로 적용할 특약 사항을 작성해주세요."
          />
        </div>
      ) : (
        <div className="border-custom-slate-border overflow-hidden rounded-xl border bg-white p-3.5">
          <p className="text-text-main whitespace-pre-wrap text-xs font-semibold leading-relaxed">
            {step3.customTerms?.trim() ? step3.customTerms : '등록된 특약 사항이 없습니다.'}
          </p>
        </div>
      )}
    </SummaryCardComponent>
  );
}
