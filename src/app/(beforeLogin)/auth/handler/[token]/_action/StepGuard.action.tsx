'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import {
  getTokenSession,
  setTokenSession,
  clearOldTokenSessions,
} from '../_lib/tokenSessionStorage';
import { useTokenHandlerStore } from '../_state/useTokenHandlerStore';

interface StepGuardActionProps {
  requiredStep: number;
  token: string;
  name?: string;
  phone?: string;
}

export default function StepGuardAction({
  requiredStep,
  token,
  name = '',
  phone = '',
}: StepGuardActionProps) {
  const router = useRouter();

  const { storeName, storePhone, setName, setPhone, setStep } = useTokenHandlerStore(
    useShallow((state: any) => ({
      storeName: state.name,
      storePhone: state.phone,
      setName: state.setName,
      setPhone: state.setPhone,
      setStep: state.setStep,
    })),
  );

  useEffect(() => {
    if (!token) return;

    clearOldTokenSessions(token);

    const sessionData = getTokenSession(token);
    const activeName = name || sessionData.name || storeName || '';
    const activePhone = phone || sessionData.phone || storePhone || '';

    if (name || phone) {
      setTokenSession(token, { name: activeName, phone: activePhone });

      if (name) setName(name);
      if (phone) setPhone(phone);
    }

    const checkAndGuard = () => {
      const currentStored = getTokenSession(token);
      const currentStep = Math.max(currentStored.step || 1, 1);
      const currentName = name || currentStored.name || storeName || '';
      const currentPhone = phone || currentStored.phone || storePhone || '';

      // 1단계 제한
      if (requiredStep === 1 && currentStep >= 2) {
        if (currentStep === 2) {
          router.replace(
            `/auth/handler/${token}/otp?name=${encodeURIComponent(currentName)}&phone=${currentPhone}`,
          );
        } else if (currentStep === 3) {
          router.replace(
            `/auth/handler/${token}/contract?name=${encodeURIComponent(currentName)}&phone=${currentPhone}`,
          );
        } else if (currentStep >= 4) {
          router.replace(
            `/auth/handler/${token}/complete?name=${encodeURIComponent(currentName)}&phone=${currentPhone}`,
          );
        }
        return;
      }

      // 2단계 제한
      if (requiredStep === 2) {
        if (currentStep < 2) {
          router.replace(`/auth/handler/${token}`);
        } else if (currentStep === 3) {
          router.replace(
            `/auth/handler/${token}/contract?name=${encodeURIComponent(currentName)}&phone=${currentPhone}`,
          );
        } else if (currentStep >= 4) {
          router.replace(
            `/auth/handler/${token}/complete?name=${encodeURIComponent(currentName)}&phone=${currentPhone}`,
          );
        }
        return;
      }

      // 3단계 제한
      if (requiredStep === 3) {
        if (currentStep < 3) {
          if (currentStep < 2) {
            router.replace(`/auth/handler/${token}`);
          } else {
            router.replace(
              `/auth/handler/${token}/otp?name=${encodeURIComponent(currentName)}&phone=${currentPhone}`,
            );
          }
        } else if (currentStep >= 4) {
          router.replace(
            `/auth/handler/${token}/complete?name=${encodeURIComponent(currentName)}&phone=${currentPhone}`,
          );
        }
        return;
      }

      // 4단계 제한 (완료 화면)
      if (requiredStep === 4 && currentStep < 4) {
        router.replace(`/auth/handler/${token}`);
        return;
      }
    };

    checkAndGuard();

    const handlePopState = () => {
      checkAndGuard();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [token, requiredStep, name, phone, storeName, storePhone, setName, setPhone, setStep, router]);

  return null;
}
