'use client';

import { create } from 'zustand';

interface TokenHandlerState {
  token: string;
  name: string;
  phone: string;
  isSubmitting: boolean;
  checkResult: any | null;

  setToken: (token: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setCheckResult: (checkResult: any) => void;
  reset: () => void;
}

export const useTokenHandlerStore = create<TokenHandlerState>((set) => ({
  token: '',
  name: '',
  phone: '',
  isSubmitting: false,
  checkResult: null,

  setToken: (token) => set({ token }),
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setCheckResult: (checkResult) => set({ checkResult }),
  reset: () => set({ token: '', name: '', phone: '', isSubmitting: false, checkResult: null }),
}));
