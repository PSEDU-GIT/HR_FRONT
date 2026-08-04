'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PrivacyTermsAreaProps {
  agreedPrivacy: boolean;
  agreedIdentification: boolean;
  agreedElectronic: boolean;
  setAgreedPrivacy: (val: boolean) => void;
  setAgreedIdentification: (val: boolean) => void;
  setAgreedElectronic: (val: boolean) => void;
  toggleAllAgreements: (val: boolean) => void;
}

export default function PrivacyTermsArea({
  agreedPrivacy,
  agreedIdentification,
  agreedElectronic,
  setAgreedPrivacy,
  setAgreedIdentification,
  setAgreedElectronic,
  toggleAllAgreements,
}: PrivacyTermsAreaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isAllAgreed = agreedPrivacy && agreedIdentification && agreedElectronic;

  const toggleDetail = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      <div className="border-custom-slate-border flex items-center justify-between border-b pb-2 dark:border-slate-800">
        <h2 className="text-text-title text-xs font-bold dark:text-slate-100">
          약관 동의
        </h2>
        <label className="flex cursor-pointer items-center space-x-2">
          <input
            type="checkbox"
            checked={isAllAgreed}
            onChange={(e) => toggleAllAgreements(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-custom-indigo focus:ring-custom-indigo"
          />
          <span className="text-text-title text-xs font-bold dark:text-slate-100">
            전체 동의
          </span>
        </label>
      </div>

      <div className="divide-custom-slate-border divide-y dark:divide-slate-900">
        {/* Item 1 */}
        <div className="py-2">
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center space-x-2">
              <input
                type="checkbox"
                checked={agreedPrivacy}
                onChange={(e) => setAgreedPrivacy(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-custom-indigo focus:ring-custom-indigo"
              />
              <span className="text-text-main text-xs font-medium dark:text-slate-200">
                개인정보 수집 및 이용 동의 (필수)
              </span>
            </label>
            <button
              type="button"
              onClick={() => toggleDetail(1)}
              className="text-text-side hover:text-text-main p-1 dark:hover:text-slate-200"
            >
              {openIndex === 1 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          {openIndex === 1 && (
            <div className="bg-custom-slate-bg text-text-sub mt-2 rounded p-2.5 text-[11px] font-normal leading-relaxed dark:bg-slate-900 dark:text-slate-400">
              [목적] 근로계약 체결, 본인 확인, 급여 정산<br />
              [항목] 성명, 생년월일, 연락처, 주소, 계좌번호<br />
              [보유] 관계 법령에 따른 보존 기간 보관
            </div>
          )}
        </div>

        {/* Item 2 */}
        <div className="py-2">
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center space-x-2">
              <input
                type="checkbox"
                checked={agreedIdentification}
                onChange={(e) => setAgreedIdentification(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-custom-indigo focus:ring-custom-indigo"
              />
              <span className="text-text-main text-xs font-medium dark:text-slate-200">
                고유식별정보 처리 동의 (필수)
              </span>
            </label>
            <button
              type="button"
              onClick={() => toggleDetail(2)}
              className="text-text-side hover:text-text-main p-1 dark:hover:text-slate-200"
            >
              {openIndex === 2 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          {openIndex === 2 && (
            <div className="bg-custom-slate-bg text-text-sub mt-2 rounded p-2.5 text-[11px] font-normal leading-relaxed dark:bg-slate-900 dark:text-slate-400">
              원천징수 신고 및 세무 처리를 위한 고유식별정보를 관련 법령에 따라 수집·이용합니다.
            </div>
          )}
        </div>

        {/* Item 3 */}
        <div className="py-2">
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center space-x-2">
              <input
                type="checkbox"
                checked={agreedElectronic}
                onChange={(e) => setAgreedElectronic(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-custom-indigo focus:ring-custom-indigo"
              />
              <span className="text-text-main text-xs font-medium dark:text-slate-200">
                전자서명 법적 효력 동의 (필수)
              </span>
            </label>
            <button
              type="button"
              onClick={() => toggleDetail(3)}
              className="text-text-side hover:text-text-main p-1 dark:hover:text-slate-200"
            >
              {openIndex === 3 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          {openIndex === 3 && (
            <div className="bg-custom-slate-bg text-text-sub mt-2 rounded p-2.5 text-[11px] font-normal leading-relaxed dark:bg-slate-900 dark:text-slate-400">
              전자문서 및 전자서명법에 따라 작성된 서명은 법적 서명과 동일한 효력을 갖습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
