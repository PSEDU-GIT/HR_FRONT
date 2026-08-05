'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useTokenHandlerStore } from '../../_state/useTokenHandlerStore';
import AccordionTermItem from '../_component/AccordionTermItem';

export default function FormPrivacyTermsAction() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const {
    agreedPrivacy,
    agreedIdentification,
    agreedElectronic,
    setAgreedPrivacy,
    setAgreedIdentification,
    setAgreedElectronic,
    toggleAllAgreements,
  } = useTokenHandlerStore(
    useShallow((state: any) => ({
      agreedPrivacy: state.agreedPrivacy,
      agreedIdentification: state.agreedIdentification,
      agreedElectronic: state.agreedElectronic,
      setAgreedPrivacy: state.setAgreedPrivacy,
      setAgreedIdentification: state.setAgreedIdentification,
      setAgreedElectronic: state.setAgreedElectronic,
      toggleAllAgreements: state.toggleAllAgreements,
    })),
  );

  const isAllAgreed = agreedPrivacy && agreedIdentification && agreedElectronic;

  const toggleDetail = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <label className="flex cursor-pointer items-center space-x-2">
          <input
            type="checkbox"
            checked={isAllAgreed}
            onChange={(e) => toggleAllAgreements(e.target.checked)}
            className="text-custom-indigo focus:ring-custom-indigo h-4 w-4 rounded border-slate-300"
          />
          <span className="text-text-title text-xs font-bold dark:text-slate-100">전체 동의</span>
        </label>
      </div>

      <div className="divide-custom-slate-border divide-y dark:divide-slate-900">
        <AccordionTermItem
          id={1}
          label="개인정보 수집 및 이용 동의 (필수)"
          checked={agreedPrivacy}
          isOpen={openIndex === 1}
          onToggleCheck={setAgreedPrivacy}
          onToggleOpen={() => toggleDetail(1)}
          content={
            <>
              [목적] 근로계약 체결, 본인 확인, 급여 정산
              <br />
              [항목] 성명, 생년월일, 연락처, 주소, 계좌번호
              <br />
              [보유] 관계 법령에 따른 보존 기간 보관
            </>
          }
        />

        <AccordionTermItem
          id={2}
          label="고유식별정보 처리 동의 (필수)"
          checked={agreedIdentification}
          isOpen={openIndex === 2}
          onToggleCheck={setAgreedIdentification}
          onToggleOpen={() => toggleDetail(2)}
          content="원천징수 신고 및 세무 처리를 위한 고유식별정보를 관련 법령에 따라 수집·이용합니다."
        />

        <AccordionTermItem
          id={3}
          label="전자서명 법적 효력 동의 (필수)"
          checked={agreedElectronic}
          isOpen={openIndex === 3}
          onToggleCheck={setAgreedElectronic}
          onToggleOpen={() => toggleDetail(3)}
          content="전자문서 및 전자서명법에 따라 작성된 서명은 법적 서명과 동일한 효력을 갖습니다."
        />
      </div>
    </div>
  );
}
