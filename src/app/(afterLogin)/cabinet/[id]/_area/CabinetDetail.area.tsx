'use client';

import ClickBackToCabinetAction from '../_action/ClickBackToCabinet.action';
import ContractDocumentTemplate from '@/app/_template/ContractDocument.template';

export default function CabinetDetailArea() {
  return (
    <div className="border-custom-slate-border-side space-y-5 rounded-3xl border bg-white p-6">
      <div className="border-b border-slate-100 pb-4">
        <ClickBackToCabinetAction />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="relative h-[680px] lg:col-span-2">
          <div className="absolute inset-0 overflow-y-auto rounded-2xl border border-slate-200">
            <ContractDocumentTemplate
              instructorName="이지은"
              instructorPhone="010-1234-5678"
              instructorSubject="영어"
              instructorAddress="서울특별시 강남구 대치동 123-45"
              wizStartDate="2025-03-01"
              wizEndDate="2026-02-28"
              wizSalaryType="hourly"
              wizHourlyRate={12000}
              showPrintStyles={false}
              className="shadow-none border-none"
            />
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <span className="mb-4 block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              이 문서의 흐름 타임라인
            </span>
            <div className="space-y-4">
              <div className="border-l-2 border-slate-300 pl-3.5 text-[11px]">
                <span className="block font-mono text-[9px] text-slate-400">
                  2025. 2. 28. 오후 11:20:00
                </span>
                <p className="font-bold text-slate-800">원장 (이은재) - CONTRACT_DRAFTED</p>
                <p className="line-clamp-2 text-slate-500 mt-0.5 leading-relaxed">
                  이지은 강사 표준 근로계약서 초안을 작성하였습니다. (시급: 12,000원, 주: 18시간)
                </p>
              </div>

              <div className="border-l-2 border-slate-300 pl-3.5 text-[11px]">
                <span className="block font-mono text-[9px] text-slate-400">
                  2025. 2. 28. 오후 11:22:00
                </span>
                <p className="font-bold text-slate-800">원장 (이은재) - CONTRACT_SENT</p>
                <p className="line-clamp-2 text-slate-500 mt-0.5 leading-relaxed">
                  카카오 알림톡을 통해 이지은 강사에게 서명 링크를 전송하였습니다.
                </p>
              </div>

              <div className="border-l-2 border-slate-300 pl-3.5 text-[11px]">
                <span className="block font-mono text-[9px] text-slate-400">
                  2025. 2. 28. 오후 11:28:00
                </span>
                <p className="font-bold text-slate-800">강사 (이지은) - IDENTITY_VERIFIED</p>
                <p className="line-clamp-2 text-slate-500 mt-0.5 leading-relaxed">
                  휴대폰 본인확인을 통해 이지은의 신원을 검증하였습니다. (CI 발급 완료, 거래번호: TX_9817291)
                </p>
              </div>

              <div className="border-l-2 border-slate-300 pl-3.5 text-[11px]">
                <span className="block font-mono text-[9px] text-slate-400">
                  2025. 2. 28. 오후 11:30:00
                </span>
                <p className="font-bold text-slate-800">강사 (이지은) - SIGNED</p>
                <p className="line-clamp-2 text-slate-500 mt-0.5 leading-relaxed">
                  이지은 강사가 전자서명을 완료하였습니다. (IP: 211.234.12.98, 브라우저: Safari Mobile)
                </p>
              </div>

              <div className="border-l-2 border-emerald-500 pl-3.5 text-[11px]">
                <span className="block font-mono text-[9px] text-emerald-600">
                  2025. 2. 28. 오후 11:30:05
                </span>
                <p className="font-bold text-emerald-700">시스템 - CONTRACT_COMPLETED</p>
                <p className="line-clamp-2 text-emerald-600 font-medium mt-0.5 leading-relaxed">
                  계약이 체결 완료되어 PDF로 봉인 보관되었습니다. 무결성 해시 체인 검증 통과.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
