'use client';

import Link from 'next/link';
import cx from 'classnames';
interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

export default function NavItem({ href, icon, label, isActive, isCollapsed }: NavItemProps) {
  return (
    <Link
      href={href}
      title={isCollapsed ? label : undefined}
      className={cx(
        'my-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out',
        {
          'bg-custom-indigo text-white shadow-xs': isActive,
          'text-muted-foreground hover:bg-custom-indigo-bg hover:text-custom-indigo': !isActive,
        },
        !isCollapsed && 'hover:translate-x-1 hover:transform',
      )}
    >
      <div className="flex shrink-0 items-center justify-center">{icon}</div>
      <span
        className={cx(
          'inline-block overflow-hidden font-semibold whitespace-nowrap transition-all duration-300 ease-in-out',
          isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[150px] opacity-100',
        )}
      >
        {label}
      </span>
    </Link>
  );
}
