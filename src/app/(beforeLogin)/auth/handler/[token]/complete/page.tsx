import { CheckCircle2 } from 'lucide-react';
import StepGuardAction from '../_action/StepGuard.action';
import ClickGoToMyPageAction from './_action/ClickGoToMyPage.action';

interface CompletePageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ name?: string; phone?: string }>;
}

export default async function CompletePage({ params, searchParams }: CompletePageProps) {
  const { token } = await params;
  const { name = '', phone = '' } = await searchParams;

  const maskedPhone =
    phone.length >= 10 ? `${phone.slice(0, 3)}-****-${phone.slice(-4)}` : phone;

  return (
    <main className="px-5 pt-12 pb-32">
      <StepGuardAction requiredStep={4} token={token} name={name} phone={phone} />

      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="border-custom-emerald-border/30 bg-custom-emerald-bg flex h-16 w-16 items-center justify-center rounded-2xl border">
          <CheckCircle2 className="text-custom-emerald h-8 w-8" strokeWidth={2.2} />
        </div>

        <div className="space-y-2">
          <h1 className="text-text-title text-xl font-bold tracking-tight">
            전자계약 체결 완료
          </h1>
          <p className="text-text-sub text-xs font-normal leading-relaxed">
            전자근로계약서 서명이 성공적으로 제출되었습니다.
            <br />
            자세한 계약서 전문 및 체결 내역은{' '}
            <strong className="text-text-title font-bold">마이페이지</strong>
            에서 언제든지 확인하실 수 있습니다.
          </p>
        </div>

        <div className="border-custom-slate-border bg-custom-slate-bg mt-6 w-full space-y-2 rounded-xl border p-4 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-side font-medium">강사명</span>
            <span className="text-text-title font-semibold">{name || '강사'}</span>
          </div>
          {phone && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-side font-medium">연락처</span>
              <span className="text-text-title font-semibold">{maskedPhone}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-side font-medium">체결 상태</span>
            <span className="text-custom-emerald font-bold">전자서명 제출 완료</span>
          </div>
        </div>
      </div>

      <ClickGoToMyPageAction />
    </main>
  );
}
