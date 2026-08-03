'use client';

import { create } from 'zustand';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertState {
  alert: {
    isVisible: boolean;
    type: AlertType;
    title: string;
    description: string;
  };
  showAlert: (props: { type: AlertType; title: string; description: string }) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set, get) => ({
  alert: {
    isVisible: false,
    type: 'info',
    title: '',
    description: '',
  },
  showAlert: ({ type, title, description }) =>
    set({
      alert: {
        isVisible: true,
        type,
        title,
        description,
      },
    }),
  hideAlert: () =>
    set({
      alert: {
        ...get().alert,
        isVisible: false,
      },
    }),
}));
