'use client';

import { PanelLeft } from 'lucide-react';
import { useSidebarStore } from '@/app/(afterLogin)/_state/useSidebarStore';

export default function ClickSidebarToggleAction() {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <button
      type="button"
      className="text-text-side hover:bg-custom-indigo-bg hover:text-custom-indigo flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all"
      onClick={toggleSidebar}
      title="사이드바 토글"
      aria-label="사이드바 토글"
    >
      <PanelLeft className="h-4 w-4" />
    </button>
  );
}
