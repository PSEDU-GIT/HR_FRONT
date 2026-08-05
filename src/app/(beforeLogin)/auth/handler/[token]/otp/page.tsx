import StepGuardAction from '../_action/StepGuard.action';
import ConfirmOtpAction from './_action/ConfirmOtp.action';

interface OtpPageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ name?: string; phone?: string }>;
}

export default async function OtpPage({ params, searchParams }: OtpPageProps) {
  const { token } = await params;
  const { name = '', phone = '' } = await searchParams;

  const maskedPhone =
    phone.length >= 10 ? `${phone.slice(0, 3)}-****-${phone.slice(-4)}` : phone;

  return (
    <main className="px-5 pt-8 pb-32">
      <StepGuardAction requiredStep={2} token={token} name={name} phone={phone} />
      <div className="space-y-2">
        <h1 className="text-text-title text-xl font-bold leading-snug tracking-tight dark:text-slate-100">
          인증번호 입력
        </h1>
        <p className="text-text-sub text-xs font-normal leading-relaxed dark:text-slate-400">
          {name ? `${name} 강사님의 ` : ''}휴대폰 번호({maskedPhone})로 발송된 인증번호를 입력해 주세요.
        </p>
      </div>

      <div className="mt-6">
        <ConfirmOtpAction token={token} name={name} phone={phone} />
      </div>
    </main>
  );
}
