'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import Select, { SelectDataTypes } from '@/app/_component/select/Select';
import { formatCurrency, parseCurrencyNumber } from '@/app/util/formatCurrency.util';
import SummaryCardComponent from '../_component/SummaryCard.component';
import SummaryKeyValueListComponent from '../_component/SummaryKeyValueList.component';

const PERIOD_OPTIONS: SelectDataTypes[] = [
  { id: '3개월', displayName: '3개월' },
  { id: '6개월', displayName: '6개월' },
  { id: '12개월', displayName: '12개월' },
];

const RANGE_OPTIONS: SelectDataTypes[] = [
  { id: '반경 1km', displayName: '반경 1km' },
  { id: '반경 3km', displayName: '반경 3km' },
  { id: '반경 5km', displayName: '반경 5km' },
];

export default function SummaryAllowanceCardAction() {
  const { step2, setStep2 } = useWizardStore(
    useShallow((state) => ({
      step2: state.step2,
      setStep2: state.setStep2,
    })),
  );

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    wizHasExtraAllowance: step2.wizHasExtraAllowance,
    wizPositionAllowance: step2.wizPositionAllowance,
    wizOvertimeAllowance: step2.wizOvertimeAllowance,
    wizOtherAllowance: step2.wizOtherAllowance,
    wizOtherAllowanceName: step2.wizOtherAllowanceName,
    wizHasNonCompete: step2.wizHasNonCompete,
    wizNonCompetePeriod: step2.wizNonCompetePeriod || '6개월',
    wizNonCompeteRange: step2.wizNonCompeteRange || '반경 3km',
    wizNonCompeteAmount: step2.wizNonCompeteAmount,
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      setStep2(draft);
      setIsEditing(false);
    } else {
      setDraft({
        wizHasExtraAllowance: step2.wizHasExtraAllowance,
        wizPositionAllowance: step2.wizPositionAllowance,
        wizOvertimeAllowance: step2.wizOvertimeAllowance,
        wizOtherAllowance: step2.wizOtherAllowance,
        wizOtherAllowanceName: step2.wizOtherAllowanceName,
        wizHasNonCompete: step2.wizHasNonCompete,
        wizNonCompetePeriod: step2.wizNonCompetePeriod || '6개월',
        wizNonCompeteRange: step2.wizNonCompeteRange || '반경 3km',
        wizNonCompeteAmount: step2.wizNonCompeteAmount,
      });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setDraft({
      wizHasExtraAllowance: step2.wizHasExtraAllowance,
      wizPositionAllowance: step2.wizPositionAllowance,
      wizOvertimeAllowance: step2.wizOvertimeAllowance,
      wizOtherAllowance: step2.wizOtherAllowance,
      wizOtherAllowanceName: step2.wizOtherAllowanceName,
      wizHasNonCompete: step2.wizHasNonCompete,
      wizNonCompetePeriod: step2.wizNonCompetePeriod || '6개월',
      wizNonCompeteRange: step2.wizNonCompeteRange || '반경 3km',
      wizNonCompeteAmount: step2.wizNonCompeteAmount,
    });
    setIsEditing(false);
  };

  const extraItems: string[] = [];
  if (step2.wizHasExtraAllowance) {
    if ((step2.wizPositionAllowance || 0) > 0) {
      extraItems.push(`직책: ${formatCurrency(step2.wizPositionAllowance)}원`);
    }
    if ((step2.wizOvertimeAllowance || 0) > 0) {
      extraItems.push(`연장: ${formatCurrency(step2.wizOvertimeAllowance)}원`);
    }
    if ((step2.wizOtherAllowance || 0) > 0) {
      extraItems.push(
        `${step2.wizOtherAllowanceName || '기타'}: ${formatCurrency(step2.wizOtherAllowance)}원`,
      );
    }
  }
  const extraAllowanceValue = extraItems.length > 0 ? extraItems.join(' / ') : '미적용';

  const nonCompeteValue = step2.wizHasNonCompete
    ? `${step2.wizNonCompetePeriod || ''} / ${step2.wizNonCompeteRange || ''} (${formatCurrency(step2.wizNonCompeteAmount) || 0}원)`
    : '미적용';

  const selectedPeriod =
    PERIOD_OPTIONS.find((opt) => opt.id === draft.wizNonCompetePeriod) || {
      id: draft.wizNonCompetePeriod || '6개월',
      displayName: draft.wizNonCompetePeriod || '6개월',
    };

  const selectedRange =
    RANGE_OPTIONS.find((opt) => opt.id === draft.wizNonCompeteRange) || {
      id: draft.wizNonCompeteRange || '반경 3km',
      displayName: draft.wizNonCompeteRange || '반경 3km',
    };

  return (
    <SummaryCardComponent
      title="수당 및 경업금지"
      isEditing={isEditing}
      onToggleEdit={handleToggleEdit}
      onCancelEdit={handleCancelEdit}
    >
      {isEditing ? (
        <div className="space-y-4">
          {/* 추가 수당 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-text-side text-xs font-bold">추가 수당</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      wizHasExtraAllowance: false,
                      wizPositionAllowance: 0,
                      wizOvertimeAllowance: 0,
                      wizOtherAllowance: 0,
                      wizOtherAllowanceName: '',
                    }))
                  }
                  className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                    !draft.wizHasExtraAllowance
                      ? 'border-custom-indigo bg-custom-indigo/10 text-custom-indigo'
                      : 'border-custom-slate-border dark:border-slate-800 text-text-side dark:text-slate-400 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  미적용
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      wizHasExtraAllowance: true,
                    }))
                  }
                  className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                    draft.wizHasExtraAllowance
                      ? 'border-custom-indigo bg-custom-indigo/10 text-custom-indigo'
                      : 'border-custom-slate-border dark:border-slate-800 text-text-side dark:text-slate-400 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  적용
                </button>
              </div>
            </div>

            {draft.wizHasExtraAllowance && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-text-side text-xs font-bold">직책 수당</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatCurrency(draft.wizPositionAllowance)}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          wizPositionAllowance: parseCurrencyNumber(e.target.value),
                        }))
                      }
                      className="p-2.5 pr-8 text-xs font-semibold"
                      placeholder="0"
                    />
                    <span className="absolute top-2.5 right-3 text-xs font-bold text-slate-400">원</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-text-side text-xs font-bold">연장 근로 수당</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatCurrency(draft.wizOvertimeAllowance)}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          wizOvertimeAllowance: parseCurrencyNumber(e.target.value),
                        }))
                      }
                      className="p-2.5 pr-8 text-xs font-semibold"
                      placeholder="0"
                    />
                    <span className="absolute top-2.5 right-3 text-xs font-bold text-slate-400">원</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-text-side text-xs font-bold">기타 수당</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={draft.wizOtherAllowanceName || ''}
                      onChange={(e) =>
                        setDraft((prev) => ({ ...prev, wizOtherAllowanceName: e.target.value }))
                      }
                      className="w-1/2 p-2.5 text-xs font-semibold"
                      placeholder="수당명"
                    />
                    <div className="relative w-1/2">
                      <input
                        type="text"
                        value={formatCurrency(draft.wizOtherAllowance)}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            wizOtherAllowance: parseCurrencyNumber(e.target.value),
                          }))
                        }
                        className="p-2.5 pr-8 text-xs font-semibold"
                        placeholder="0"
                      />
                      <span className="absolute top-2.5 right-3 text-xs font-bold text-slate-400">원</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 경업금지 약정 */}
          <div className="border-t border-slate-100 pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-text-side text-xs font-bold">경업금지 약정</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      wizHasNonCompete: false,
                    }))
                  }
                  className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                    !draft.wizHasNonCompete
                      ? 'border-custom-indigo bg-custom-indigo/10 text-custom-indigo'
                      : 'border-custom-slate-border dark:border-slate-800 text-text-side dark:text-slate-400 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  미적용
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      wizHasNonCompete: true,
                    }))
                  }
                  className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                    draft.wizHasNonCompete
                      ? 'border-custom-indigo bg-custom-indigo/10 text-custom-indigo'
                      : 'border-custom-slate-border dark:border-slate-800 text-text-side dark:text-slate-400 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  적용
                </button>
              </div>
            </div>

            {draft.wizHasNonCompete && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-text-side text-xs font-bold">경업금지 기간</label>
                  <Select
                    data={PERIOD_OPTIONS}
                    selectData={selectedPeriod}
                    onChangeAction={(item) =>
                      setDraft((prev) => ({ ...prev, wizNonCompetePeriod: String(item.id) }))
                    }
                    buttonClassName="h-[40px] rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-text-side text-xs font-bold">경업금지 범위</label>
                  <Select
                    data={RANGE_OPTIONS}
                    selectData={selectedRange}
                    onChangeAction={(item) =>
                      setDraft((prev) => ({ ...prev, wizNonCompeteRange: String(item.id) }))
                    }
                    buttonClassName="h-[40px] rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-text-side text-xs font-bold">경업금지 보상금 (월)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatCurrency(draft.wizNonCompeteAmount)}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          wizNonCompeteAmount: parseCurrencyNumber(e.target.value),
                        }))
                      }
                      className="p-2.5 pr-8 text-xs font-semibold"
                      placeholder="0"
                    />
                    <span className="absolute top-2.5 right-3 text-xs font-bold text-slate-400">원</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <SummaryKeyValueListComponent
          items={[
            { label: '추가 수당', value: extraAllowanceValue },
            { label: '경업금지 약정', value: nonCompeteValue },
          ]}
        />
      )}
    </SummaryCardComponent>
  );
}
