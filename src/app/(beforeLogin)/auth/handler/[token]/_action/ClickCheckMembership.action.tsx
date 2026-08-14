'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { Loader2 } from 'lucide-react';
import cx from 'classnames';
import { useAlert } from '@/app/(afterLogin)/_state/useAlert';
import { setTokenSession } from '../_lib/tokenSessionStorage';
import { useTokenHandlerStore } from '../_state/useTokenHandlerStore';
import { checkMembership } from '../_lib/checkMembership';

interface ClickCheckMembershipActionProps {
  token: string;
}

export default function ClickCheckMembershipAction({ token }: ClickCheckMembershipActionProps) {
  const router = useRouter();
  const { handleAlert } = useAlert();
  const { name, phone, setCheckResult, setStep } = useTokenHandlerStore(
    useShallow((state: any) => ({
      name: state.name,
      phone: state.phone,
      setCheckResult: state.setCheckResult,
      setStep: state.setStep,
    })),
  );

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const isFormValid = name.trim().length > 0 && cleanPhone.length >= 10;

  const { mutate: handleCheckMembership, isPending } = useMutation({
    mutationKey: ['check-membership', token],
    mutationFn: () => checkMembership({ token, name, phone: cleanPhone }),
    onSuccess: (res) => {
      setCheckResult(res.data);
      setStep(2);
      setTokenSession(token, { step: 2, name, phone: cleanPhone });

      const isMember =
        res.data?.isMember === true || res.data?.member === true || res.data?.isRegistered === true;

      if (isMember) {
        router.push(
          `/auth/handler/${token}/otp?name=${encodeURIComponent(name)}&phone=${cleanPhone}`,
        );
      } else {
        router.push(
          `/auth/handler/${token}/signup?name=${encodeURIComponent(name)}&phone=${cleanPhone}`,
        );
      }
    },
    onError: (err: any) => {
      console.error('회원 여부 확인 실패:', err); handleAlert({ type:'error',
        title: '본인 확인',
        description: err.message || '확인 과정 중 오류가 발생했습니다.',
      });
    },
  });

  const handleClick = () => {
    if (!name.trim()) {
      handleAlert({
        type: 'error',
        title: '입력 오류',
        description: '이름을 입력해 주세요.',
      });
      return;
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      handleAlert({
        type: 'error',
        title: '입력 오류',
        description: '올바른 휴대폰 번호를 입력해 주세요.',
      });
      return;
    }
    handleCheckMembership();
  };

  return (
    <div className="border-custom-slate-border bg-background fixed inset-x-0 bottom-0 z-50 border-t p-4">
      <div className="mx-auto max-w-md">
        <button
          type="button"
          onClick={handleClick}
          disabled={isPending || !isFormValid}
          className={cx(
            'flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition-colors',
            isFormValid && !isPending
              ? 'bg-custom-indigo hover:bg-custom-indigo-hover text-white'
              : 'bg-custom-slate-bg text-text-side border-custom-slate-border cursor-not-allowed border',
          )}
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>확인</span>}
        </button>
      </div>
    </div>
  );
}
