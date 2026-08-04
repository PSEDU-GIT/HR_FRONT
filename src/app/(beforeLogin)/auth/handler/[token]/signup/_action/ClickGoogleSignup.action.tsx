'use client';

import { signIn } from 'next-auth/react';

interface ClickGoogleSignupActionProps {
  token: string;
  name: string;
  phone: string;
  disabled?: boolean;
}

export default function ClickGoogleSignupAction({
  token,
  name,
  phone,
  disabled,
}: ClickGoogleSignupActionProps) {
  const handleGoogleSignup = async () => {
    await signIn('google', {
      callbackUrl: `/auth/handler/${token}/signup?name=${encodeURIComponent(name)}&phone=${phone}`,
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignup}
      disabled={disabled}
      className="border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border bg-white px-4 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 disabled:opacity-50"
    >
      Google 계정으로 가입하기
    </button>
  );
}
