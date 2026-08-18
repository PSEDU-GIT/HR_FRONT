'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import cx from 'classnames';

export default function LoginFormAction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }
    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await signIn('credentials', {
        id: email.trim(),
        email: email.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage('이메일 또는 비밀번호를 다시 확인해주세요.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setErrorMessage('로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400">
          {errorMessage}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-text-main text-xs font-semibold" htmlFor="login-email">
          이메일
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@academy.com"
          disabled={isLoading}
          className="border-custom-slate-border text-text-main placeholder:text-text-side bg-background focus:border-custom-indigo block h-11 w-full rounded-xl border px-3.5 text-xs font-medium transition-colors outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-text-main text-xs font-semibold" htmlFor="login-password">
            비밀번호
          </label>
        </div>
        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            disabled={isLoading}
            className="border-custom-slate-border text-text-main placeholder:text-text-side bg-background focus:border-custom-indigo block h-11 w-full rounded-xl border pr-10 pl-3.5 text-xs font-medium transition-colors outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-text-side hover:text-text-main absolute inset-y-0 right-0 flex items-center pr-3 transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cx(
          'bg-custom-indigo hover:bg-custom-indigo-hover flex h-11 w-full cursor-pointer items-center justify-center rounded-xl text-xs font-bold text-white transition-all active:scale-[0.99]',
          isLoading && 'cursor-not-allowed opacity-70',
        )}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>로그인</span>}
      </button>
    </form>
  );
}
