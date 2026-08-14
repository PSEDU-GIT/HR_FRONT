import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { type ContractDetailResponse } from '@/app/(afterLogin)/cabinet/_model/ContractDetail.model';

const DAY_NAME_MAP: Record<string, string> = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const contractId = searchParams.get('contractId');
  const fallbackName = searchParams.get('name') || '이지은';
  const title = searchParams.get('title') || '표준 근로계약서';

  let detail: ContractDetailResponse | null = null;

  if (contractId) {
    try {
      const host = request.headers.get('host') || 'localhost:3001';
      const protocol = request.headers.get('x-forwarded-proto') || 'http';
      const res = await fetch(`${protocol}://${host}/api/hr/contract/${contractId}`, {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const json = await res.json();
        detail = json?.data ?? json;
      }
    } catch (e) {
      console.error('Fetch contract detail error in PDF API:', e);
    }
  }

  const instructorName = detail?.pendingStaffName || fallbackName || '-';
  const instructorPhone = detail?.pendingStaffPhone || '-';
  const instructorSubject = detail?.pendingStaffSubject || '-';
  const instructorAddress = detail?.pendingStaffAddress || '-';
  const contractStartDate = detail?.contractStartDate || '-';
  const contractEndDate = detail?.contractEndDate || '-';
  const probationMonths = detail?.probationPeriodMonths
    ? `${detail.probationPeriodMonths}개월`
    : '-';
  const paymentDay = detail?.paymentDay ? `${detail.paymentDay}일` : '-';

  let salaryDisplay = '-';
  let salaryDetailAmount = '-';

  if (detail) {
    if (detail.payType === 'HOURLY' || (detail.hourlyRate && detail.hourlyRate > 0)) {
      const rate = detail.hourlyRate ? detail.hourlyRate.toLocaleString() : '0';
      salaryDisplay = `시급제: ${rate}원`;
      salaryDetailAmount = `${rate}원/시`;
    } else if (detail.payType === 'RATIO' || (detail.ratioPercent && detail.ratioPercent > 0)) {
      const ratio = detail.ratioPercent || 0;
      const minG = detail.minGuaranteedAmount ? detail.minGuaranteedAmount.toLocaleString() : '0';
      salaryDisplay = `비율제: 수수료율 ${ratio}% (최소 보장: ${minG}원)`;
      salaryDetailAmount = `${ratio}%`;
    } else if (detail.basePay !== undefined) {
      const pay = detail.basePay.toLocaleString();
      salaryDisplay = `고정급 (월급제): ${pay}원`;
      salaryDetailAmount = `${pay}원/월`;
    }
  }

  // 별지 1 Schedule Rows
  const enabledSchedule = (detail?.schedule || []).filter((s) => s.isEnabled);
  let scheduleRowsHtml = '';
  if (enabledSchedule.length > 0) {
    scheduleRowsHtml = enabledSchedule
      .map(
        (s) => `
      <tr>
        <td style="font-weight: 700;">${DAY_NAME_MAP[s.dayOfWeek] || s.dayOfWeek}</td>
        <td>${s.startTime.slice(0, 5)} ~ ${s.endTime.slice(0, 5)} (휴게 ${s.breakMinutes}분)</td>
      </tr>
    `,
      )
      .join('');
  } else {
    scheduleRowsHtml = `
      <tr>
        <td colSpan="2" class="text-center" style="color: #94a3b8; padding: 14px;">
          설정된 근로요일이 없습니다.
        </td>
      </tr>
    `;
  }

  // 특약사항
  const specialTermsHtml =
    detail?.specialTerms && detail.specialTerms.length > 0
      ? detail.specialTerms.join('\n')
      : '특약사항 없음';

  const fullHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @page { size: A4; margin: 12mm; }
    * { box-sizing: border-box; }
    body {
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #334155;
      margin: 0;
      padding: 0;
      background: #fff;
      font-size: 11px;
      line-height: 1.6;
    }
    .document-box {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 16px;
      background: #ffffff;
    }
    .page-break {
      page-break-before: always;
      break-before: page;
    }
    .intro-text {
      font-size: 12px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 24px;
      line-height: 1.5;
    }
    .section-header {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 10px;
      margin-bottom: 8px;
    }
    .custom-table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      margin-bottom: 20px;
      font-size: 11px;
    }
    .custom-table th {
      background-color: #f8fafc;
      color: #334155;
      font-weight: 800;
      padding: 10px 12px;
      border-bottom: 1px solid #e2e8f0;
      text-align: left;
    }
    .custom-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .highlight-indigo {
      color: #4f46e5;
      font-weight: 800;
    }
    .parties-grid {
      display: flex;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .party-box {
      flex: 1;
      padding: 16px;
      background: #ffffff;
    }
    .party-box + .party-box {
      border-left: 1px solid #e2e8f0;
    }
    .party-title {
      font-size: 12px;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    .party-row {
      display: flex;
      font-size: 11px;
      margin-bottom: 6px;
    }
    .party-label {
      width: 70px;
      color: #94a3b8;
      font-weight: 500;
    }
    .party-value {
      flex: 1;
      color: #1e293b;
      font-weight: 700;
    }
    .article-box {
      margin-bottom: 16px;
    }
    .article-title {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .article-desc {
      font-size: 11px;
      font-weight: 500;
      color: #334155;
      margin: 2px 0;
    }
    .bullet-list {
      list-style-type: disc;
      padding-left: 18px;
      margin: 4px 0;
      color: #475569;
      font-weight: 500;
    }
    .terms-box {
      background-color: rgba(248, 250, 252, 0.8);
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px;
      font-weight: 500;
      color: #1e293b;
      white-space: pre-wrap;
      margin-top: 6px;
    }
    .signature-clause {
      border-top: 1px solid #f1f5f9;
      padding-top: 16px;
      margin-top: 24px;
      text-align: center;
      font-weight: 600;
      color: #334155;
    }
    .date-display {
      margin-top: 12px;
      font-size: 13px;
      font-weight: 800;
      color: #1e293b;
    }
    .sign-cards-grid {
      display: flex;
      gap: 16px;
      margin-top: 20px;
    }
    .sign-card {
      flex: 1;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: rgba(248, 250, 252, 0.4);
      padding: 16px;
    }
    .sign-card-title {
      font-size: 10px;
      font-weight: 800;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .sign-card-line {
      font-size: 11px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 4px;
    }
    .sign-card-desc {
      font-size: 11px;
      font-weight: 500;
      color: #475569;
    }
    .seal-box {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
    .seal-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="document-box">
    <!-- PAGE 1: 별지 1 & 별지 2 -->
    <div class="article-box">
      <div class="section-header">【 별지 1 】 상세 근로시간표</div>
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 100px;">요일</th>
            <th>근무시간</th>
          </tr>
        </thead>
        <tbody>
          ${scheduleRowsHtml}
        </tbody>
      </table>
    </div>

    <div class="article-box">
      <div class="section-header">【 별지 2 】 상세 임금산정 내역</div>
      <table class="custom-table">
        <thead>
          <tr>
            <th>항목</th>
            <th class="text-right" style="width: 150px;">금액</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: 700;">약정 급여 조건</td>
            <td class="text-right">${salaryDetailAmount}</td>
            <td style="color: #64748b;">약정된 급여 산정 방식</td>
          </tr>
          <tr style="background: rgba(248, 250, 252, 0.5);">
            <td style="font-weight: 800; color: #0f172a;">지급일</td>
            <td class="text-right highlight-indigo">매월 ${paymentDay}</td>
            <td class="highlight-indigo">근로자 지정 계좌로 정기 지급</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGE 2: Page Break & Contract Main -->
    <div class="page-break"></div>

    <div class="intro-text" style="margin-top: 10px;">
      목동 학온 캠퍼스(이하 "갑"이라 한다)과 ${instructorName}(이하 "을"이라 한다)는 다음과 같이 근로계약을 체결한다.
    </div>

    <!-- 제1조 -->
    <div class="article-box">
      <div class="section-header">제1조 (계약 당사자)</div>
      <div class="parties-grid">
        <div class="party-box">
          <div class="party-title">갑 (사용자)</div>
          <div class="party-row"><span class="party-label">상호</span><span class="party-value">목동 학온 캠퍼스</span></div>
          <div class="party-row"><span class="party-label">대표자</span><span class="party-value">이학온</span></div>
          <div class="party-row"><span class="party-label">등록번호</span><span class="party-value">105-13-98765</span></div>
          <div class="party-row"><span class="party-label">연락처</span><span class="party-value">02-2644-5678</span></div>
          <div class="party-row"><span class="party-label">주소</span><span class="party-value">서울특별시 양천구 목동서로 201 학온빌딩 5층</span></div>
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
      <div class="article-desc">① 본 계약의 기간은 ${contractStartDate}부터 ${contractEndDate}까지로 한다.</div>
      <div class="article-desc">② 수습기간: 계약개시일로부터 ${probationMonths}</div>
    </div>

    <!-- 제3조 -->
    <div class="article-box">
      <div class="article-title">제3조 (업무내용)</div>
      <div class="article-desc">을의 담당 업무는 다음과 같다.</div>
      <ul class="bullet-list">
        <li>담당 과목: ${instructorSubject}</li>
        <li>갑이 지시하는 교육 및 강의 관련 업무</li>
      </ul>
    </div>

    <!-- 제4조 -->
    <div class="article-box">
      <div class="article-title">제4조 (근로시간)</div>
      <div class="article-desc">① 소정근로시간 및 휴게시간의 상세 사항은 별지 제1호에 따른다.</div>
      <div class="article-desc">② 1주 소정근로시간은 설정된 근로일정에 따르며, 1일 근로시간을 준수한다.</div>
    </div>

    <!-- 제5조 -->
    <div class="article-box">
      <div class="article-title">제5조 (휴게시간)</div>
      <div class="article-desc">① 4시간 이상 근로하는 경우 30분 이상, 8시간 이상 근로하는 경우 1시간 이상의 휴게시간을 부여한다.</div>
      <div class="article-desc">② 휴게시간은 근로시간 도중에 자유롭게 이용할 수 있다.</div>
    </div>

    <!-- 제6조 -->
    <div class="article-box">
      <div class="article-title">제6조 (임금)</div>
      <div class="article-desc" style="font-weight: 700; color: #1e293b;">${salaryDisplay}</div>
      <div class="article-desc">① 급여 지급일: 매월 ${paymentDay}</div>
      <div class="article-desc">② 을이 지정한 금융기관 계좌로 이체하여 지급한다.</div>
      <div class="article-desc">③ 상세 항목 및 산정 내역은 별지 제2호에 따른다.</div>
    </div>

    <!-- 제7조 -->
    <div class="article-box">
      <div class="article-title">제7조 (휴일 및 휴가)</div>
      <div class="article-desc">① 주휴일: 매주 일요일</div>
      <div class="article-desc">② 연차유급휴가는 근로기준법에 따라 부여한다.</div>
    </div>

    <!-- 제8조 -->
    <div class="article-box">
      <div class="article-title">제8조 (퇴직급여)</div>
      <div class="article-desc">① 계속근로기간이 1년 이상인 경우, 퇴직일로부터 14일 이내에 퇴직급여를 지급한다.</div>
    </div>

    <!-- 특약사항 -->
    <div class="article-box">
      <div class="article-title">【특약사항】</div>
      <div class="terms-box">${specialTermsHtml}</div>
    </div>

    <!-- 서명 란 -->
    <div class="signature-clause">
      위 계약을 증명하기 위하여 본 계약서 2부를 작성하여 갑과 을이 각각 서명 날인 후 1부씩 보관한다.
      <div class="date-display">2026년 7월 22일</div>
    </div>

    <div class="sign-cards-grid">
      <div class="sign-card">
        <div class="sign-card-title">갑 (사용자)</div>
        <div class="sign-card-line">상호: 목동 학온 캠퍼스</div>
        <div class="sign-card-line">대표자: 이학온</div>
        <div class="sign-card-desc">주소: 서울특별시 양천구 목동서로 201 학온빌딩 5층</div>
        <div class="seal-box">
          <div class="seal-circle">인</div>
        </div>
      </div>

      <div class="sign-card">
        <div class="sign-card-title">을 (근로자)</div>
        <div class="sign-card-line">성명: ${instructorName}</div>
        <div class="sign-card-desc">주소: ${instructorAddress}</div>
        <div class="seal-box">
          <div class="seal-circle">인</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    });

    await browser.close();

    const filename = encodeURIComponent(`${instructorName}_표준근로계약서.pdf`);

    return new NextResponse(Uint8Array.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${filename}`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error('Puppeteer PDF generation failed:', err);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
