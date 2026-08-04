'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import cx from 'classnames';
import { confirmOtp } from '../_lib/otpService';

interface ClickConfirmOtpActionProps {
  token: string;
  name: string;
  phone: string;
  otpCode: string;
  disabled?: boolean;
}

export default function ClickConfirmOtpAction({
  token,
  name,
  phone,
  otpCode,
  disabled,
}: ClickConfirmOtpActionProps) {
  const router = useRouter();
  const cleanOtp = otpCode.trim();
  const isValidOtp = cleanOtp.length >= 4;

  const { mutate: handleConfirmOtp, isPending } = useMutation({
    mutationKey: ['confirm-otp', token],
    mutationFn: () => confirmOtp({ token, code: cleanOtp }),
    onSuccess: () => {
      router.push(
        `/auth/handler/${token}/contract?name=${encodeURIComponent(name)}&phone=${phone}`,
      );
    },
    onError: (err: any) => {
      console.error('OTP 인증 실패:', err);
      alert(err.message || '인증번호 확인 중 오류가 발생했습니다.');
    },
  });

  const handleClick = () => {
    if (!cleanOtp || cleanOtp.length < 4) {
      alert('인증번호를 올바르게 입력해 주세요.');
      return;
    }
    handleConfirmOtp();
  };

  const isDisabled = disabled || isPending;

  return (
    <div className="border-custom-slate-border fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-md">
        <button
          type="button"
          onClick={handleClick}
          disabled={isDisabled || !isValidOtp}
          className={cx(
            'flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition-colors',
            isValidOtp && !isDisabled
              ? 'bg-custom-indigo hover:bg-custom-indigo-hover text-white'
              : 'bg-custom-slate-bg text-text-side border-custom-slate-border cursor-not-allowed border dark:bg-slate-800 dark:text-slate-600',
          )}
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>다음</span>}
        </button>
      </div>
    </div>
  );
}
