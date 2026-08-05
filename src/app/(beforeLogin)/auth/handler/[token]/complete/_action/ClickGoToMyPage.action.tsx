'use client';

import { useTokenHandlerStore } from '../../_state/useTokenHandlerStore';
import { clearAllTokenSessions } from '../../_lib/tokenSessionStorage';

export default function ClickGoToMyPageAction() {
  const resetStore = useTokenHandlerStore((state: any) => state.reset);

  const handleGoToMyPage = () => {
    // 계약 체결 완료 후 모든 세션 초기화
    resetStore();
    clearAllTokenSessions();
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.clear();
      } catch (e) {
        console.error('Failed to clear sessionStorage:', e);
      }
    }

    const mainAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://hakon.co.kr';
    window.location.href = mainAppUrl;
  };

  return (
    <div className="border-custom-slate-border fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-md">
        <button
          type="button"
          onClick={handleGoToMyPage}
          className="bg-custom-indigo hover:bg-custom-indigo-hover flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-semibold text-white transition-colors"
        >
          마이페이지로 이동
        </button>
      </div>
    </div>
  );
}
