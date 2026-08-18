import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { type ContractDetailResponse } from '@/app/(afterLogin)/cabinet/_model/ContractDetail.model';
import { fetchWithAuth } from '@/app/_lib/fetchWithAuth';
import { auth } from '@/app/auth';
import {
  calculateWageEngine,
  calculateScheduleHours,
  getEffectiveNonCompeteAmount,
  type DailyScheduleInput,
} from '@/app/(afterLogin)/wizard/_lib/wageEngine';
import { formatPhoneNumber } from '@/app/util/formatPhoneNumber.util';

const DAY_KEY_MAP: Record<string, string> = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
};

const ALL_DAYS_ORDER = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

const SALARY_TYPE_MAP: Record<string, 'monthly' | 'commission' | 'hourly'> = {
  FIXED: 'monthly',
  MONTHLY: 'monthly',
  HOURLY: 'hourly',
  PERCENT: 'commission',
  RATIO: 'commission',
  COMMISSION: 'commission',
};

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const contractId = searchParams.get('contractId');
  const fallbackName = searchParams.get('name') || '이지은';
  const title = searchParams.get('title') || '강사 근로계약서';

  let detail: ContractDetailResponse | null = null;
  let academyInfo: any = null;

  if (contractId) {
    try {
      const res = await fetchWithAuth<ContractDetailResponse>(`/hr/contract/${contractId}`, {
        cache: 'no-store',
      });
      detail = res?.data ?? (res as any);
    } catch (e) {
      console.error('Fetch contract detail error in PDF API:', e);
    }
  }

  try {
    const acaRes = await fetchWithAuth<any>('/hr/academy/party-info', {
      cache: 'no-store',
    });
    academyInfo = acaRes?.data ?? (acaRes as any);
  } catch (e) {
    console.error('Fetch academy info error in PDF API:', e);
  }

  const academyName = academyInfo?.name || '학원';
  const academyRep = academyInfo?.representative || '-';
  const academyBizNum = academyInfo?.businessNum || '-';
  const academyTel = academyInfo?.tel ? formatPhoneNumber(academyInfo.tel) : '-';
  const academyAddr = academyInfo
    ? `${academyInfo.address || ''} ${academyInfo.addressDetail || ''}`.trim()
    : '-';
  const rawSealUrl = academyInfo?.sealImageUrl || '';

  const API_BASE = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://xamfinity.n-e.kr';
  let sealDataUri = '';
  if (rawSealUrl) {
    if (rawSealUrl.startsWith('data:')) {
      sealDataUri = rawSealUrl;
    } else {
      const fullUrl = rawSealUrl.startsWith('http')
        ? rawSealUrl
        : `${API_BASE}${rawSealUrl.startsWith('/') ? '' : '/'}${rawSealUrl}`;
      try {
        const imgRes = await fetch(fullUrl);
        if (imgRes.ok) {
          const arrBuf = await imgRes.arrayBuffer();
          const contentType = imgRes.headers.get('content-type') || 'image/png';
          const base64 = Buffer.from(arrBuf).toString('base64');
          sealDataUri = `data:${contentType};base64,${base64}`;
        } else {
          sealDataUri = fullUrl;
        }
      } catch (err) {
        console.error('Failed to pre-fetch seal image to base64:', err);
        sealDataUri = fullUrl;
      }
    }
  }

  let signatureDataUri = '';
  if (contractId && (!detail?.status || detail?.status === 'SIGNED')) {
    try {
      const session = await auth();
      if (session?.accessToken) {
        const sigRes = await fetch(`${API_BASE}/hr/contract/${contractId}/signature-image`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          cache: 'no-store',
        });
        if (sigRes.ok) {
          const sigBuf = await sigRes.arrayBuffer();
          const sigContentType = sigRes.headers.get('content-type') || 'image/png';
          const sigBase64 = Buffer.from(sigBuf).toString('base64');
          signatureDataUri = `data:${sigContentType};base64,${sigBase64}`;
        }
      }
    } catch (e) {
      console.error('Fetch signature image error in PDF API:', e);
    }
  }

  const instructorName = detail?.pendingStaffName || fallbackName || '-';
  const instructorPhone = detail?.pendingStaffPhone
    ? formatPhoneNumber(detail.pendingStaffPhone)
    : '-';
  const instructorSubject = detail?.pendingStaffSubject || '-';
  const instructorAddress = detail?.pendingStaffAddress || '-';
  const contractStartDate = detail?.contractStartDate || '-';
  const contractEndDate = detail?.contractEndDate || '-';
  const probationMonths = detail?.probationPeriodMonths
    ? `${detail.probationPeriodMonths}개월`
    : '수습 없음';
  const paymentDay = detail?.paymentDay ? `${detail.paymentDay}일` : '10일';

  const contractType = detail?.contractType || '';
  const salaryType = detail ? SALARY_TYPE_MAP[detail.payType] || 'monthly' : 'monthly';
  const isHourly = salaryType === 'hourly';
  const isCommission = salaryType === 'commission';

  const daysConfig: Record<string, DailyScheduleInput> = {};
  if (detail?.schedule?.length) {
    detail.schedule.forEach((s) => {
      const dayName = DAY_KEY_MAP[s.dayOfWeek] || s.dayOfWeek;
      daysConfig[dayName] = {
        enabled: s.isEnabled,
        startTime: s.startTime ? s.startTime.slice(0, 5) : '09:00',
        endTime: s.endTime ? s.endTime.slice(0, 5) : '18:00',
        breakTime: `${s.breakMinutes}분`,
      };
    });
  }

  const rawHolidayDay = (detail as any)?.weeklyHolidayDay || 'SUN';
  const resolvedWeeklyHoliday = DAY_KEY_MAP[rawHolidayDay] || rawHolidayDay || '일요일';

  const employeeCount = academyInfo?.employedStaffCount;
  const isUnder5 =
    contractType.includes('5인 미만') ||
    contractType.includes('5인 이하') ||
    (employeeCount !== undefined && employeeCount < 5);
  const effectiveEmployeeCount = isUnder5 ? 4 : (employeeCount ?? 5);
  const isFiveOrMore = effectiveEmployeeCount >= 5;

  const { weeklyHours, weeklyOvertimeHours, weeklyNightHours } = calculateScheduleHours(daysConfig);

  const calculatedNonCompeteAmount = getEffectiveNonCompeteAmount({
    hasNonCompete: detail?.nonCompeteAgreed || false,
    calcType: 'manual',
    percent: 10,
    manualAmount: detail?.nonCompeteCompensationAmount || 0,
    salaryType,
    salaryAmount: detail?.basePay,
    hourlyRate: detail?.hourlyRate,
    minGuaranteeAmount: detail?.minGuaranteedAmount,
  });

  const wageResult = calculateWageEngine({
    salaryType,
    salaryAmount: detail?.basePay || 0,
    hourlyRate: detail?.hourlyRate || 0,
    commissionRate: detail?.ratioPercent || 0,
    minGuaranteeAmount: detail?.minGuaranteedAmount || 0,
    mealAllowance: detail?.nonTaxableMealAllowance || 0,
    positionAllowance: detail?.positionAllowance || 0,
    overtimeAllowance: detail?.overtimeAllowance || 0,
    otherAllowance: detail?.otherAllowance || 0,
    nonCompeteAmount: detail?.nonCompeteAgreed ? calculatedNonCompeteAmount : 0,
    weeklyHours,
    weeklyOvertimeHours,
    weeklyNightHours,
    employeeCount: effectiveEmployeeCount,
  });

  const totalMonthlyPay =
    wageResult.baseSalary +
    wageResult.weeklyHolidayPay +
    (detail?.nonTaxableMealAllowance || 0) +
    wageResult.overtimeAllowance +
    (detail?.positionAllowance || 0) +
    (detail?.otherAllowance || 0) +
    (detail?.nonCompeteAgreed ? calculatedNonCompeteAmount : 0);

  const scheduleRows = ALL_DAYS_ORDER.map((day) => {
    const conf = daysConfig[day];
    const isEnabled = conf?.enabled ?? false;
    const isWeeklyHoliday = !isEnabled && resolvedWeeklyHoliday === day;

    const statusBadge = isEnabled
      ? `<span class="badge-on">근무일 (ON)</span>`
      : isWeeklyHoliday
        ? `<span class="badge-holiday">유급 주휴일</span>`
        : `<span class="badge-off">무급 휴무일</span>`;

    const time = isEnabled ? `${conf.startTime} ~ ${conf.endTime}` : '-';
    const brk = isEnabled ? conf.breakTime : '-';

    return `<tr class="${isWeeklyHoliday ? 'row-holiday' : ''}">
      <td style="font-weight: 700;">${day}</td>
      <td>${statusBadge}</td>
      <td>${time}</td>
      <td>${brk}</td>
    </tr>`;
  }).join('');

  const specialTermsHtml = detail?.specialTerms?.length
    ? detail.specialTerms.map((t, idx) => `<p>${idx + 1}. ${t}</p>`).join('')
    : '<p>특약사항 없음</p>';

  const todayStr = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const fullHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    @page {
      size: A4;
      margin: 14mm 14mm 14mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", "Malgun Gothic", sans-serif;
    }
    body {
      background-color: #ffffff;
      color: #0f172a;
      line-height: 1.5;
      font-size: 11px;
    }
    .page-break {
      page-break-before: always;
      break-before: page;
    }
    .header-box {
      text-align: center;
      margin-bottom: 18px;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 10px;
    }
    .header-title {
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 2px;
      color: #0f172a;
    }
    .header-subtitle {
      font-size: 11px;
      color: #64748b;
      margin-top: 4px;
    }
    .section-header-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 14px;
      margin-bottom: 8px;
    }
    .section-header {
      font-size: 12px;
      font-weight: 800;
      color: #0f172a;
      border-left: 4px solid #0f172a;
      padding-left: 8px;
    }
    .holiday-badge {
      background-color: #eef2ff;
      color: #4338ca;
      border: 1px solid #c7d2fe;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 800;
    }
    .table-container {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
    }
    .table-container th, .table-container td {
      border: 1px solid #cbd5e1;
      padding: 5px 8px;
      text-align: center;
      font-size: 10.5px;
    }
    .table-container th {
      background-color: #f8fafc;
      font-weight: 800;
      color: #334155;
    }
    .badge-on {
      color: #047857;
      font-weight: 700;
    }
    .badge-holiday {
      color: #4338ca;
      font-weight: 800;
      text-decoration: underline;
    }
    .badge-off {
      color: #94a3b8;
      font-weight: 500;
    }
    .row-holiday {
      background-color: #f5f7ff;
    }
    .parties-grid {
      display: table;
      width: 100%;
      table-layout: fixed;
      margin-bottom: 14px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      overflow: hidden;
    }
    .party-box {
      display: table-cell;
      width: 50%;
      padding: 10px 12px;
      vertical-align: top;
    }
    .party-box:first-child {
      border-right: 1px solid #cbd5e1;
    }
    .party-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }
    .party-row {
      margin-bottom: 3px;
      font-size: 10.5px;
      display: flex;
    }
    .party-label {
      width: 65px;
      color: #64748b;
      font-weight: 500;
      display: inline-block;
    }
    .party-value {
      font-weight: 700;
      color: #1e293b;
    }
    .article-box {
      margin-bottom: 10px;
    }
    .article-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .article-desc {
      color: #334155;
      font-size: 10.5px;
      line-height: 1.45;
    }
    .bullet-list {
      padding-left: 16px;
      margin-top: 3px;
      color: #475569;
      font-size: 10.5px;
    }
    .bullet-list li {
      margin-bottom: 2px;
    }
    .special-terms-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 10px;
      margin-top: 4px;
      font-size: 10.5px;
      color: #334155;
      white-space: pre-wrap;
    }
    .signature-clause {
      margin-top: 18px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 10.5px;
      color: #334155;
      font-weight: 600;
    }
    .date-display {
      margin-top: 6px;
      font-size: 11.5px;
      font-weight: 800;
      color: #0f172a;
    }
    .sign-cards-grid {
      display: table;
      width: 100%;
      table-layout: fixed;
      margin-top: 12px;
    }
    .sign-card {
      display: table-cell;
      width: 50%;
      padding: 10px 12px;
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      vertical-align: top;
      position: relative;
      height: 130px;
    }
    .sign-card:first-child {
      margin-right: 10px;
    }
    .sign-card-title {
      font-size: 10px;
      font-weight: 800;
      color: #94a3b8;
      margin-bottom: 4px;
    }
    .sign-card-line {
      font-size: 10.5px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 2px;
    }
    .sign-card-desc {
      font-size: 10px;
      color: #64748b;
      margin-bottom: 6px;
    }
    .seal-box {
      position: absolute;
      right: 12px;
      bottom: 10px;
      height: 48px;
      width: 48px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .seal-circle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: 1px solid #cbd5e1;
      border-radius: 50%;
      background-color: #ffffff;
      font-weight: 800;
      color: #94a3b8;
      font-size: 11px;
    }
    .seal-img {
      display: inline-block;
      width: 48px;
      height: 48px;
      max-width: 48px;
      max-height: 48px;
      object-fit: contain;
    }
    .intro-text {
      font-size: 10.5px;
      font-weight: 600;
      color: #475569;
      margin-bottom: 12px;
    }
  </style>
