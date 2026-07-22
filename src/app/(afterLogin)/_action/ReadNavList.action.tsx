'use client';

import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Package } from 'lucide-react';
import NavItem from '@/app/(afterLogin)/_component/NavItem';

export default function ReadNavListAction() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-[10px]" aria-label="사이드바 네비게이션">
      <div className="relative flex flex-col gap-[2px]">
        <NavItem
          href="/dashboard"
          label="대시보드"
          isActive={pathname === '/dashboard'}
          icon={<LayoutDashboard size={18} />}
        />
        <NavItem
          href="/wizard/step1"
          label="계약서 작성"
          isActive={pathname.startsWith('/wizard')}
          icon={<FileText size={18} />}
        />
      </div>
      <div className="mx-[10px] my-[6px] h-[1px] bg-[oklch(0.52_0.02_260)]" />
      <NavItem
        href="/cabinet"
        label="계약보관함"
        isActive={pathname.startsWith('/cabinet')}
        icon={<Package size={18} />}
      />
    </nav>
  );
}
