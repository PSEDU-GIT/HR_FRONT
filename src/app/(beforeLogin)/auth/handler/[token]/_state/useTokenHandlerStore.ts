'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TokenHandlerState {
  token: string;
  name: string;
  phone: string;
  currentStep: number; // 1: 본인확인, 2: OTP/회원가입, 3: 서명체결
  isSubmitting: boolean;
  checkResult: any | null;

  // 전자계약 서명 및 약관 동의 상태
  agreedPrivacy: boolean;
  agreedIdentification: boolean;
  agreedElectronic: boolean;
  signatureImage: string | null;

  setToken: (token: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setStep: (step: number) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setCheckResult: (checkResult: any) => void;

  setAgreedPrivacy: (val: boolean) => void;
  setAgreedIdentification: (val: boolean) => void;
  setAgreedElectronic: (val: boolean) => void;
  setSignatureImage: (val: string | null) => void;
  toggleAllAgreements: (val: boolean) => void;

  reset: () => void;
}

export const useTokenHandlerStore = create<TokenHandlerState>()(
  persist(
    (set) => ({
      token: '',
      name: '',
      phone: '',
      currentStep: 1,
      isSubmitting: false,
      checkResult: null,

      agreedPrivacy: false,
      agreedIdentification: false,
      agreedElectronic: false,
      signatureImage: null,

      setToken: (token) => set({ token }),
      setName: (name) => set({ name }),
      setPhone: (phone) => set({ phone }),
      setStep: (step) => set({ currentStep: step }),
      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
      setCheckResult: (checkResult) => set({ checkResult }),

      setAgreedPrivacy: (val) => set({ agreedPrivacy: val }),
      setAgreedIdentification: (val) => set({ agreedIdentification: val }),
      setAgreedElectronic: (val) => set({ agreedElectronic: val }),
      setSignatureImage: (val) => set({ signatureImage: val }),
      toggleAllAgreements: (val) =>
        set({
          agreedPrivacy: val,
          agreedIdentification: val,
          agreedElectronic: val,
        }),

      reset: () =>
        set({
          token: '',
          name: '',
          phone: '',
          currentStep: 1,
          isSubmitting: false,
          checkResult: null,
          agreedPrivacy: false,
          agreedIdentification: false,
          agreedElectronic: false,
          signatureImage: null,
        }),
    }),
    {
      name: 'hr-token-handler-session',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
