'use client';

import Alert from '@/app/_component/alert/Alert';

export default function AlertProvider() {
  return (
    <div className="pointer-events-none fixed top-10 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center">
      <div className="pointer-events-auto">
        <Alert />
      </div>
    </div>
  );
}
