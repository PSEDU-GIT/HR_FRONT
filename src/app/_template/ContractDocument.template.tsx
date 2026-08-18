'use client';

import React from 'react';
import cx from 'classnames';
import { calculateWageEngine, calculateScheduleHours, getEffectiveNonCompeteAmount } from '@/app/(afterLogin)/wizard/_lib/wageEngine';
import { formatPhoneNumber } from '@/app/util/formatPhoneNumber.util';

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
  instructorSignatureUrl?: string | null;
  academyName?: string;
  academyRepresentative?: string;
  academyBusinessNum?: string;
  academyTel?: string;
  academyAddress?: string;
  academySealUrl?: string | null;
  wizStartDate?: string;
  wizEndDate?: string;
  wizProbation?: string;
  wizDaysConfig?: DaysConfig;
  wizWeeklyHoliday?: string;
  wizSalaryType?: 'monthly' | 'commission' | 'hourly';
  wizSalaryAmount?: number;
  wizHourlyRate?: number;
  wizCommissionRate?: number;
  wizMinGuaranteeAmount?: number;
  wizPayDay?: string;
  wizHasTaxFree?: boolean;
  wizNonTaxFood?: number;
  wizHasNonCompete?: boolean;
  wizNonCompetePeriod?: string;
  wizNonCompeteRange?: string;
  wizNonCompeteAmount?: number;
  wizNonCompeteCalcType?: 'percent' | 'manual';
  wizNonCompetePercent?: number;
  wizHasExtraAllowance?: boolean;
  wizOvertimeAllowance?: number;
  wizPositionAllowance?: number;
  wizOtherAllowance?: number;
  wizOtherAllowanceName?: string;
  customTerms?: string;
  contractType?: string;
  className?: string;
  showPrintStyles?: boolean;
  employeeCount?: number;
}

const ALL_DAYS_ORDER = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

export function numberToKoreanWon(num: number): string {
  if (!num || num <= 0) return '0원';
  const units = ['', '만', '억', '조'];
  const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const subUnits = ['', '십', '백', '천'];

  let str = '';
  let unitIdx = 0;
  let temp = num;

  while (temp > 0) {
    const chunk = temp % 10000;
    if (chunk > 0) {
      let chunkStr = '';
      let cTemp = chunk;
      for (let i = 0; i < 4; i++) {
        const digit = cTemp % 10;
        if (digit > 0) {
          chunkStr = (digit === 1 && i > 0 ? '' : digits[digit]) + subUnits[i] + chunkStr;
        }
        cTemp = Math.floor(cTemp / 10);
      }
      str = chunkStr + units[unitIdx] + str;
    }
    temp = Math.floor(temp / 10000);
    unitIdx++;
  }
  return `금 ${str}원 (₩${num.toLocaleString()})`;
}

