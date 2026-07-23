'use client';

import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Package } from 'lucide-react';
import NavItem from '@/app/(afterLogin)/_component/NavItem';
import { useSidebarStore } from '@/app/(afterLogin)/_state/useSidebarStore';

export default function ReadNavListAction() {
  const pathname = usePathname();
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <nav className="flex flex-col" aria-label="사이드바 네비게이션">
      <NavItem
        href="/dashboard"
        label="대시보드"
        isActive={pathname === '/dashboard'}
        isCollapsed={isCollapsed}
        icon={<LayoutDashboard size={18} />}
      />
      <NavItem
        href="/wizard/step1"
        label="계약서 작성"
        isActive={pathname.startsWith('/wizard')}
        isCollapsed={isCollapsed}
        icon={<FileText size={18} />}
      />
      <NavItem
        href="/cabinet"
        label="계약보관함"
        isActive={pathname.startsWith('/cabinet')}
        isCollapsed={isCollapsed}
        icon={<Package size={18} />}
      />
    </nav>
  );
}
