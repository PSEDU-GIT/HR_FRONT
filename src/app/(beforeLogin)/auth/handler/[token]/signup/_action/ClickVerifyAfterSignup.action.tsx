'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import cx from 'classnames';
import { useAlert } from '@/app/(afterLogin)/_state/useAlert';
import { setTokenSession } from '../../_lib/tokenSessionStorage';
import { useTokenHandlerStore } from '../../_state/useTokenHandlerStore';
import { verifyViaSignup } from '../_lib/verifyViaSignup';

interface ClickVerifyAfterSignupActionProps {
  token: string;
  name: string;
  phone: string;
}

export default function ClickVerifyAfterSignupAction({
  token,
  name,
  phone,
}: ClickVerifyAfterSignupActionProps) {
  const router = useRouter();
  const { handleAlert } = useAlert();

  const setStep = useTokenHandlerStore((state: any) => state.setStep);
  const [isPending, startTransition] = useTransition();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyAfterSignup = async () => {
    try {
      setIsVerifying(true);
      await verifyViaSignup({ token, name, phone });

      setStep(3);
      setTokenSession(token, { step: 3, name, phone });

      startTransition(() => {
        router.push(
          `/auth/handler/${token}/contract?name=${encodeURIComponent(name)}&phone=${phone}`,
        );
      });
    } catch (err: any) {
      console.error('회원가입 세션 인증 실패:', err); handleAlert({ type:'error',
        title: '인증 처리 실패',
        description:
          err.message || '인증 처리에 실패했습니다. 회원가입 완료 후 다시 시도해 주세요.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const isDisabled = isVerifying || isPending;

  return (
    <div className="border-custom-slate-border bg-background fixed inset-x-0 bottom-0 z-50 border-t p-4">
      <div className="mx-auto max-w-md">
      <button
        type="button"
        onClick={handleVerifyAfterSignup}
        disabled={isDisabled}
        className={cx(
          'bg-custom-indigo hover:bg-custom-indigo-hover flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-xs font-semibold text-white disabled:opacity-50',
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
  );
}