</head>
<body>
  <div class="content">
    <!-- PAGE 1: Attachments (Schedule & Wage Details) -->
    <div class="header-box">
      <div class="header-title">【별 지】 상세 근로조건 및 임금산정 내역</div>
      <div class="header-subtitle">${instructorName} 강사님 근로계약 명세표</div>
    </div>

    <!-- 별지 1 -->
    <div class="section-header-wrap">
      <div class="section-header">【별지 1】 상세 근로시간표</div>
      <span class="holiday-badge">지정 유급주휴일: 매주 ${resolvedWeeklyHoliday}</span>
    </div>
    <table class="table-container">
      <thead>
        <tr>
          <th style="width: 20%;">요일</th>
          <th style="width: 25%;">근무 구분</th>
          <th style="width: 30%;">근무시간</th>
          <th style="width: 25%;">휴게시간</th>
        </tr>
      </thead>
      <tbody>
        ${scheduleRows}
      </tbody>
    </table>

    <!-- 별지 2 -->
    <div class="section-header-wrap">
      <div class="section-header">【별지 2】 상세 임금산정 내역</div>
    </div>
    <table class="table-container">
      <thead>
        <tr>
          <th style="width: 28%; text-align: left;">항목</th>
          <th style="width: 32%; text-align: right;">금액</th>
          <th style="width: 40%; text-align: left;">비고</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="font-weight: 700; text-align: left;">급여 산정 기준</td>
          <td style="font-weight: 800; text-align: right;">
            ${
              isCommission
                ? `매출의 ${detail?.ratioPercent || 20}%`
                : isHourly
                  ? `시급 ${(detail?.hourlyRate || 0).toLocaleString()}원`
                  : `총 지급 희망금액`
            }
          </td>
          <td style="text-align: left; color: #64748b;">
            ${isCommission ? '담당 수강료 기준' : isHourly ? '약정 시급 기준' : '월 고정급 기준'}
          </td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td colspan="3" style="font-weight: 800; text-align: left; color: #334155; padding-left: 8px;">
            최소 보장 내역
          </td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 14px;">기본급</td>
          <td style="font-weight: 700; text-align: right;">${wageResult.baseSalary.toLocaleString()}원</td>
          <td style="text-align: left; color: #64748b;">월 소정근로 대가</td>
        </tr>
        <tr>
          <td style="text-align: left; padding-left: 14px;">주휴수당</td>
          <td style="font-weight: 700; text-align: right;">${wageResult.weeklyHolidayPay.toLocaleString()}원</td>
          <td style="text-align: left; color: #64748b;">근로기준법 제55조 유급주휴 (매주 ${resolvedWeeklyHoliday})</td>
        </tr>
        ${
          (detail?.nonTaxableMealAllowance || 0) > 0
            ? `<tr>
            <td style="text-align: left; padding-left: 14px;">식대</td>
            <td style="font-weight: 700; text-align: right;">${(detail?.nonTaxableMealAllowance || 0).toLocaleString()}원</td>
            <td style="text-align: left; color: #047857; font-weight: 700;">비과세</td>
          </tr>`
            : ''
        }
        ${
          (detail?.positionAllowance || 0) > 0
            ? `<tr>
            <td style="text-align: left; padding-left: 14px;">직책수당</td>
            <td style="font-weight: 700; text-align: right;">${(detail?.positionAllowance || 0).toLocaleString()}원</td>
            <td style="text-align: left; color: #64748b;">직무 담당 수당</td>
          </tr>`
            : ''
        }
        ${
          wageResult.overtimeAllowance > 0
            ? `<tr>
            <td style="text-align: left; padding-left: 14px;">연장근로수당</td>
            <td style="font-weight: 700; text-align: right;">${(wageResult.overtimeAllowance || 0).toLocaleString()}원</td>
            <td style="text-align: left; color: #64748b;">포괄 연장 수당 (주 ${weeklyOvertimeHours}시간분)</td>
          </tr>`
            : ''
        }
        ${
          (detail?.otherAllowance || 0) > 0
            ? `<tr>
            <td style="text-align: left; padding-left: 14px;">${detail?.otherAllowanceLabel || '기타수당'}</td>
            <td style="font-weight: 700; text-align: right;">${(detail?.otherAllowance || 0).toLocaleString()}원</td>
            <td style="text-align: left; color: #64748b;">별도 약정 수당</td>
          </tr>`
            : ''
        }
        ${
          detail?.nonCompeteAgreed
            ? `<tr>
            <td style="text-align: left; padding-left: 14px;">경업금지 보상금</td>
            <td style="font-weight: 700; text-align: right;">${(calculatedNonCompeteAmount || 0).toLocaleString()}원</td>
            <td style="text-align: left; color: #64748b;">경업금지 약정 대가 (퇴직 후 ${detail.nonCompetePeriodMonths || 6}개월, ${detail.nonCompeteRadiusKm || 3}km)</td>
          </tr>`
            : ''
        }
        <tr style="background-color: #f1f5f9; font-weight: 800;">
          <td style="text-align: left;">월 총 지급 합계</td>
          <td style="text-align: right; color: #0f172a;">${(totalMonthlyPay || 0).toLocaleString()}원</td>
          <td style="text-align: left; color: #475569;">통상시급: ${(wageResult.ordinaryHourlyRate || 0).toLocaleString()}원 / 시</td>
        </tr>
      </tbody>
    </table>

    <!-- PAGE 2: Page Break & Contract Main -->
    <div class="page-break"></div>

    <div class="header-box">
      <div class="header-title">강 사 근 로 계 약 서</div>
    </div>

    <div class="intro-text">
      ${academyName}(이하 "갑"이라 한다)과 ${instructorName}(이하 "을"이라 한다)는 다음과 같이 근로계약을 체결한다.
    </div>

    <!-- 제1조 -->
    <div class="article-box">
      <div class="section-header" style="margin-top: 0; margin-bottom: 6px;">제1조 (계약 당사자)</div>
      <div class="parties-grid">
        <div class="party-box">
          <div class="party-title">갑 (사용자)</div>
          <div class="party-row"><span class="party-label">상호</span><span class="party-value">${academyName}</span></div>
          <div class="party-row"><span class="party-label">대표자</span><span class="party-value">${academyRep}</span></div>
          <div class="party-row"><span class="party-label">등록번호</span><span class="party-value">${academyBizNum}</span></div>
          <div class="party-row"><span class="party-label">연락처</span><span class="party-value">${academyTel}</span></div>
          <div class="party-row"><span class="party-label">주소</span><span class="party-value">${academyAddr}</span></div>
        </div>
        <div class="party-box">
          <div class="party-title">을 (근로자)</div>
          <div class="party-row"><span class="party-label">성명</span><span class="party-value">${instructorName}</span></div>
          <div class="party-row"><span class="party-label">연락처</span><span class="party-value">${instructorPhone}</span></div>
          <div class="party-row"><span class="party-label">담당과목</span><span class="party-value">${instructorSubject}</span></div>
          <div class="party-row"><span class="party-label">주소</span><span class="party-value">${instructorAddress}</span></div>
        </div>
      </div>
    </div>

    <!-- 제2조 -->
    <div class="article-box">
      <div class="article-title">제2조 (계약기간)</div>
      <div class="article-desc">① 본 계약의 기간은 <strong>${contractStartDate}</strong>부터 <strong>${contractEndDate}</strong>까지로 한다.</div>
      ${
        probationMonths && probationMonths !== '수습 없음'
          ? `<div class="article-desc">② 수습기간: 계약개시일로부터 <strong>${probationMonths}</strong>으로 하며, 수습기간 중 급여는 약정 급여의 100%를 동일하게 지급한다.</div>`
          : ''
      }
    </div>

    <!-- 제3조 -->
    <div class="article-box">
      <div class="article-title">제3조 (업무내용)</div>
      <div class="article-desc">을의 담당 업무는 다음과 같다.</div>
      <ul class="bullet-list">
        <li>담당 과목 및 업무: ${instructorSubject} 강의 및 학습 지도</li>
        <li>학원 내 수강생 관리, 성적 관리, 강의 자료 준비 및 부수되는 학원 행정 관리 업무</li>
      </ul>
    </div>

    <!-- 제4조 -->
    <div class="article-box">
      <div class="article-title">제4조 (근로시간)</div>
      <div class="article-desc">① 1주 소정근로시간은 <strong>${weeklyHours}시간</strong>으로 한다.</div>
      <div class="article-desc">② 요일별 상세 소정근로시간 및 출퇴근 시각은 별지 제1호(상세 근로시간표)에 명시된 바에 따른다.</div>
    </div>

    <!-- 제5조 -->
    <div class="article-box">
      <div class="article-title">제5조 (연장근로 및 연장근로수당)</div>
      <div class="article-desc">① 당사자 간 합의에 따라 1주 12시간 한도 내에서 연장근로를 실시할 수 있다.</div>
      <div class="article-desc">② 연장근로에 대하여 포괄연장근로수당으로 매월 <strong>${wageResult.overtimeAllowance.toLocaleString()}원</strong>을 지급한다.</div>
    </div>

    <!-- 제6조 -->
    <div class="article-box">
      <div class="article-title">제6조 (휴게시간)</div>
      <div class="article-desc">① 근로시간이 4시간인 경우 30분 이상, 8시간인 경우 1시간 이상의 휴게시간을 근로시간 도중에 부여한다.</div>
      <div class="article-desc">② 휴게시간은 근로자가 자유롭게 이용할 수 있으며 상세 배정은 별지 제1호에 따른다.</div>
    </div>

    <!-- 제7조 -->
    <div class="article-box">
      <div class="article-title">제7조 (임금 명세)</div>
      <div class="article-desc" style="font-weight: 800; color: #0f172a; margin-bottom: 2px;">
        총 지급 희망금액: ${numberToKoreanWon(totalMonthlyPay)}
      </div>
      <div class="article-desc">① 임금 지급일: 매월 <strong>${paymentDay}</strong> (지급일이 휴일인 경우 그 전일에 지급한다)</div>
      <div class="article-desc">② 을이 지정한 금융기관 계좌로 현금 입금 지급한다.</div>
      <div class="article-desc">③ 기본급, 주휴수당, 비과세 식대, 고정수당 등 상세 임금산정 내역은 별지 제2호에 따른다.</div>
      ${
        isCommission
          ? `<div class="article-desc">④ 비율제(수수료 <strong>${detail?.ratioPercent || 20}%</strong>) 정산 시: 당월 담당 수강료 매출 비율 정산액과 별지 제2호의 약정 최소보장액 중 더 큰 금액을 최종 지급한다.</div>`
          : ''
      }
    </div>

    <!-- 제8조 -->
    <div class="article-box">
      <div class="article-title">제8조 (휴일 및 휴가)</div>
      <div class="article-desc">① 유급주휴일: 매주 <strong>${resolvedWeeklyHoliday}</strong> (1주 소정근로일 개근 시 부여)</div>
      <div class="article-desc">② 근로자의 날(5월 1일)은 유급휴일로 처리한다.</div>
      ${
        isFiveOrMore
          ? `<div class="article-desc">③ 연차유급휴가는 근로기준법 제60조에 따라 부여한다.</div>`
          : ''
      }
    </div>

    <!-- 제9조 -->
    <div class="article-box">
      <div class="article-title">제9조 (퇴직급여)</div>
      <div class="article-desc">계속근로기간이 1년 이상이고 주 소정근로시간이 15시간 이상인 경우 근로자퇴직급여 보장법에 따라 퇴직급여를 지급한다.</div>
    </div>

    <!-- 제10조 -->
    <div class="article-box">
      <div class="article-title">제10조 (비밀유지)</div>
      <div class="article-desc">을은 재직 중 및 퇴직 후에도 강의 자료, 수강생 명단 및 개인정보, 영업비밀을 제3자에게 누설하거나 부당하게 활용할 수 없다.</div>
    </div>

    <!-- 제11조 -->
    ${
      detail?.nonCompeteAgreed
        ? `<div class="article-box">
        <div class="article-title">제11조 (경업금지 약정)</div>
        <div class="article-desc">① 을은 퇴직 후 <strong>${detail.nonCompetePeriodMonths || 6}개월</strong> 동안 <strong>반경 ${detail.nonCompeteRadiusKm || 3}km</strong> 범위 내에서 동일·유사 동종 경쟁 학원에 종사하거나 개원할 수 없다.</div>
        <div class="article-desc">② 갑은 경업금지 약정에 대한 대가로 매월 <strong>${calculatedNonCompeteAmount.toLocaleString()}원</strong>을 별도 지급하며, 상세 내역은 별지 제2호에 따른다.</div>
      </div>`
        : ''
    }

    <!-- 제12조 -->
    <div class="article-box">
      <div class="article-title">제12조 (손해배상)</div>
      <div class="article-desc">을이 무단 이탈, 고의 또는 중과실로 비밀유지의무나 경업금지 약정을 위반하여 갑에게 손해를 입힌 경우 손해를 배상할 책임을 진다.</div>
    </div>

    <!-- 제13조 -->
    <div class="article-box">
      <div class="article-title">제13조 (기타)</div>
      <div class="article-desc">본 계약서에 명시되지 아니한 사항은 근로기준법 및 관련 법령, 학원 관련 규정에 따른다.</div>
    </div>

    <!-- 제14조 -->
    <div class="article-box">
      <div class="article-title">제14조 (관할법원)</div>
      <div class="article-desc">본 계약과 관련하여 발생하는 소송의 관할법원은 갑의 학원 소재지 관할 법원으로 한다.</div>
    </div>

    <!-- 특약사항 -->
    <div class="article-box">
      <div class="article-title">【특약사항】</div>
      <div class="special-terms-box">${specialTermsHtml}</div>
    </div>

    <!-- 서명 란 -->
    <div class="signature-clause">
      위 계약을 증명하기 위하여 본 계약서 2부를 작성하여 갑과 을이 각각 서명 날인 후 1부씩 보관한다.
      <div class="date-display">${todayStr}</div>
    </div>

    <div class="sign-cards-grid">
      <div class="sign-card">
        <div class="sign-card-title">갑 (사용자)</div>
        <div class="sign-card-line">상호: ${academyName}</div>
        <div class="sign-card-line">대표자: ${academyRep}</div>
        ${academyBizNum && academyBizNum !== '-' ? `<div class="sign-card-desc">사업자등록번호: ${academyBizNum}</div>` : ''}
        <div class="sign-card-desc">주소: ${academyAddr}</div>
        <div class="seal-box">
          ${
            sealDataUri
              ? `<img src="${sealDataUri}" class="seal-img" alt="직인" />`
              : `<div class="seal-circle">인</div>`
          }
        </div>
      </div>

      <div class="sign-card">
        <div class="sign-card-title">을 (근로자)</div>
        <div class="sign-card-line">성명: ${instructorName}</div>
        <div class="sign-card-desc">주소: ${instructorAddress}</div>
        <div class="seal-box">
          ${
            signatureDataUri
              ? `<img src="${signatureDataUri}" class="seal-img" alt="서명" />`
              : `<div class="seal-circle">인</div>`
          }
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    });

    await browser.close();

    const asciiFilename = 'contract.pdf';
    const utf8Filename = encodeURIComponent(`${instructorName}_표준근로계약서.pdf`);

    return new NextResponse(Uint8Array.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${asciiFilename}"; filename*=UTF-8''${utf8Filename}`,
      },
    });
  } catch (error) {
    console.error('PDF generation failed:', error);
    return NextResponse.json({ message: 'PDF 생성에 실패했습니다.' }, { status: 500 });
  }
}
