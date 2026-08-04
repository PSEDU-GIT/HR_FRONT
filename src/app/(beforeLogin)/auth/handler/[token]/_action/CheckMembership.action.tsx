'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { CheckCircle2, UserCheck, UserPlus, ArrowRight, Loader2 } from 'lucide-react';
import cx from 'classnames';
import { useTokenHandlerStore } from '../_state/useTokenHandlerStore';
import { checkMembership } from '../_lib/checkMembership';

interface CheckMembershipActionProps {
  token: string;
}

export default function CheckMembershipAction({ token }: CheckMembershipActionProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { name, phone, isSubmitting, setName, setPhone, setIsSubmitting, setCheckResult } =
    useTokenHandlerStore(
      useShallow((state) => ({
        name: state.name,
        phone: state.phone,
        isSubmitting: state.isSubmitting,
        setName: state.setName,
        setPhone: state.setPhone,
        setIsSubmitting: state.setIsSubmitting,
        setCheckResult: state.setCheckResult,
      })),
    );

  const formatPhone = (value: string) => {
    const raw = value.replace(/[^0-9]/g, '');
    if (raw.length <= 3) return raw;
    if (raw.length <= 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
    return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('이름을 입력해 주세요.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      alert('올바른 휴대폰 번호를 입력해 주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await checkMembership({ token, name, phone: cleanPhone });
      setCheckResult(res.data);

      const isMember =
        res.data?.isMember === true ||
        res.data?.member === true ||
        res.data?.isRegistered === true;

      startTransition(() => {
        if (isMember) {
          // 회원이면 계약서 본인 인증 / OTP 진행 페이지로 분기
          router.push(`/auth/signature/${token}?name=${encodeURIComponent(name)}&phone=${cleanPhone}`);
        } else {
          // 비회원이면 회원가입 안내 페이지로 분기
          router.push(`/auth/verification/send-confirm?token=${token}&name=${encodeURIComponent(name)}&phone=${cleanPhone}`);
        }
      });
    } catch (err: any) {
      console.error('회원 여부 확인 실패:', err);
      alert(err.message || '확인 과정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-text-main text-xs font-bold dark:text-slate-200">
          강사 이름 <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="성함을 입력하세요 (예: 김강사)"
          disabled={isSubmitting || isPending}
          className="border-custom-slate-border text-text-title placeholder:text-text-side focus:border-custom-indigo dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 w-full rounded-2xl border bg-white p-3.5 text-xs font-medium transition-all focus:outline-none disabled:opacity-50"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-text-main text-xs font-bold dark:text-slate-200">
          휴대폰 번호 <span className="text-rose-500">*</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="010-0000-0000"
          maxLength={13}
          disabled={isSubmitting || isPending}
          className="border-custom-slate-border text-text-title placeholder:text-text-side focus:border-custom-indigo dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 w-full rounded-2xl border bg-white p-3.5 text-xs font-medium transition-all focus:outline-none disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className={cx(
          'bg-custom-indigo hover:bg-custom-indigo-hover flex w-full cursor-pointer items-center justify-center space-x-2 rounded-2xl py-3.5 text-xs font-black text-white shadow-md transition-all active:scale-[0.98] disabled:opacity-50',
        )}
      >
        {isSubmitting || isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>확인 중...</span>
          </>
        ) : (
          <>
            <span>인증 및 회원 여부 확인</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
