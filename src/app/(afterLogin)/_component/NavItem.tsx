'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
        'my-1 flex h-10 items-center rounded-xl px-3 text-sm font-medium transition-colors duration-200',
        {
          'bg-custom-indigo text-white shadow-xs': isActive,
          'text-muted-foreground hover:bg-custom-indigo-bg hover:text-custom-indigo': !isActive,
        },
      )}
    >
      <div className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</div>
      <motion.span
        animate={{
          width: isCollapsed ? 0 : 'auto',
          opacity: isCollapsed ? 0 : 1,
          marginLeft: isCollapsed ? 0 : 12,
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="inline-block overflow-hidden font-semibold whitespace-nowrap"
      >
        {label}
      </motion.span>
    </Link>
  );
}
