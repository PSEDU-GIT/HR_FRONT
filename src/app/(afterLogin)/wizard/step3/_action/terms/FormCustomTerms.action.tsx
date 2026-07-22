'use client';

import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';

export default function FormCustomTermsAction() {
  const { customTerms, setStep3 } = useWizardStore(
    useShallow((state) => ({
      customTerms: state.step3.customTerms,
      setStep3: state.setStep3,
    })),
  );

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const targetHeight = Math.min(700, Math.max(140, textareaRef.current.scrollHeight));
      textareaRef.current.style.height = `${targetHeight}px`;
    }
  }, [customTerms]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStep3({ customTerms: e.target.value });
  };

  return (
    <textarea
      ref={textareaRef}
      rows={5}
      value={customTerms}
      onChange={handleTextChange}
      placeholder="추가적인 약정사항이 있으면 입력해주세요..."
      className="border-custom-slate-border-side text-text-title min-h-[140px] max-h-[700px] w-full resize-none overflow-y-auto rounded-2xl border bg-white p-4 text-xs leading-relaxed font-medium transition-all focus:border-custom-indigo focus:outline-none"
    />
  );
}
