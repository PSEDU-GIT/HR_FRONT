'use client';

import React from 'react';
import cx from 'classnames';

export interface DaysConfig {
  [key: string]: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    breakTime: string;
  };
}

export interface ContractDocumentTemplateProps {
  instructorName?: string;
  instructorPhone?: string;
  instructorSubject?: string;
  instructorAddress?: string;
  wizStartDate?: string;
  wizEndDate?: string;
  wizProbation?: string;
  wizDaysConfig?: DaysConfig;
  wizSalaryType?: 'monthly' | 'commission' | 'hourly';
  wizSalaryAmount?: number;
  wizHourlyRate?: number;
  wizCommissionRate?: number;
  wizMinGuaranteeAmount?: number;
  wizPayDay?: string;
  customTerms?: string;
  className?: string;
  showPrintStyles?: boolean;
}

export default function ContractDocumentTemplate({
  instructorName = '박서준',
  instructorPhone = '010-8273-0192',
  instructorSubject = '미지정',
  instructorAddress = '미지정',
  wizStartDate = '2026-07-21',
  wizEndDate = '2027-07-20',
  wizProbation = '3개월',
  wizDaysConfig = {},
  wizSalaryType = 'monthly',
  wizSalaryAmount = 2500000,
  wizHourlyRate = 10320,
  wizCommissionRate = 20,
  wizMinGuaranteeAmount = 1883297,
  wizPayDay = '10일',
  customTerms = '특약사항 없음',
  className,
  showPrintStyles = true,
}: ContractDocumentTemplateProps) {
  const enabledDays = Object.entries(wizDaysConfig).filter(([, conf]) => conf?.enabled);

  const getSalaryLabel = () => {
    if (wizSalaryType === 'hourly') {
      return `시급제: ${wizHourlyRate ? wizHourlyRate.toLocaleString() : '10,320'}원`;
    }
    if (wizSalaryType === 'commission') {
      return `비율제: 수수료율 ${wizCommissionRate || 20}% (최소 보장: ${wizMinGuaranteeAmount ? wizMinGuaranteeAmount.toLocaleString() : '1,883,297'}원)`;
    }
    return `고정급 (월급제): ${wizSalaryAmount ? wizSalaryAmount.toLocaleString() : '2,500,000'}원`;
  };

  const todayStr = '2026년 7월 22일';

  return (
    <>
      {showPrintStyles && (
        <style>{`
          @media print {
            body * {
              visibility: hidden !important;
            }
            #printable-contract-document,
            #printable-contract-document * {
              visibility: visible !important;
            }
            #printable-contract-document {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 20px !important;
              border: none !important;
              box-shadow: none !important;
              max-height: none !important;
              overflow: visible !important;
              background: white !important;
            }
          }
        `}</style>
      )}
      <div
        id="printable-contract-document"
        className={cx(
          'border-custom-slate-border-side min-h-full rounded-2xl border bg-white p-6 text-xs leading-relaxed font-sans text-slate-800 md:p-8 shadow-sm print:max-h-none print:overflow-visible print:border-none print:shadow-none print:p-0 print:m-0',
          className,
        )}
      >
        <div className="space-y-6">
          <p className="leading-normal font-semibold text-slate-700">
            목동 학온 캠퍼스(이하 "갑"이라 한다)과 {instructorName}(이하 "을"이라 한다)는 다음과 같이
            근로계약을 체결한다.
          </p>

          {/* 별지 1 */}
          <div className="space-y-2">
            <h3 className="text-[13px] font-extrabold text-slate-900">
              【 별지 1 】 상세 근로시간표
            </h3>
            <table className="border-custom-slate-border-side w-full overflow-hidden rounded-lg border text-[11px] text-slate-700">
              <thead className="bg-slate-50">
                <tr className="border-custom-slate-border-side border-b">
                  <th className="w-24 p-2.5 text-left font-extrabold">요일</th>
                  <th className="p-2.5 text-left font-extrabold">근무시간</th>
                </tr>
              </thead>
              <tbody className="border-custom-slate-border-side divide-y">
                {enabledDays.length > 0 ? (
                  enabledDays.map(([day, conf]) => (
                    <tr key={day}>
                      <td className="p-2.5 font-bold">{day}</td>
                      <td className="p-2.5 font-medium">
                        {conf.startTime} ~ {conf.endTime} (휴게 {conf.breakTime})
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="p-2.5 text-center text-slate-400 font-medium">
                      설정된 근로요일이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 별지 2 */}
          <div className="space-y-2 pt-2">
            <h3 className="text-[13px] font-extrabold text-slate-900">
              【 별지 2 】 상세 임금산정 내역
            </h3>
            <table className="border-custom-slate-border-side w-full overflow-hidden rounded-lg border text-[11px] text-slate-700">
              <thead className="bg-slate-50">
                <tr className="border-custom-slate-border-side border-b">
                  <th className="p-2.5 text-left font-extrabold">항목</th>
                  <th className="w-36 p-2.5 text-right font-extrabold">금액</th>
                  <th className="p-2.5 text-left font-extrabold">비고</th>
                </tr>
              </thead>
              <tbody className="border-custom-slate-border-side divide-y">
                <tr>
                  <td className="p-2.5 font-bold">약정 급여 조건</td>
                  <td className="p-2.5 text-right font-medium">
                    {wizSalaryType === 'hourly'
                      ? `${wizHourlyRate ? wizHourlyRate.toLocaleString() : '10,320'}원/시`
                      : wizSalaryType === 'commission'
                        ? `${wizCommissionRate}%`
                        : `${wizSalaryAmount ? wizSalaryAmount.toLocaleString() : '2,500,000'}원/월`}
                  </td>
                  <td className="text-text-side p-2.5 font-medium">약정된 급여 산정 방식</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="p-2.5 font-extrabold text-slate-900">지급일</td>
                  <td className="text-custom-indigo p-2.5 text-right font-extrabold">
                    매월 {wizPayDay}
                  </td>
                  <td className="text-custom-indigo p-2.5 font-semibold">
                    근로자 지정 계좌로 정기 지급
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 제1조 */}
          <div className="space-y-2 pt-4 print:break-before-page page-break-before-always">
            <h3 className="text-[13px] font-extrabold text-slate-900">제1조 (계약 당사자)</h3>
            <div className="border-custom-slate-border-side overflow-hidden rounded-xl border">
              <div className="border-custom-slate-border-side grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
                <div className="space-y-2 p-4">
                  <div className="border-slate-100 mb-2 border-b pb-1.5 text-[12px] font-extrabold text-slate-900">
                    갑 (사용자)
                  </div>
                  <div className="flex text-[11px]">
                    <span className="w-20 font-medium text-slate-400">상호</span>
                    <span className="font-bold text-slate-800">목동 학온 캠퍼스</span>
                  </div>
                  <div className="flex text-[11px]">
                    <span className="w-20 font-medium text-slate-400">대표자</span>
                    <span className="font-bold text-slate-800">이학온</span>
                  </div>
                  <div className="flex text-[11px]">
                    <span className="w-20 font-medium text-slate-400">등록번호</span>
                    <span className="font-bold text-slate-800">105-13-98765</span>
                  </div>
                  <div className="flex text-[11px]">
                    <span className="w-20 font-medium text-slate-400">연락처</span>
                    <span className="font-bold text-slate-800">02-2644-5678</span>
                  </div>
                  <div className="flex text-[11px]">
                    <span className="w-20 font-medium text-slate-400">주소</span>
                    <span className="leading-normal font-bold text-slate-800">
                      서울특별시 양천구 목동서로 201 학온빌딩 5층
                    </span>
                  </div>
                </div>

                <div className="space-y-2 p-4">
                  <div className="border-slate-100 mb-2 border-b pb-1.5 text-[12px] font-extrabold text-slate-900">
                    을 (근로자)
                  </div>
                  <div className="flex text-[11px]">
                    <span className="w-20 font-medium text-slate-400">성명</span>
                    <span className="font-bold text-slate-800">{instructorName}</span>
                  </div>
                  <div className="flex text-[11px]">
                    <span className="w-20 font-medium text-slate-400">연락처</span>
                    <span className="font-bold text-slate-800">{instructorPhone}</span>
                  </div>
                  <div className="flex text-[11px]">
                    <span className="w-20 font-medium text-slate-400">담당과목</span>
                    <span className="font-bold text-slate-800">{instructorSubject}</span>
                  </div>
                  <div className="flex text-[11px]">
                    <span className="w-20 font-medium text-slate-400">주소</span>
                    <span className="leading-normal font-bold text-slate-800">
                      {instructorAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 제2조 */}
          <div className="space-y-1">
            <h3 className="text-[13px] font-extrabold text-slate-900">제2조 (계약기간)</h3>
            <p className="font-medium text-slate-700">
              ① 본 계약의 기간은 {wizStartDate}부터 {wizEndDate}까지로 한다.
            </p>
            <p className="font-medium text-slate-700">
              ② 수습기간: 계약개시일로부터 {wizProbation}
            </p>
          </div>

          {/* 제3조 */}
          <div className="space-y-1">
            <h3 className="text-[13px] font-extrabold text-slate-900">제3조 (업무내용)</h3>
            <p className="font-medium text-slate-700">을의 담당 업무는 다음과 같다.</p>
            <ul className="list-disc space-y-0.5 pl-4 font-medium text-slate-600">
              <li>담당 과목: {instructorSubject}</li>
              <li>갑이 지시하는 교육 및 강의 관련 업무</li>
            </ul>
          </div>

          {/* 제4조 */}
          <div className="space-y-1">
            <h3 className="text-[13px] font-extrabold text-slate-900">제4조 (근로시간)</h3>
            <p className="font-medium text-slate-700">
              ① 소정근로시간 및 휴게시간의 상세 사항은 별지 제1호에 따른다.
            </p>
            <p className="font-medium text-slate-700">
              ② 1주 소정근로시간은 설정된 근로일정에 따르며, 1일 근로시간을 준수한다.
            </p>
          </div>

          {/* 제5조 */}
          <div className="space-y-1">
            <h3 className="text-[13px] font-extrabold text-slate-900">제5조 (휴게시간)</h3>
            <p className="font-medium text-slate-700">
              ① 4시간 이상 근로하는 경우 30분 이상, 8시간 이상 근로하는 경우 1시간 이상의 휴게시간을
              부여한다.
            </p>
            <p className="font-medium text-slate-700">
              ② 휴게시간은 근로시간 도중에 자유롭게 이용할 수 있다.
            </p>
          </div>

          {/* 제6조 */}
          <div className="space-y-2">
            <h3 className="text-[13px] font-extrabold text-slate-900">제6조 (임금)</h3>
            <p className="font-semibold text-slate-800">{getSalaryLabel()}</p>
            <p className="font-medium text-slate-700">① 급여 지급일: 매월 {wizPayDay}</p>
            <p className="font-medium text-slate-700">
              ② 을이 지정한 금융기관 계좌로 이체하여 지급한다.
            </p>
            <p className="font-medium text-slate-700">
              ③ 상세 항목 및 산정 내역은 별지 제2호에 따른다.
            </p>
          </div>

          {/* 제7조 */}
          <div className="space-y-1">
            <h3 className="text-[13px] font-extrabold text-slate-900">제7조 (휴일 및 휴가)</h3>
            <p className="font-medium text-slate-700">① 주휴일: 매주 일요일</p>
            <p className="font-medium text-slate-700">
              ② 연차유급휴가는 근로기준법에 따라 부여한다.
            </p>
          </div>

          {/* 제8조 */}
          <div className="space-y-1">
            <h3 className="text-[13px] font-extrabold text-slate-900">제8조 (퇴직급여)</h3>
            <p className="font-medium text-slate-700">
              ① 계속근로기간이 1년 이상인 경우, 퇴직일로부터 14일 이내에 퇴직급여를 지급한다.
            </p>
          </div>

          {/* 특약사항 */}
          <div className="space-y-1">
            <h3 className="text-[13px] font-extrabold text-slate-900">【특약사항】</h3>
            <p className="border-custom-slate-border-side bg-custom-slate-bg/50 rounded-xl border p-4 font-medium leading-relaxed text-slate-800 whitespace-pre-wrap">
              {customTerms}
            </p>
          </div>

          {/* 하단 날짜 및 서명 란 */}
          <div className="border-slate-100 border-t pt-4 text-center font-semibold text-slate-700">
            위 계약을 증명하기 위하여 본 계약서 2부를 작성하여 갑과 을이 각각 서명 날인 후 1부씩
            보관한다.
            <div className="mt-4 text-[13px] font-extrabold text-slate-800">{todayStr}</div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="border-custom-slate-border-side space-y-1.5 rounded-xl border bg-slate-50/40 p-4">
              <div className="text-[10px] font-extrabold text-slate-400">갑 (사용자)</div>
              <div className="text-[11px] font-bold text-slate-800">상호: 목동 학온 캠퍼스</div>
              <div className="text-[11px] font-bold text-slate-800">대표자: 이학온</div>
              <div className="text-[11px] font-medium text-slate-600">
                주소: 서울특별시 양천구 목동서로 201 학온빌딩 5층
              </div>
              <div className="mt-4 flex justify-end">
                <div className="border-slate-300 flex h-10 w-10 items-center justify-center rounded-full border bg-white text-[11px] font-extrabold text-slate-400 shadow-2xs">
                  인
                </div>
              </div>
            </div>

            <div className="border-custom-slate-border-side space-y-1.5 rounded-xl border bg-slate-50/40 p-4">
              <div className="text-[10px] font-extrabold text-slate-400">을 (근로자)</div>
              <div className="text-[11px] font-bold text-slate-800">성명: {instructorName}</div>
              <div className="text-[11px] font-medium text-slate-600">
                주소: {instructorAddress}
              </div>
              <div className="mt-4 flex justify-end">
                <div className="border-slate-300 flex h-10 w-10 items-center justify-center rounded-full border bg-white text-[11px] font-extrabold text-slate-400 shadow-2xs">
                  인
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
