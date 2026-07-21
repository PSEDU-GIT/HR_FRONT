import Link from 'next/link';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

export default function NavItem({ href, icon, label, isActive }: NavItemProps) {
  const baseClass =
    'relative flex items-center gap-[10px] rounded-[10px] p-[9px_12px] text-[14px] cursor-pointer transition-all duration-150';
  const activeClass = 'bg-[oklch(0.347_0.042_267.6)] font-semibold text-white';
  const inactiveClass =
    'text-[oklch(0.88_0.015_260)] hover:bg-[oklch(0.32_0.03_260)] hover:text-white font-medium';

  return (
    <Link
      className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      href={href}
      data-discover="true"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
