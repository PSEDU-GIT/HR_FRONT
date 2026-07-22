'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import cx from 'classnames';

const TEMPLATES = [
  {
    id: '비밀유지 및 지식재산권 귀속',
    title: '비밀유지 및 지식재산권 귀속',
    description:
      '강의 교재, 시험 문제 등 학원에서 개발한 콘텐츠에 대한 저작권을 학원에 귀속시키고 비밀을 유지하도록 하는 기본 특약입니다.',
  },
  {
    id: '경업금지 및 고객 유인 금지',
    title: '경업금지 및 고객 유인 금지',
    description:
      '퇴직 후 일정 기간 동안 인근 지역 내 동일 업종 경쟁 학원에 취업하거나 창업하는 것을 금지하며, 원생을 유인하지 못하도록 약정합니다.',
  },
];

export default function SelectTermsTemplatesAction() {
  const { selectedTemplates, setStep3 } = useWizardStore(
    useShallow((state) => ({
      selectedTemplates: state.step3.selectedTemplates,
      setStep3: state.setStep3,
    })),
  );

  const toggleTemplate = (id: string) => {
    const exists = selectedTemplates.includes(id);
    const updated = exists
      ? selectedTemplates.filter((item) => item !== id)
      : [...selectedTemplates, id];
    setStep3({ selectedTemplates: updated });
  };

  return (
    <div className="space-y-3">
      {TEMPLATES.map((tmpl) => {
        const isChecked = selectedTemplates.includes(tmpl.id);
        return (
          <div
            key={tmpl.id}
            onClick={() => toggleTemplate(tmpl.id)}
            className={cx(
              'flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-200',
              isChecked
                ? 'border-custom-indigo-border ring-custom-indigo-border bg-white ring-2'
                : 'border-custom-slate-border bg-white hover:border-slate-300 hover:bg-slate-50/60',
            )}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => {}}
              className="accent-custom-indigo mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
            />
            <div>
              <h4 className="text-text-main text-xs font-bold">{tmpl.title}</h4>
              <p className="text-text-sub mt-1 text-[11px] leading-relaxed font-medium">
                {tmpl.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
