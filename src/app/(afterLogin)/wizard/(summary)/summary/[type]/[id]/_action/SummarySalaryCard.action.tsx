'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore, SalaryType } from '@/app/(afterLogin)/wizard/store';
import Select, { SelectDataTypes } from '@/app/_component/select/Select';
import { formatCurrency, parseCurrencyNumber } from '@/app/util/formatCurrency.util';
import SummaryCardComponent from '../_component/SummaryCard.component';
import SummaryKeyValueListComponent from '../_component/SummaryKeyValueList.component';

const SALARY_TYPE_OPTIONS: SelectDataTypes[] = [
  { id: 'monthly', displayName: '월급제' },
  { id: 'commission', displayName: '비율제 (수수료)' },
  { id: 'hourly', displayName: '시급제' },
];

const PAY_DAY_OPTIONS: SelectDataTypes[] = Array.from({ length: 30 }, (_, i) => ({
  id: `${i + 1}일`,
  displayName: `${i + 1}일`,
})).concat([{ id: '말일', displayName: '말일' }]);

export default function SummarySalaryCardAction() {
  const { step2, setStep2 } = useWizardStore(
    useShallow((state) => ({
      step2: state.step2,
      setStep2: state.setStep2,
    })),
  );

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    wizSalaryType: step2.wizSalaryType,
    wizSalaryAmount: step2.wizSalaryAmount,
    wizCommissionRate: step2.wizCommissionRate,
    wizMinGuaranteeAmount: step2.wizMinGuaranteeAmount,
    wizHourlyRate: step2.wizHourlyRate,
    wizPayDay: step2.wizPayDay,
    wizNonTaxFood: step2.wizNonTaxFood,
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      setStep2({
        ...draft,
        wizHasTaxFree: (draft.wizNonTaxFood || 0) > 0,
      });
      setIsEditing(false);
    } else {
      setDraft({
        wizSalaryType: step2.wizSalaryType,
        wizSalaryAmount: step2.wizSalaryAmount,
        wizCommissionRate: step2.wizCommissionRate,
        wizMinGuaranteeAmount: step2.wizMinGuaranteeAmount,
        wizHourlyRate: step2.wizHourlyRate,
        wizPayDay: step2.wizPayDay,
        wizNonTaxFood: step2.wizNonTaxFood,
      });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setDraft({
      wizSalaryType: step2.wizSalaryType,
      wizSalaryAmount: step2.wizSalaryAmount,
      wizCommissionRate: step2.wizCommissionRate,
      wizMinGuaranteeAmount: step2.wizMinGuaranteeAmount,
      wizHourlyRate: step2.wizHourlyRate,
      wizPayDay: step2.wizPayDay,
      wizNonTaxFood: step2.wizNonTaxFood,
    });
    setIsEditing(false);
  };

  const selectedSalaryType =
    SALARY_TYPE_OPTIONS.find((opt) => opt.id === draft.wizSalaryType) || SALARY_TYPE_OPTIONS[0];

  const selectedPayDay =
    PAY_DAY_OPTIONS.find((opt) => opt.id === draft.wizPayDay) || {
      id: draft.wizPayDay || '10일',
      displayName: draft.wizPayDay || '10일',
    };

  const salaryLabel =
    step2.wizSalaryType === 'hourly'
      ? '약정 시급'
      : step2.wizSalaryType === 'commission'
        ? '비율제 수수료율'
        : '월 총 지급액';

  const salaryValue =
    step2.wizSalaryType === 'monthly'
      ? `월 ${formatCurrency(step2.wizSalaryAmount) || 0}원`
      : step2.wizSalaryType === 'commission'
        ? `${step2.wizCommissionRate || 0}% (최소보장 ${formatCurrency(step2.wizMinGuaranteeAmount) || 0}원)`
        : `시간당 ${formatCurrency(step2.wizHourlyRate) || 0}원`;

  const nonTaxValue =
    (step2.wizNonTaxFood || 0) > 0
      ? `식대: ${formatCurrency(step2.wizNonTaxFood)}원`
      : '미적용';

  return (
    <SummaryCardComponent
      title="급여 조건"
      isEditing={isEditing}
      onToggleEdit={handleToggleEdit}
      onCancelEdit={handleCancelEdit}
    >
      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <label className="text-text-side text-xs font-bold">급여 형태</label>
              <Select
                data={SALARY_TYPE_OPTIONS}
                selectData={selectedSalaryType}
                onChangeAction={(item) =>
                  setDraft((prev) => ({ ...prev, wizSalaryType: item.id as SalaryType }))
                }
                buttonClassName="h-[40px] rounded-xl"
              />
            </div>

            {draft.wizSalaryType === 'monthly' && (
              <div className="space-y-1">
                <label className="text-text-side text-xs font-bold">기본급 (월)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formatCurrency(draft.wizSalaryAmount)}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        wizSalaryAmount: parseCurrencyNumber(e.target.value),
                      }))
                    }
                    className="p-2.5 pr-8 text-xs font-semibold"
                  />
                  <span className="absolute top-2.5 right-3 text-xs font-bold text-slate-400">원</span>
                </div>
              </div>
            )}

            {draft.wizSalaryType === 'commission' && (
              <>
                <div className="space-y-1">
                  <label className="text-text-side text-xs font-bold">비율 (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={draft.wizCommissionRate || 0}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          wizCommissionRate: Number(e.target.value) || 0,
                        }))
                      }
                      className="p-2.5 pr-8 text-xs font-semibold"
                    />
                    <span className="absolute top-2.5 right-3 text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-text-side text-xs font-bold">최저 보장액</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatCurrency(draft.wizMinGuaranteeAmount)}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          wizMinGuaranteeAmount: parseCurrencyNumber(e.target.value),
                        }))
                      }
                      className="p-2.5 pr-8 text-xs font-semibold"
                    />
                    <span className="absolute top-2.5 right-3 text-xs font-bold text-slate-400">원</span>
                  </div>
                </div>
              </>
            )}

            {draft.wizSalaryType === 'hourly' && (
              <div className="space-y-1">
                <label className="text-text-side text-xs font-bold">시급</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formatCurrency(draft.wizHourlyRate)}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        wizHourlyRate: parseCurrencyNumber(e.target.value),
                      }))
                    }
                    className="p-2.5 pr-8 text-xs font-semibold"
                  />
                  <span className="absolute top-2.5 right-3 text-xs font-bold text-slate-400">원</span>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-text-side text-xs font-bold">급여 지급일</label>
              <Select
                data={PAY_DAY_OPTIONS}
                selectData={selectedPayDay}
                onChangeAction={(item) =>
                  setDraft((prev) => ({ ...prev, wizPayDay: String(item.id) }))
                }
                buttonClassName="h-[40px] rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">식대 비과세</span>
                <p className="text-[11px] text-slate-400 dark:text-slate-400">월 최대 20만원</p>
              </div>
              <input
                type="text"
                value={formatCurrency(draft.wizNonTaxFood)}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    wizNonTaxFood: parseCurrencyNumber(e.target.value),
                  }))
                }
                className="w-28 p-2 text-xs font-semibold"
              />
            </div>
          </div>
        </div>
      ) : (
        <SummaryKeyValueListComponent
          items={[
            { label: salaryLabel, value: salaryValue },
            { label: '급여 지급일', value: `매월 ${step2.wizPayDay || '-'}` },
            { label: '비과세 수당', value: nonTaxValue },
          ]}
        />
      )}
    </SummaryCardComponent>
  );
}
