'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Sparkles, Loader2 } from 'lucide-react';
import cx from 'classnames';

export default function QuickDemoLoginAction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        id: 'jiji_ha@hanmail.net',
        email: 'jiji_ha@hanmail.net',
        password: '123450',
        redirect: false,
      });

      if (!res?.error) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error('체험 계정 로그인 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDemoLogin}
      disabled={isLoading}
      className={cx(
        'border-custom-indigo-border bg-custom-indigo-bg/60 hover:bg-custom-indigo-bg text-custom-indigo flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-all active:scale-[0.99]',
        isLoading && 'cursor-not-allowed opacity-70',
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>데모 계정 접속 중...</span>
        </>
      ) : (
        <>
          <Sparkles className="h-3.5 w-3.5" />
          <span>데모 관리자 계정으로 1초 로그인</span>
        </>
      )}
    </button>
  );
}
