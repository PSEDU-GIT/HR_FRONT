'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAlert } from '@/app/(afterLogin)/_state/useAlert';
import { requestOtp } from '../_lib/otpService';
import ClickConfirmOtpAction from './ClickConfirmOtp.action';

interface ConfirmOtpActionProps {
  token: string;
  name: string;
  phone: string;
}

export default function ConfirmOtpAction({ token, name, phone }: ConfirmOtpActionProps) {
  const { handleAlert } = useAlert();

  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(180);
  const [resendMessage, setResendMessage] = useState('');

  const { mutate: handleRequestOtp, isPending: isRequesting } = useMutation({
    mutationKey: ['request-otp', token],
    mutationFn: () => requestOtp({ token, name, phone }),
    onSuccess: () => {
      setTimer(180);
      setResendMessage('인증번호가 발송되었습니다.');
    },
    onError: (err: any) => {
      console.error('OTP 요청 실패:', err);
      handleAlert({
        type: 'error',
        title: '인증번호 발송 실패',
        description: err.message || '인증번호 발송에 실패했습니다.',
      });
    },
  });

  useEffect(() => {
    handleRequestOtp();
  }, [token, name, phone]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleResendOtp = () => {
    setResendMessage('');
    handleRequestOtp();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-text-main block text-xs font-medium dark:text-slate-300">
            인증번호 (6자리)
          </label>
          <span className="text-custom-indigo text-xs font-bold">
            남은 시간 {formatTimer(timer)}
          </span>
        </div>

        <input
          type="tel"
          inputMode="numeric"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="인증번호 입력"
          maxLength={6}
          disabled={isRequesting}
          className="border-custom-slate-border text-text-title placeholder:text-text-side focus:border-custom-indigo h-12 w-full rounded-lg border bg-white px-3.5 text-center text-lg font-bold tracking-widest focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
        />

        <div className="flex items-center justify-between pt-1 text-xs">
          {resendMessage ? (
            <span className="text-text-main font-medium dark:text-slate-300">{resendMessage}</span>
          ) : (
            <span className="text-text-side">인증번호가 도착하지 않았나요?</span>
          )}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isRequesting}
            className="text-custom-indigo font-bold underline disabled:opacity-50"
          >
            재발송
          </button>
        </div>
      </div>

      <ClickConfirmOtpAction
        token={token}
        name={name}
        phone={phone}
        otpCode={otpCode}
        disabled={isRequesting}
      />
    </div>
  );
}
