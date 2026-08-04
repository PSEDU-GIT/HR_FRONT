'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import cx from 'classnames';
import { verifyViaSignup } from '../_lib/verifyViaSignup';

interface VerifyViaSignupActionProps {
  token: string;
  name: string;
  phone: string;
}

export default function VerifyViaSignupAction({ token, name, phone }: VerifyViaSignupActionProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleGoogleSignup = async () => {
    await signIn('google', {
      callbackUrl: `/auth/handler/${token}/signup?name=${encodeURIComponent(name)}&phone=${phone}`,
    });
  };

  const handleStandardSignup = () => {
    const baseUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://hakon.co.kr';
    const signupUrl = `${baseUrl}/auth/verification/send-confirm?token=${token}&name=${encodeURIComponent(name)}&phone=${phone}`;
    window.location.href = signupUrl;
  };

  const handleVerifyAfterSignup = async () => {
    try {
      setIsVerifying(true);
      await verifyViaSignup({ token });

      startTransition(() => {
        router.push(`/auth/handler/${token}/contract?name=${encodeURIComponent(name)}&phone=${phone}`);
      });
    } catch (err: any) {
      console.error('회원가입 세션 인증 실패:', err);
      alert(err.message || '인증 처리에 실패했습니다. 회원가입 완료 후 다시 시도해 주세요.');
    } finally {
      setIsVerifying(false);
    }
  };

  const isDisabled = isVerifying || isPending;

  return (
    <div className="space-y-3">
      {/* Google Fast Signup Button */}
      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={isDisabled}
        className="border-custom-slate-border text-text-main hover:bg-custom-slate-bg flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border bg-white px-4 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
      >
        Google 계정으로 가입하기
      </button>

      {/* Standard Email / Phone Signup Button */}
      <button
        type="button"
        onClick={handleStandardSignup}
        disabled={isDisabled}
        className="border-custom-slate-border text-text-sub bg-custom-slate-bg hover:bg-custom-slate-hover flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border px-4 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
      >
        일반 회원가입으로 진행하기
      </button>

      {/* Fixed Bottom Action Bar */}
      <div className="border-custom-slate-border fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={handleVerifyAfterSignup}
            disabled={isDisabled}
            className={cx(
              'flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-custom-indigo text-xs font-semibold text-white hover:bg-custom-indigo-hover disabled:opacity-50',
            )}
          >
            {isDisabled ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span>가입 완료 후 계약서 열기</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
