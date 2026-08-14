'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { LogIn } from 'lucide-react';
import cx from 'classnames';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('credentials', {
        id: 'jiji_ha@hanmail.net',
        email: 'jiji_ha@hanmail.net',
        password: '123450',
        callbackUrl: '/wizard/step1',
      });
    } catch (error) {
      console.error('로그인 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-900 p-4 font-sans">
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative w-full max-w-md space-y-6 rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">팀시스템 HR 로그인</h1>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
          className={cx(
            'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white shadow-lg transition-all',
            isLoading
              ? 'cursor-not-allowed bg-indigo-400'
              : 'bg-indigo-600 shadow-indigo-500/25 hover:bg-indigo-700 active:scale-[0.99]',
          )}
        >
          <LogIn className="h-4 w-4" />
          <span>{isLoading ? '로그인 중...' : '관리자 계정으로 로그인'}</span>
        </button>
      </div>
    </main>
  );
}
