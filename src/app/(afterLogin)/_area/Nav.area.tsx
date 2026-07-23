'use client';

import ReadNavListAction from '@/app/(afterLogin)/_action/ReadNavList.action';
import { useSidebarStore } from '@/app/(afterLogin)/_state/useSidebarStore';
import cx from 'classnames';

export default function NavArea() {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <nav
      className={cx(
        'flex h-full shrink-0 flex-col overflow-hidden transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-[64px]' : 'w-[256px]',
      )}
    >
      <header
        className={cx('overflow-hidden transition-all duration-300', isCollapsed ? 'p-3' : 'p-4')}
      >
        <div
          className={cx(
            'flex items-center transition-all duration-300',
            isCollapsed ? 'justify-center gap-0' : 'gap-2',
          )}
        >
          <img
            alt="hakon HR"
            className={cx('h-7 shrink-0 object-contain', isCollapsed && 'w-7')}
            src={isCollapsed ? '/favicon.ico' : '/images/logo.png'}
          />
          <span
            className={cx(
              'inline-block overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
              isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[100px] opacity-100',
            )}
          >
            <span className="bg-custom-indigo inline-block rounded-md px-1.5 py-0.5 text-xs font-bold text-white">
              HR
            </span>
          </span>
        </div>

        <div
          className={cx(
            'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
            isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100',
          )}
        >
          <p className="text-text-side text-11 mt-1.5 font-medium">
            전자계약에서 시작하는 학원 인사 운영
          </p>
        </div>
      </header>

      <div className="overflow-hidden p-2">
        <ReadNavListAction />
      </div>
    </nav>
  );
}
