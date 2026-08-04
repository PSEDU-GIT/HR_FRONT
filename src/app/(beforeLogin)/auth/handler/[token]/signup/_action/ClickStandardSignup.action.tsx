'use client';

interface ClickStandardSignupActionProps {
  token: string;
  name: string;
  phone: string;
  disabled?: boolean;
}

export default function ClickStandardSignupAction({
  token,
  name,
  phone,
  disabled,
}: ClickStandardSignupActionProps) {
  const handleStandardSignup = () => {
    const baseUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://hakon.co.kr';
    const signupUrl = `${baseUrl}/auth/verification/send-confirm?token=${token}&name=${encodeURIComponent(name)}&phone=${phone}`;
    window.location.href = signupUrl;
  };

  return (
    <button
      type="button"
      onClick={handleStandardSignup}
      disabled={disabled}
      className="border-custom-slate-border text-text-sub bg-custom-slate-bg hover:bg-custom-slate-hover flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border px-4 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 disabled:opacity-50"
    >
      일반 회원가입으로 진행하기
    </button>
  );
}
