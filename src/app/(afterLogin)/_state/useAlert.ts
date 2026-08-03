'use client';

import { useAlertStore, AlertType } from '@/app/_state/useAlertStore';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useRef } from 'react';

export const useAlert = () => {
  const { showAlert, hideAlert, isVisible } = useAlertStore(
    useShallow((state) => ({
      showAlert: state.showAlert,
      hideAlert: state.hideAlert,
      isVisible: state.alert.isVisible,
    })),
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAlert = (
    props: { type: AlertType; title: string; description: string },
    timeout?: number,
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    showAlert(props);

    timerRef.current = setTimeout(() => {
      hideAlert();
      timerRef.current = null;
    }, timeout ?? 3000);
  };

  useEffect(() => {
    if (!isVisible && timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [isVisible]);

  return { handleAlert, showAlert, hideAlert };
};
