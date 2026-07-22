'use client';

import FormCustomTermsAction from '@/app/(afterLogin)/wizard/step3/_action/terms/FormCustomTerms.action';

export default function Step3TermsArea() {
  return (
    <div className="space-y-2 pt-2">
      <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
        특약사항 (선택)
      </legend>
      <FormCustomTermsAction />
    </div>
  );
}
