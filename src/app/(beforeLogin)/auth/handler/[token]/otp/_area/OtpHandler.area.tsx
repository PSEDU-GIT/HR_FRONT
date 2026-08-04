import ConfirmOtpAction from '../_action/ConfirmOtp.action';

interface OtpHandlerAreaProps {
  token: string;
  name: string;
  phone: string;
}

export default function OtpHandlerArea({ token, name, phone }: OtpHandlerAreaProps) {
  const maskedPhone = phone.length >= 10
    ? `${phone.slice(0, 3)}-****-${phone.slice(-4)}`
    : phone;

  return (
    <main className="px-5 pt-8 pb-32">
      <div className="space-y-2">
        <h1 className="text-xl font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-100">
          인증번호 입력
        </h1>
        <p className="text-xs font-normal leading-relaxed text-slate-500 dark:text-slate-400">
          {name ? `${name} 강사님의 ` : ''}휴대폰 번호({maskedPhone})로 발송된 인증번호를 입력해 주세요.
        </p>
      </div>

      <div className="mt-6">
        <ConfirmOtpAction token={token} name={name} phone={phone} />
      </div>
    </main>
  );
}
