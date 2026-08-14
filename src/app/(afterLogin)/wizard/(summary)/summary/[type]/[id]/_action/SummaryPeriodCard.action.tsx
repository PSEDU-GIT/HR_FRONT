'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import CustomDate from '@/app/_component/date/CustomDate';
import Select, { SelectDataTypes } from '@/app/_component/select/Select';
import SummaryCardComponent from '../_component/SummaryCard.component';
import SummaryKeyValueListComponent from '../_component/SummaryKeyValueList.component';

const PROBATION_OPTIONS: SelectDataTypes[] = [
  { id: '없음', displayName: '없음' },
  { id: '1개월', displayName: '1개월' },
  { id: '2개월', displayName: '2개월' },
  { id: '3개월', displayName: '3개월' },
  { id: '6개월', displayName: '6개월' },
];

export default function SummaryPeriodCardAction() {
  const { step2, setStep2 } = useWizardStore(
    useShallow((state) => ({
      step2: state.step2,
      setStep2: state.setStep2,
    })),
  );

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    wizStartDate: step2.wizStartDate,
    wizEndDate: step2.wizEndDate,
    wizProbation: step2.wizProbation,
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      setStep2(draft);
      setIsEditing(false);
    } else {
      setDraft({
        wizStartDate: step2.wizStartDate,
        wizEndDate: step2.wizEndDate,
        wizProbation: step2.wizProbation,
      });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setDraft({
      wizStartDate: step2.wizStartDate,
      wizEndDate: step2.wizEndDate,
      wizProbation: step2.wizProbation,
    });
    setIsEditing(false);
  };

  const selectedProbation =
    PROBATION_OPTIONS.find((opt) => opt.id === draft.wizProbation) || {
      id: draft.wizProbation || '없음',
      displayName: draft.wizProbation || '없음',
    };

  return (
    <SummaryCardComponent
      title="계약 기간 및 수습 기간"
      isEditing={isEditing}
      onToggleEdit={handleToggleEdit}
      onCancelEdit={handleCancelEdit}
    >
      {isEditing ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <label className="text-text-side text-xs font-bold">계약 시작일</label>
            <CustomDate
              selectDate={draft.wizStartDate}
              onChangeAction={(date) =>
                setDraft((prev) => ({ ...prev, wizStartDate: date }))
              }
              placeholder="계약 시작일"
              className="w-full"
              buttonClassName="h-10 !rounded-xl !border-custom-slate-border !px-3 bg-white focus:border-custom-indigo w-full text-xs font-bold text-slate-800 outline-none transition-all"
              hasReset={false}
            />
          </div>
          <div className="space-y-1">
            <label className="text-text-side text-xs font-bold">계약 종료일</label>
            <CustomDate
              selectDate={draft.wizEndDate}
              onChangeAction={(date) =>
                setDraft((prev) => ({ ...prev, wizEndDate: date }))
              }
              placeholder="계약 종료일"
              className="w-full"
              buttonClassName="h-10 !rounded-xl !border-custom-slate-border !px-3 bg-white focus:border-custom-indigo w-full text-xs font-bold text-slate-800 outline-none transition-all"
              hasReset={false}
            />
          </div>
          <div className="space-y-1">
            <label className="text-text-side text-xs font-bold">수습 기간</label>
            <Select
              data={PROBATION_OPTIONS}
              selectData={selectedProbation}
              onChangeAction={(item) =>
                setDraft((prev) => ({ ...prev, wizProbation: String(item.id) }))
              }
              buttonClassName="h-10 rounded-xl"
            />
          </div>
        </div>
      ) : (
        <SummaryKeyValueListComponent
          columns={2}
          items={[
            {
              label: '계약 기간',
              value:
                step2.wizStartDate && step2.wizEndDate
                  ? `${step2.wizStartDate} ~ ${step2.wizEndDate}`
                  : null,
            },
            { label: '수습 기간', value: step2.wizProbation || '미적용' },
          ]}
        />
      )}
    </SummaryCardComponent>
  );
}