export default function ContractDocumentTemplate({
  instructorName = '박서준',
  instructorPhone = '010-8273-0192',
  instructorSubject = '미지정',
  instructorAddress = '미지정',
  instructorSignatureUrl,
  academyName = '학원',
  academyRepresentative = '대표자',
  academyBusinessNum,
  academyTel,
  academyAddress = '학원 주소',
  academySealUrl,
  wizStartDate = '2026-07-21',
  wizEndDate = '2027-07-20',
  wizProbation = '3개월',
  wizDaysConfig = {},
  wizWeeklyHoliday = '일요일',
  wizSalaryType = 'monthly',
  wizSalaryAmount = 2500000,
  wizHourlyRate = 10320,
  wizCommissionRate = 20,
  wizMinGuaranteeAmount = 2156880,
  wizPayDay = '10일',
  wizHasTaxFree = true,
  wizNonTaxFood = 200000,
  wizHasNonCompete = true,
  wizNonCompetePeriod = '6개월',
  wizNonCompeteRange = '반경 3km',
  wizNonCompeteAmount = 0,
  wizNonCompeteCalcType = 'percent',
  wizNonCompetePercent = 10,
  wizHasExtraAllowance = false,
  wizOvertimeAllowance = 0,
  wizPositionAllowance = 0,
  wizOtherAllowance = 0,
  wizOtherAllowanceName = '',
  customTerms = '특약사항 없음',
  contractType = '',
  className,
  showPrintStyles = true,
  employeeCount,
}: ContractDocumentTemplateProps) {
  const isHourly = wizSalaryType === 'hourly';
  const isCommission = wizSalaryType === 'commission';
  const isUnder5 =
    contractType.includes('5인 미만') ||
    contractType.includes('5인 이하') ||
    (employeeCount !== undefined && employeeCount < 5);
  const effectiveEmployeeCount = isUnder5 ? 4 : (employeeCount ?? 5);
  const isFiveOrMore = effectiveEmployeeCount >= 5;

  const { weeklyHours, weeklyOvertimeHours, weeklyNightHours } = calculateScheduleHours(wizDaysConfig);

  const calculatedNonCompeteAmount = getEffectiveNonCompeteAmount({
    hasNonCompete: wizHasNonCompete,
    calcType: wizNonCompeteCalcType,
    percent: wizNonCompetePercent,
    manualAmount: wizNonCompeteAmount,
    salaryType: wizSalaryType,
    salaryAmount: wizSalaryAmount,
    hourlyRate: wizHourlyRate,
    minGuaranteeAmount: wizMinGuaranteeAmount,
  });

  const wageResult = calculateWageEngine({
    salaryType: wizSalaryType,
    salaryAmount: wizSalaryAmount,
    hourlyRate: wizHourlyRate,
    commissionRate: wizCommissionRate,
    minGuaranteeAmount: wizMinGuaranteeAmount,
    mealAllowance: wizHasTaxFree ? wizNonTaxFood : 0,
    positionAllowance: wizHasExtraAllowance ? wizPositionAllowance : 0,
    overtimeAllowance: wizHasExtraAllowance ? wizOvertimeAllowance : 0,
    otherAllowance: wizHasExtraAllowance ? wizOtherAllowance : 0,
    nonCompeteAmount: wizHasNonCompete ? calculatedNonCompeteAmount : 0,
    weeklyHours,
    weeklyOvertimeHours,
    weeklyNightHours,
    employeeCount: effectiveEmployeeCount,
  });

  const todayStr = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
          'border-custom-slate-border-side min-h-full rounded-2xl border bg-white p-6 font-sans text-xs leading-relaxed text-slate-800 shadow-sm md:p-8 print:m-0 print:max-h-none print:overflow-visible print:border-none print:p-0 print:shadow-none',
          className,
        )}
      >
        <div className="space-y-8">
          {/* ========================================================================= */}
          {/* 1. 맨 위 상단 배치: 별지 1 (상세 근로시간표) & 별지 2 (상세 임금산정 내역) */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            {/* 별지 1 : 상세 근로시간표 (주휴일 명시) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="border-l-4 border-slate-900 pl-2 text-sm font-black text-slate-900">
                  【별지 1】 상세 근로시간표
                </h3>
                <span className="bg-indigo-50 text-indigo-700 border-indigo-200 inline-flex items-center rounded-md border px-2 py-0.5 text-11 font-extrabold">
                  지정 유급주휴일: 매주 {wizWeeklyHoliday}
                </span>
              </div>
              <table className="border-custom-slate-border-side w-full overflow-hidden rounded-xl border text-11 text-slate-700 shadow-2xs">
                <thead className="bg-slate-50/80">
                  <tr className="border-custom-slate-border-side border-b">
                    <th className="w-24 p-2.5 text-center font-extrabold">요일</th>
                    <th className="w-32 p-2.5 text-center font-extrabold">근무 구분</th>
                    <th className="p-2.5 text-center font-extrabold">근무시간</th>
                    <th className="p-2.5 text-center font-extrabold">휴게시간</th>
                  </tr>
                </thead>
                <tbody className="border-custom-slate-border-side divide-y">
                  {ALL_DAYS_ORDER.map((day) => {
                    const conf = wizDaysConfig[day];
                    const isEnabled = conf?.enabled ?? false;
                    const isWeeklyHoliday = !isEnabled && wizWeeklyHoliday === day;

                    return (
                      <tr
                        key={day}
                        className={cx(
                          'text-center',
                          isWeeklyHoliday ? 'bg-indigo-50/30' : undefined,
                        )}
                      >
                        <td className="p-2.5 font-bold text-slate-900">{day}</td>
                        <td className="p-2.5 font-semibold">
                          {isEnabled ? (
                            <span className="text-emerald-700 font-bold">근무일 (ON)</span>
                          ) : isWeeklyHoliday ? (
                            <span className="text-indigo-700 font-black underline decoration-indigo-300 underline-offset-2">
                              유급 주휴일
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium">무급 휴무일</span>
                          )}
                        </td>
                        <td className="p-2.5 font-bold text-slate-800">
                          {isEnabled ? `${conf.startTime} ~ ${conf.endTime}` : '-'}
                        </td>
                        <td className="p-2.5 font-medium text-slate-600">
                          {isEnabled ? conf.breakTime : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 별지 2 : 상세 임금산정 내역 (이미지 레이아웃 정밀 반영) */}
            <div className="space-y-2.5 pt-2">
              <h3 className="border-l-4 border-slate-900 pl-2 text-sm font-black text-slate-900">
                【별지 2】 상세 임금산정 내역
              </h3>
              <table className="border-slate-300 w-full overflow-hidden rounded-xl border text-[11.5px] text-slate-800 shadow-2xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 bg-slate-100/90 text-slate-800">
                    <th className="w-32 border-r border-slate-300 p-2.5 text-left font-black">항목</th>
                    <th className="w-40 border-r border-slate-300 p-2.5 text-right font-black">금액</th>
                    <th className="p-2.5 text-left font-black">비고</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {/* 1. 급여 산정 기준 */}
                  <tr className="border-b border-slate-300 bg-white">
                    <td className="border-r border-slate-200 p-2.5 font-bold text-slate-800">급여 산정 기준</td>
                    <td className="border-r border-slate-200 p-2.5 text-right font-extrabold text-slate-900">
                      {isCommission
                        ? `매출의 ${wizCommissionRate}%`
                        : isHourly
                          ? `시급 ${wizHourlyRate.toLocaleString()}원`
                          : `총 지급 희망금액`}
                    </td>
                    <td className="p-2.5 font-medium text-slate-500">
                      {isCommission ? '담당 수강료 기준' : isHourly ? '약정 시급 기준' : '월 고정급 기준'}
                    </td>
                  </tr>

                  {/* 2. 최소 보장 내역 구분 헤더 */}
                  <tr className="bg-slate-50/70 border-b border-slate-200">
                    <td colSpan={3} className="p-2 text-xs font-black text-slate-700">
                      최소 보장 내역
                    </td>
                  </tr>

                  {/* 기본급 */}
                  <tr className="bg-white">
                    <td className="border-r border-slate-200 p-2.5 font-medium text-slate-700 pl-4">기본급</td>
                    <td className="border-r border-slate-200 p-2.5 text-right font-bold text-slate-800">
                      {wageResult.baseSalary.toLocaleString()}원
                    </td>
                    <td className="p-2.5 text-slate-500">월 소정근로 대가</td>
                  </tr>

                  {/* 주휴수당 */}
                  <tr className="bg-white">
                    <td className="border-r border-slate-200 p-2.5 font-medium text-slate-700 pl-4">주휴수당</td>
                    <td className="border-r border-slate-200 p-2.5 text-right font-bold text-slate-800">
                      {wageResult.weeklyHolidayPay.toLocaleString()}원
                    </td>
                    <td className="p-2.5 text-slate-500">근로기준법 제55조 유급주휴 (매주 {wizWeeklyHoliday})</td>
                  </tr>

                  {/* 식대 (비과세) */}
                  {wizHasTaxFree && (
                    <tr className="bg-white">
                      <td className="border-r border-slate-200 p-2.5 font-medium text-slate-700 pl-4">식대</td>
                      <td className="border-r border-slate-200 p-2.5 text-right font-bold text-slate-800">
                        {wizNonTaxFood.toLocaleString()}원
                      </td>
                      <td className="p-2.5 font-bold text-emerald-600">비과세</td>
                    </tr>
                  )}

                  {/* 직책수당 */}
                  {wizHasExtraAllowance && wizPositionAllowance > 0 && (
                    <tr className="bg-white">
                      <td className="border-r border-slate-200 p-2.5 font-medium text-slate-700 pl-4">직책수당</td>
                      <td className="border-r border-slate-200 p-2.5 text-right font-bold text-slate-800">
                        {wizPositionAllowance.toLocaleString()}원
                      </td>
                      <td className="p-2.5 text-slate-500">직무 담당 수당</td>
                    </tr>
                  )}

                  {/* 기타수당 */}
                  {wizHasExtraAllowance && wizOtherAllowance > 0 && (
                    <tr className="bg-white">
                      <td className="border-r border-slate-200 p-2.5 font-medium text-slate-700 pl-4">
                        {wizOtherAllowanceName || '기타수당'}
                      </td>
                      <td className="border-r border-slate-200 p-2.5 text-right font-bold text-slate-800">
                        {wizOtherAllowance.toLocaleString()}원
                      </td>
                      <td className="p-2.5 text-slate-500">기타 제수당</td>
                    </tr>
                  )}

                  {/* 연장근로수당 */}
                  <tr className="bg-white">
                    <td className="border-r border-slate-200 p-2.5 font-medium text-slate-700 pl-4">연장근로수당</td>
                    <td className="border-r border-slate-200 p-2.5 text-right font-bold text-slate-800">
                      {wageResult.overtimeAllowance.toLocaleString()}원
                    </td>
                    <td className="p-2.5 text-slate-500">
                      {weeklyOvertimeHours > 0
                        ? `포괄 연장근로 대가 (${isUnder5 ? `연장 ${weeklyOvertimeHours}h × 4.345` : `연장 ${weeklyOvertimeHours}h × 1.5배 × 4.345`})`
                        : '포괄 연장근로 대가'}
                    </td>
                  </tr>

                  {/* 3. 별도 및 약정 항목 구분 헤더 (경업금지 존재 시) */}
                  {wizHasNonCompete && (
                    <>
                      <tr className="bg-slate-50/70 border-b border-slate-200">
                        <td colSpan={3} className="p-2 text-xs font-black text-slate-700">
                          별도 및 약정 항목
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border-r border-slate-200 p-2.5 font-medium text-slate-700 pl-4">경업금지대가</td>
                        <td className="border-r border-slate-200 p-2.5 text-right font-bold text-slate-800">
                          {calculatedNonCompeteAmount.toLocaleString()}원
                        </td>
                        <td className="p-2.5 font-medium text-slate-600">
                          {isCommission
                            ? `최소보장액의 ${wizNonCompetePercent || 10}% (제11조 참조)`
                            : `약정 기준의 ${wizNonCompetePercent || 10}% (제11조 참조)`}
                        </td>
                      </tr>
                    </>
                  )}

                  {/* 4. 월 급여 (세전) 하이라이트 행 */}
                  {(() => {
                    const contractTotalPay =
                      wageResult.baseSalary +
                      wageResult.weeklyHolidayPay +
                      (wizHasTaxFree ? wizNonTaxFood : 0) +
                      wageResult.overtimeAllowance +
                      (wizHasExtraAllowance ? wizPositionAllowance + wizOtherAllowance : 0) +
                      (wizHasNonCompete ? calculatedNonCompeteAmount : 0);

                    return (
                      <tr className="border-t-2 border-sky-300 bg-sky-50/90 text-sky-950 font-black">
                        <td className="border-r border-sky-200 p-3 text-xs font-black">월 급여 (세전)</td>
                        <td className="border-r border-sky-200 p-3 text-right text-sm font-black text-sky-700">
                          {contractTotalPay.toLocaleString()}원
                        </td>
                        <td className="p-3 text-[10.5px] font-extrabold text-sky-800">
                          {isCommission
                            ? `매출 기준과 최소 보장 중 큰 금액 + 별도 대가 (${calculatedNonCompeteAmount.toLocaleString()}원)`
                            : isHourly
                              ? `월 소정근로 산정 총액 (${wageResult.mo + wageResult.mh}시간 분)`
                              : `총 지급 희망금액 (${numberToKoreanWon(contractTotalPay)})`}
                        </td>
                      </tr>
                    );
                  })()}
                </tbody>
              </table>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. 본 계약 전문 (제1조 ~ 제14조) */}
          {/* ========================================================================= */}
          <div className="page-break-before-always border-t border-slate-200 pt-6 print:break-before-page print:border-none space-y-6">
            {/* 계약서 헤더 타이틀 */}
            <div className="space-y-2 text-center pb-2">
              <h1 className="text-xl font-black text-slate-900 tracking-wider">강 사 근 로 계 약 서</h1>
              <p className="text-xs font-semibold text-slate-600">
                {academyName}(이하 &quot;갑&quot;이라 한다)과 {instructorName}(이하 &quot;을&quot;이라 한다)는 다음과 같이 근로계약을 체결한다.
              </p>
            </div>

            {/* 제1조 (계약 당사자) */}
            <div className="space-y-2">
              <h3 className="text-[13px] font-extrabold text-slate-900">제1조 (계약 당사자)</h3>
              <div className="border-custom-slate-border-side overflow-hidden rounded-xl border">
                <div className="border-custom-slate-border-side grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
                  <div className="space-y-2 p-4">
                    <div className="mb-2 border-b border-slate-100 pb-1.5 text-xs font-extrabold text-slate-900">
                      갑 (사용자)
                    </div>
                    <div className="flex text-11">
                      <span className="w-20 font-medium text-slate-400">상호</span>
                      <span className="font-bold text-slate-800">{academyName}</span>
                    </div>
                    <div className="flex text-11">
                      <span className="w-20 font-medium text-slate-400">대표자</span>
                      <span className="font-bold text-slate-800">{academyRepresentative}</span>
                    </div>
                    <div className="flex text-11">
                      <span className="w-20 font-medium text-slate-400">등록번호</span>
                      <span className="font-bold text-slate-800">{academyBusinessNum || '-'}</span>
                    </div>
                    <div className="flex text-11">
                      <span className="w-20 font-medium text-slate-400">연락처</span>
                      <span className="font-bold text-slate-800">
                        {academyTel ? formatPhoneNumber(academyTel) : '-'}
                      </span>
                    </div>
                    <div className="flex text-11">
                      <span className="w-20 font-medium text-slate-400">주소</span>
                      <span className="leading-normal font-bold text-slate-800">
                        {academyAddress}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 p-4">
                    <div className="mb-2 border-b border-slate-100 pb-1.5 text-xs font-extrabold text-slate-900">
                      을 (근로자)
                    </div>
                    <div className="flex text-11">
                      <span className="w-20 font-medium text-slate-400">성명</span>
                      <span className="font-bold text-slate-800">{instructorName}</span>
                    </div>
                    <div className="flex text-11">
                      <span className="w-20 font-medium text-slate-400">연락처</span>
                      <span className="font-bold text-slate-800">
                        {instructorPhone ? formatPhoneNumber(instructorPhone) : '-'}
                      </span>
                    </div>
                    <div className="flex text-11">
                      <span className="w-20 font-medium text-slate-400">담당과목</span>
                      <span className="font-bold text-slate-800">{instructorSubject}</span>
                    </div>
                    <div className="flex text-11">
                      <span className="w-20 font-medium text-slate-400">주소</span>
                      <span className="leading-normal font-bold text-slate-800">
                        {instructorAddress}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 제2조 (계약기간) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제2조 (계약기간)</h3>
              <p className="font-medium text-slate-700">
                ① 본 계약의 기간은 <strong className="text-slate-900">{wizStartDate}</strong>부터 <strong className="text-slate-900">{wizEndDate}</strong>까지로 한다.
              </p>
              {wizProbation && wizProbation !== '수습 없음' && (
                <p className="font-medium text-slate-700">
                  ② 수습기간: 계약개시일로부터 <strong className="text-slate-900">{wizProbation}</strong>으로 하며, 수습기간 중 급여는 약정 급여의 100%를 동일하게 지급한다.
                </p>
              )}
            </div>

            {/* 제3조 (업무내용) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제3조 (업무내용)</h3>
              <p className="font-medium text-slate-700">을의 담당 업무는 다음과 같다.</p>
              <ul className="list-disc space-y-0.5 pl-4 font-medium text-slate-600">
                <li>담당 과목 및 업무: {instructorSubject} 강의 및 학습 지도</li>
                <li>학원 내 수강생 관리, 성적 관리, 강의 자료 준비 및 부수되는 학원 행정 관리 업무</li>
              </ul>
            </div>

            {/* 제4조 (근로시간) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제4조 (근로시간)</h3>
              <p className="font-medium text-slate-700">
                ① 1주 소정근로시간은 <strong className="text-slate-900">{weeklyHours}시간</strong>으로 한다.
              </p>
              <p className="font-medium text-slate-700">
                ② 요일별 상세 소정근로시간 및 출퇴근 시각은 별지 제1호(상세 근로시간표)에 명시된 바에 따른다.
              </p>
            </div>

            {/* 제5조 (연장근로 및 연장근로수당) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제5조 (연장근로 및 연장근로수당)</h3>
              <p className="font-medium text-slate-700">
                ① 당사자 간 합의에 따라 1주 12시간 한도 내에서 연장근로를 실시할 수 있다.
              </p>
              <p className="font-medium text-slate-700">
                ② 연장근로에 대하여 포괄연장근로수당으로 매월 <strong className="text-slate-900">{wageResult.overtimeAllowance.toLocaleString()}원</strong>을 지급한다.
              </p>
            </div>

            {/* 제6조 (휴게시간) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제6조 (휴게시간)</h3>
              <p className="font-medium text-slate-700">
                ① 근로시간이 4시간인 경우 30분 이상, 8시간인 경우 1시간 이상의 휴게시간을 근로시간 도중에 부여한다.
              </p>
              <p className="font-medium text-slate-700">
                ② 휴게시간은 근로자가 자유롭게 이용할 수 있으며 상세 배정은 별지 제1호에 따른다.
              </p>
            </div>

            {/* 제7조 (임금 명세) */}
            <div className="space-y-2">
              <h3 className="text-[13px] font-extrabold text-slate-900">제7조 (임금 명세)</h3>
              <p className="font-bold text-slate-900">
                총 지급 희망금액: {numberToKoreanWon(
                  wageResult.baseSalary +
                  wageResult.weeklyHolidayPay +
                  (wizHasTaxFree ? wizNonTaxFood : 0) +
                  wageResult.overtimeAllowance +
                  (wizHasExtraAllowance ? wizPositionAllowance + wizOtherAllowance : 0) +
                  (wizHasNonCompete ? calculatedNonCompeteAmount : 0)
                )}
              </p>
              <p className="font-medium text-slate-700">① 임금 지급일: 매월 <strong className="text-slate-900">{wizPayDay}</strong> (지급일이 휴일인 경우 그 전일에 지급한다)</p>
              <p className="font-medium text-slate-700">
                ② 을이 지정한 금융기관 계좌로 현금 입금 지급한다.
              </p>
              <p className="font-medium text-slate-700">
                ③ 기본급, 주휴수당, 비과세 식대, 고정수당 등 상세 임금산정 내역은 별지 제2호에 따른다.
              </p>
              {isCommission && (
                <p className="font-medium text-slate-700">
                  ④ 비율제(수수료 <strong className="text-slate-900">{wizCommissionRate || 20}%</strong>) 정산 시: 당월 담당 수강료 매출 비율 정산액과 별지 제2호의 약정 최소보장액 중 더 큰 금액을 최종 지급한다.
                </p>
              )}
            </div>

            {/* 제8조 (휴일 및 휴가) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제8조 (휴일 및 휴가)</h3>
              <p className="font-medium text-slate-700">① 유급주휴일: 매주 <strong className="text-slate-900">{wizWeeklyHoliday}</strong> (1주 소정근로일 개근 시 부여)</p>
              <p className="font-medium text-slate-700">② 근로자의 날(5월 1일)은 유급휴일로 처리한다.</p>
              {isFiveOrMore && (
                <p className="font-medium text-slate-700">
                  ③ 연차유급휴가는 근로기준법 제60조에 따라 부여한다.
                </p>
              )}
            </div>

            {/* 제9조 (퇴직급여) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제9조 (퇴직급여)</h3>
              <p className="font-medium text-slate-700">
                계속근로기간이 1년 이상이고 주 소정근로시간이 15시간 이상인 경우 근로자퇴직급여 보장법에 따라 퇴직급여를 지급한다.
              </p>
            </div>

            {/* 제10조 (비밀유지) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제10조 (비밀유지)</h3>
              <p className="font-medium text-slate-700">
                을은 재직 중 및 퇴직 후에도 강의 자료, 수강생 명단 및 개인정보, 영업비밀을 제3자에게 누설하거나 부당하게 활용할 수 없다.
              </p>
            </div>

            {/* 제11조 (경업금지) */}
            {wizHasNonCompete && (
              <div className="space-y-1">
                <h3 className="text-[13px] font-extrabold text-slate-900">제11조 (경업금지 약정)</h3>
                <p className="font-medium text-slate-700">
                  ① 을은 퇴직 후 <strong className="text-slate-900">{wizNonCompetePeriod}</strong> 동안 <strong className="text-slate-900">{wizNonCompeteRange}</strong> 범위 내에서 동일·유사 동종 경쟁 학원에 종사하거나 개원할 수 없다.
                </p>
                <p className="font-medium text-slate-700">
                  ② 갑은 경업금지 약정에 대한 대가로 매월 <strong className="text-slate-900">{calculatedNonCompeteAmount.toLocaleString()}원</strong>{isCommission ? ` (약정 최소보장금액의 ${wizNonCompetePercent || 10}%)` : ''}을 별도 지급하며, 상세 내역은 별지 제2호에 따른다.
                </p>
              </div>
            )}

            {/* 제12조 (손해배상) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제12조 (손해배상)</h3>
              <p className="font-medium text-slate-700">
                을이 무단 이탈, 고의 또는 중과실로 비밀유지의무나 경업금지 약정을 위반하여 갑에게 손해를 입힌 경우 손해를 배상할 책임을 진다.
              </p>
            </div>

            {/* 제13조 (기타) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제13조 (기타)</h3>
              <p className="font-medium text-slate-700">
                본 계약서에 명시되지 아니한 사항은 근로기준법 및 관련 법령, 학원 관련 규정에 따른다.
              </p>
            </div>

            {/* 제14조 (관할법원) */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">제14조 (관할법원)</h3>
              <p className="font-medium text-slate-700">
                본 계약과 관련하여 발생하는 소송의 관할법원은 갑의 학원 소재지 관할 법원으로 한다.
              </p>
            </div>

            {/* 특약사항 */}
            <div className="space-y-1">
              <h3 className="text-[13px] font-extrabold text-slate-900">【특약사항】</h3>
              <p className="border-custom-slate-border-side bg-custom-slate-bg/50 rounded-xl border p-4 leading-relaxed font-medium whitespace-pre-wrap text-slate-800">
                {customTerms}
              </p>
            </div>

            {/* 서명 날인 란 */}
            <div className="border-t border-slate-100 pt-4 text-center font-semibold text-slate-700">
              위 계약을 증명하기 위하여 본 계약서 2부를 작성하여 갑과 을이 각각 서명 날인 후 1부씩 보관한다.
              <div className="mt-4 text-[13px] font-extrabold text-slate-800">{todayStr}</div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="border-custom-slate-border-side flex flex-col justify-between min-h-[160px] rounded-xl border bg-slate-50/40 p-4">
                <div className="space-y-1.5">
                  <div className="text-[10px] font-extrabold text-slate-400">갑 (사용자)</div>
                  <div className="text-11 font-bold text-slate-800">상호: {academyName}</div>
                  <div className="text-11 font-bold text-slate-800">대표자: {academyRepresentative}</div>
                  {academyBusinessNum && (
                    <div className="text-11 font-medium text-slate-600">
                      사업자등록번호: {academyBusinessNum}
                    </div>
                  )}
                  <div className="text-11 font-medium text-slate-600">
                    주소: {academyAddress}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  {academySealUrl ? (
                    <div className="relative flex h-12 w-12 items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={academySealUrl}
                        alt="학원 직인"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-11 font-extrabold text-slate-400 shadow-2xs">
                      인
                    </div>
                  )}
                </div>
              </div>

              <div className="border-custom-slate-border-side flex flex-col justify-between min-h-[160px] rounded-xl border bg-slate-50/40 p-4">
                <div className="space-y-1.5">
                  <div className="text-[10px] font-extrabold text-slate-400">을 (근로자)</div>
                  <div className="text-11 font-bold text-slate-800">성명: {instructorName}</div>
                  <div className="text-11 font-medium text-slate-600">
                    주소: {instructorAddress}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  {instructorSignatureUrl ? (
                    <div className="relative flex h-12 w-12 items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={instructorSignatureUrl}
                        alt="근로자 서명"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-11 font-extrabold text-slate-400 shadow-2xs">
                      인
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
