'use client';

import { useEffect, useState } from 'react';

export default function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        const { worker } = await import('./browser');
        await worker.start({
          onUnhandledRequest: 'bypass',
        });
      }
      setMswReady(true);
    };

    initMSW();
  }, []);

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
}
