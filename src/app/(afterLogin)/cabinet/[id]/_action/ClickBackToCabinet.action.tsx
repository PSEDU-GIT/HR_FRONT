'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ClickBackToCabinetAction() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push('/cabinet')}
      className="text-custom-indigo hover:text-custom-indigo-hover flex cursor-pointer items-center space-x-1 text-xs font-bold transition-colors"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      <span>보관함 전체 목록</span>
    </button>
  );
}
