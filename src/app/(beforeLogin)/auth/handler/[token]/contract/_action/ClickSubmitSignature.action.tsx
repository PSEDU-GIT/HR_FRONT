'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { Loader2 } from 'lucide-react';
import cx from 'classnames';
import { useAlert } from '@/app/(afterLogin)/_state/useAlert';
import { useTokenHandlerStore } from '../../_state/useTokenHandlerStore';
import { setTokenSession } from '../../_lib/tokenSessionStorage';
import { submitSignature } from '../_lib/submitSignature';

interface ClickSubmitSignatureActionProps {
  token: string;
  disabled?: boolean;
}

export default function ClickSubmitSignatureAction({
  token,
  disabled,
}: ClickSubmitSignatureActionProps) {
  const router = useRouter();
  const { handleAlert } = useAlert();

  const { agreedPrivacy, agreedIdentification, agreedElectronic, signatureImage, name, phone, setStep } =
    useTokenHandlerStore(
      useShallow((state: any) => ({
        agreedPrivacy: state.agreedPrivacy,
        agreedIdentification: state.agreedIdentification,
        agreedElectronic: state.agreedElectronic,
        signatureImage: state.signatureImage,
        name: state.name,
        phone: state.phone,
        setStep: state.setStep,
      })),
    );

  const isAgreementsValid = agreedPrivacy && agreedIdentification && agreedElectronic;

  const {
    mutate: handleSubmitSignature,
    isPending: isSubmitting,
    isSuccess: signedSuccess,
  } = useMutation({
    mutationKey: ['submit-signature', token],
    mutationFn: () =>
      submitSignature({
        token,
        signatureImageBase64: signatureImage!,
        consentCheckedAt: new Date().toISOString(),
      }),
    onSuccess: () => {
      setStep(4);
      setTokenSession(token, { step: 4, name, phone });

      handleAlert({
        type: 'success',
        title: '계약 체결 완료',
        description: '전자서명 제출 및 계약 체결이 완료되었습니다.',
      });

      router.push(
        `/auth/handler/${token}/complete?name=${encodeURIComponent(name)}&phone=${phone}`,
      );
    },
    onError: (err: any) => {
      console.error('서명 제출 실패:', err);
      handleAlert({
        type: 'error',
        title: '서명 제출 실패',
        description: err.message || '서명 제출 과정 중 오류가 발생했습니다.',
      });
    },
  });

  const isSubmitDisabled =
    !isAgreementsValid || !signatureImage || isSubmitting || signedSuccess || disabled;

  const handleClick = () => {
    if (!isAgreementsValid) {
      handleAlert({
        type: 'error',
        title: '약관 동의 필요',
        description: '필수 약관 동의 항목에 모두 동의해 주세요.',
      });
      return;
    }
    if (!signatureImage) {
      handleAlert({
        type: 'error',
        title: '자필 서명 필요',
        description: '서명란에 자필 서명을 작성해 주세요.',
      });
      return;
    }

    handleSubmitSignature();
  };

  return (
    <div className="border-custom-slate-border fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-md">
        <button
          type="button"
          onClick={handleClick}
          disabled={isSubmitDisabled}
          className={cx(
            'flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition-colors',
            signedSuccess
              ? 'bg-custom-emerald cursor-default text-white'
              : !isSubmitDisabled
                ? 'bg-custom-indigo hover:bg-custom-indigo-hover text-white'
                : 'bg-custom-slate-bg text-text-side border-custom-slate-border cursor-not-allowed border dark:bg-slate-800 dark:text-slate-600',
          )}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : signedSuccess ? (
            <span>서명 완료</span>
          ) : (
            <span>서명 제출 및 계약 체결</span>
          )}
        </button>
      </div>
    </div>
  );
}
