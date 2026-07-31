'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore, SalaryType } from '@/app/(afterLogin)/wizard/store';

export default function ContractSummaryCardsAction() {
  const { step1, setStep1, step2, setStep2, step3, setStep3 } = useWizardStore(
    useShallow((state) => ({
      step1: state.step1,
      setStep1: state.setStep1,
      step2: state.step2,
      setStep2: state.setStep2,
      step3: state.step3,
      setStep3: state.setStep3,
    })),
  );

  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({
    info: false,
    period: false,
    schedule: false,
    salary: false,
    allowances: false,
    terms: false,
  });

  const toggleEdit = (section: string) => {
    setEditingSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const activeDays = Object.entries(step2.wizDaysConfig || {}).filter(
    ([_, val]) => val.enabled,
  );

  return (
    <div className="space-y-5 pb-12">
      {/* 1. 강사 기본 정보 */}
      <div className="border-custom-slate-border rounded-2xl border bg-white transition-all overflow-hidden">
        <div className="border-custom-slate-border-side bg-custom-slate-bg flex items-center justify-between border-b px-5 py-4">
          <span className="text-text-title text-sm font-bold">강사 기본 정보</span>
          <button
            type="button"
            onClick={() => toggleEdit('info')}
            className="border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex cursor-pointer items-center justify-center rounded-xl border bg-white px-3.5 py-1.5 text-xs font-bold transition-all"
          >
            {editingSections.info ? '완료' : '수정'}
          </button>
        </div>

        <div className="p-5">
          {editingSections.info ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-side">강사 성명</label>
                <input
                  type="text"
                  value={step1.instructorName || ''}
                  onChange={(e) => setStep1({ instructorName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="강사 성명 입력"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-side">연락처</label>
                <input
                  type="text"
                  value={step1.instructorPhone || ''}
                  onChange={(e) => setStep1({ instructorPhone: e.target.value.replace(/-/g, '') })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="01012345678"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-side">담당 과목</label>
                <input
                  type="text"
                  value={step1.instructorSubject || ''}
                  onChange={(e) => setStep1({ instructorSubject: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="담당 과목 (예: 수학)"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-side">생년월일</label>
                <input
                  type="text"
                  value={step1.instructorBirth || ''}
                  onChange={(e) => setStep1({ instructorBirth: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-text-side">주소</label>
                <input
                  type="text"
                  value={step1.instructorAddress || ''}
                  onChange={(e) => setStep1({ instructorAddress: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="주소 입력"
                />
              </div>
            </div>
          ) : (
            <div className="border-custom-slate-border divide-custom-slate-border/60 divide-y overflow-hidden rounded-xl border bg-white">
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">강사 성명</span>
                <span className="truncate text-xs font-bold text-text-main">{step1.instructorName || '-'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">연락처</span>
                <span className="truncate text-xs font-bold text-text-main">{step1.instructorPhone || '-'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">담당 과목</span>
                <span className="truncate text-xs font-bold text-text-main">{step1.instructorSubject || '-'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">생년월일</span>
                <span className="truncate text-xs font-bold text-text-main">{step1.instructorBirth || '-'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">주소</span>
                <span className="truncate text-xs font-bold text-text-main">{step1.instructorAddress || '-'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. 계약 기간 및 시용 기간 */}
      <div className="border-custom-slate-border rounded-2xl border bg-white transition-all overflow-hidden">
        <div className="border-custom-slate-border-side bg-custom-slate-bg flex items-center justify-between border-b px-5 py-4">
          <span className="text-text-title text-sm font-bold">계약 기간 및 시용기간</span>
          <button
            type="button"
            onClick={() => toggleEdit('period')}
            className="border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex cursor-pointer items-center justify-center rounded-xl border bg-white px-3.5 py-1.5 text-xs font-bold transition-all"
          >
            {editingSections.period ? '완료' : '수정'}
          </button>
        </div>

        <div className="p-5">
          {editingSections.period ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-side">계약 시작일</label>
                <input
                  type="date"
                  value={step2.wizStartDate || ''}
                  onChange={(e) => setStep2({ wizStartDate: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-side">계약 종료일</label>
                <input
                  type="date"
                  value={step2.wizEndDate || ''}
                  onChange={(e) => setStep2({ wizEndDate: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-side">시용 기간</label>
                <input
                  type="text"
                  value={step2.wizProbation || ''}
                  onChange={(e) => setStep2({ wizProbation: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="예: 3개월"
                />
              </div>
            </div>
          ) : (
            <div className="border-custom-slate-border divide-custom-slate-border/60 divide-y overflow-hidden rounded-xl border bg-white">
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">계약 기간</span>
                <span className="truncate text-xs font-bold text-text-main">
                  {step2.wizStartDate && step2.wizEndDate
                    ? `${step2.wizStartDate} ~ ${step2.wizEndDate}`
                    : '-'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">시용 기간</span>
                <span className="truncate text-xs font-bold text-text-main">{step2.wizProbation || '미적용'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. 근무 요일 및 시간 */}
      <div className="border-custom-slate-border rounded-2xl border bg-white transition-all overflow-hidden">
        <div className="border-custom-slate-border-side bg-custom-slate-bg flex items-center justify-between border-b px-5 py-4">
          <span className="text-text-title text-sm font-bold">근무 요일 및 시간</span>
          <button
            type="button"
            onClick={() => toggleEdit('schedule')}
            className="border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex cursor-pointer items-center justify-center rounded-xl border bg-white px-3.5 py-1.5 text-xs font-bold transition-all"
          >
            {editingSections.schedule ? '완료' : '수정'}
          </button>
        </div>

        <div className="p-5">
          {editingSections.schedule ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {Object.entries(step2.wizDaysConfig || {}).map(([dayKey, dayVal]) => (
                <div
                  key={dayKey}
                  className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                    dayVal.enabled
                      ? 'border-indigo-200 bg-indigo-50/30'
                      : 'border-slate-100 bg-slate-50/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={dayVal.enabled}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setStep2((prev) => ({
                          wizDaysConfig: {
                            ...prev.wizDaysConfig,
                            [dayKey]: { ...dayVal, enabled: isChecked },
                          },
                        }));
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-extrabold text-slate-800">{dayKey}</span>
                  </div>
                  {dayVal.enabled ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <input
                        type="time"
                        value={dayVal.startTime}
                        onChange={(e) => {
                          const newTime = e.target.value;
                          setStep2((prev) => ({
                            wizDaysConfig: {
                              ...prev.wizDaysConfig,
                              [dayKey]: { ...dayVal, startTime: newTime },
                            },
                          }));
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
                      />
                      <span>~</span>
                      <input
                        type="time"
                        value={dayVal.endTime}
                        onChange={(e) => {
                          const newTime = e.target.value;
                          setStep2((prev) => ({
                            wizDaysConfig: {
                              ...prev.wizDaysConfig,
                              [dayKey]: { ...dayVal, endTime: newTime },
                            },
                          }));
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
                      />
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">휴무</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="border-custom-slate-border divide-custom-slate-border/60 divide-y overflow-hidden rounded-xl border bg-white">
              {activeDays.length > 0 ? (
                activeDays.map(([dayKey, dayVal]) => (
                  <div key={dayKey} className="flex items-center justify-between p-3.5">
                    <span className="w-24 shrink-0 text-xs font-semibold text-text-side">{dayKey}</span>
                    <span className="truncate text-xs font-bold text-text-main">
                      {dayVal.startTime} ~ {dayVal.endTime} (휴게 {dayVal.breakTime})
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3.5 text-xs font-medium text-text-side">근무 요일이 설정되지 않았습니다.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. 급여 조건 */}
      <div className="border-custom-slate-border rounded-2xl border bg-white transition-all overflow-hidden">
        <div className="border-custom-slate-border-side bg-custom-slate-bg flex items-center justify-between border-b px-5 py-4">
          <span className="text-text-title text-sm font-bold">급여 조건</span>
          <button
            type="button"
            onClick={() => toggleEdit('salary')}
            className="border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex cursor-pointer items-center justify-center rounded-xl border bg-white px-3.5 py-1.5 text-xs font-bold transition-all"
          >
            {editingSections.salary ? '완료' : '수정'}
          </button>
        </div>

        <div className="p-5">
          {editingSections.salary ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-side">급여 형태</label>
                  <select
                    value={step2.wizSalaryType}
                    onChange={(e) => setStep2({ wizSalaryType: e.target.value as SalaryType })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="monthly">월급제</option>
                    <option value="commission">비율제 (수수료)</option>
                    <option value="hourly">시급제</option>
                  </select>
                </div>

                {step2.wizSalaryType === 'monthly' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-side">기본급 (월)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={step2.wizSalaryAmount || 0}
                        onChange={(e) => setStep2({ wizSalaryAmount: Number(e.target.value) || 0 })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 pr-8 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                      <span className="absolute top-2 right-3 text-xs font-bold text-slate-400">원</span>
                    </div>
                  </div>
                )}

                {step2.wizSalaryType === 'commission' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-text-side">비율 (%)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={step2.wizCommissionRate || 0}
                          onChange={(e) =>
                            setStep2({ wizCommissionRate: Number(e.target.value) || 0 })
                          }
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2 pr-8 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <span className="absolute top-2 right-3 text-xs font-bold text-slate-400">%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-text-side">최저 보장액</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={step2.wizMinGuaranteeAmount || 0}
                          onChange={(e) =>
                            setStep2({ wizMinGuaranteeAmount: Number(e.target.value) || 0 })
                          }
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2 pr-8 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <span className="absolute top-2 right-3 text-xs font-bold text-slate-400">원</span>
                      </div>
                    </div>
                  </>
                )}

                {step2.wizSalaryType === 'hourly' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-side">시급</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={step2.wizHourlyRate || 0}
                        onChange={(e) => setStep2({ wizHourlyRate: Number(e.target.value) || 0 })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 pr-8 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                      <span className="absolute top-2 right-3 text-xs font-bold text-slate-400">원</span>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-side">급여 지급일</label>
                  <input
                    type="text"
                    value={step2.wizPayDay || ''}
                    onChange={(e) => setStep2({ wizPayDay: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="예: 10일"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-800">식대 비과세</span>
                    <p className="text-[11px] text-slate-400">월 최대 20만원</p>
                  </div>
                  <input
                    type="number"
                    value={step2.wizNonTaxFood || 0}
                    onChange={(e) =>
                      setStep2({
                        wizNonTaxFood: Number(e.target.value) || 0,
                        wizHasTaxFree: (Number(e.target.value) || 0) > 0,
                      })
                    }
                    className="w-28 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-800">자가운전 보조금</span>
                    <p className="text-[11px] text-slate-400">월 최대 20만원</p>
                  </div>
                  <input
                    type="number"
                    value={step2.wizNonTaxCar || 0}
                    onChange={(e) =>
                      setStep2({
                        wizNonTaxCar: Number(e.target.value) || 0,
                        wizHasCarAllowance: (Number(e.target.value) || 0) > 0,
                      })
                    }
                    className="w-28 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="border-custom-slate-border divide-custom-slate-border/60 divide-y overflow-hidden rounded-xl border bg-white">
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">
                  {step2.wizSalaryType === 'hourly'
                    ? '약정 시급'
                    : step2.wizSalaryType === 'commission'
                      ? '비율제 수수료율'
                      : '기본 지급액'}
                </span>
                <span className="truncate text-xs font-bold text-text-main">
                  {step2.wizSalaryType === 'monthly' && `월 ${step2.wizSalaryAmount?.toLocaleString() || 0}원`}
                  {step2.wizSalaryType === 'commission' &&
                    `${step2.wizCommissionRate || 0}% (최소보장 ${step2.wizMinGuaranteeAmount?.toLocaleString() || 0}원)`}
                  {step2.wizSalaryType === 'hourly' &&
                    `시간당 ${step2.wizHourlyRate?.toLocaleString() || 0}원`}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">급여 지급일</span>
                <span className="truncate text-xs font-bold text-text-main">매월 {step2.wizPayDay || '-'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">비과세 수당</span>
                <span className="truncate text-xs font-bold text-text-main">
                  {step2.wizNonTaxFood || step2.wizNonTaxCar
                    ? `식대: ${step2.wizNonTaxFood?.toLocaleString() || 0}원${step2.wizNonTaxCar ? ` / 자가운전: ${step2.wizNonTaxCar.toLocaleString()}원` : ''}`
                    : '미적용'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. 수당 및 경업금지 */}
      <div className="border-custom-slate-border rounded-2xl border bg-white transition-all overflow-hidden">
        <div className="border-custom-slate-border-side bg-custom-slate-bg flex items-center justify-between border-b px-5 py-4">
          <span className="text-text-title text-sm font-bold">수당 및 경업금지</span>
          <button
            type="button"
            onClick={() => toggleEdit('allowances')}
            className="border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex cursor-pointer items-center justify-center rounded-xl border bg-white px-3.5 py-1.5 text-xs font-bold transition-all"
          >
            {editingSections.allowances ? '완료' : '수정'}
          </button>
        </div>

        <div className="p-5">
          {editingSections.allowances ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-side">경업금지 여부 및 기간</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep2({ wizHasNonCompete: !step2.wizHasNonCompete })}
                    className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                      step2.wizHasNonCompete
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-500'
                    }`}
                  >
                    {step2.wizHasNonCompete ? '적용' : '미적용'}
                  </button>
                  {step2.wizHasNonCompete && (
                    <input
                      type="text"
                      value={step2.wizNonCompetePeriod || ''}
                      onChange={(e) => setStep2({ wizNonCompetePeriod: e.target.value })}
                      className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none"
                      placeholder="예: 6개월"
                    />
                  )}
                </div>
              </div>
              {step2.wizHasNonCompete && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-side">경업금지 범위</label>
                    <input
                      type="text"
                      value={step2.wizNonCompeteRange || ''}
                      onChange={(e) => setStep2({ wizNonCompeteRange: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none"
                      placeholder="예: 반경 3km"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-text-side">경업금지 보상금 (월)</label>
                    <input
                      type="number"
                      value={step2.wizNonCompeteAmount || 0}
                      onChange={(e) =>
                        setStep2({ wizNonCompeteAmount: Number(e.target.value) || 0 })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none"
                      placeholder="보상금 입력"
                    />
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="border-custom-slate-border divide-custom-slate-border/60 divide-y overflow-hidden rounded-xl border bg-white">
              <div className="flex items-center justify-between p-3.5">
                <span className="w-24 shrink-0 text-xs font-semibold text-text-side">경업금지 약정</span>
                <span className="truncate text-xs font-bold text-text-main">
                  {step2.wizHasNonCompete
                    ? `${step2.wizNonCompetePeriod || ''} / ${step2.wizNonCompeteRange || ''} (${step2.wizNonCompeteAmount?.toLocaleString() || 0}원)`
                    : '약정 없음'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6. 특약 사항 */}
      <div className="border-custom-slate-border rounded-2xl border bg-white transition-all overflow-hidden">
        <div className="border-custom-slate-border-side bg-custom-slate-bg flex items-center justify-between border-b px-5 py-4">
          <span className="text-text-title text-sm font-bold">특약 사항 (선택)</span>
          <button
            type="button"
            onClick={() => toggleEdit('terms')}
            className="border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex cursor-pointer items-center justify-center rounded-xl border bg-white px-3.5 py-1.5 text-xs font-bold transition-all"
          >
            {editingSections.terms ? '완료' : '수정'}
          </button>
        </div>

        <div className="p-5">
          {editingSections.terms ? (
            <div>
              <textarea
                rows={4}
                value={step3.customTerms || ''}
                onChange={(e) => setStep3({ customTerms: e.target.value })}
                className="w-full resize-none rounded-xl border border-slate-200 p-3.5 text-xs font-medium text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="추가로 적용할 특약 사항을 작성해주세요."
              />
            </div>
          ) : (
            <div className="border-custom-slate-border overflow-hidden rounded-xl border bg-white p-3.5">
              <p className="whitespace-pre-wrap text-xs font-bold text-text-main">
                {step3.customTerms?.trim() ? step3.customTerms : '등록된 특약 사항이 없습니다.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
