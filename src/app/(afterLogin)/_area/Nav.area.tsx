'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ReadNavListAction from '@/app/(afterLogin)/_action/nav/ReadNavList.action';
import { useSidebarStore } from '@/app/(afterLogin)/_state/useSidebarStore';

export default function NavArea() {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <motion.nav
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex h-full shrink-0 flex-col overflow-hidden bg-foreground"
    >
      <header className="overflow-hidden p-4">
        <div className="flex h-7 items-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isCollapsed ? (
              <motion.img
                key="collapsed-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                alt="hakon HR"
                className="h-7 w-7 object-contain"
                src="/favicon.ico"
              />
            ) : (
              <motion.div
                key="expanded-logo"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <img
                  alt="hakon HR"
                  className="h-7 max-w-[130px] object-contain"
                  src="/images/logo.png"
                />
                <span className="bg-custom-indigo inline-block shrink-0 rounded-md px-1.5 py-0.5 text-xs font-bold text-white">
                  HR
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          animate={{
            height: isCollapsed ? 0 : 'auto',
            opacity: isCollapsed ? 0 : 1,
            marginTop: isCollapsed ? 0 : 6,
          }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden whitespace-nowrap"
        >
          <p className="text-text-side text-11 font-medium">
            전자계약에서 시작하는 학원 인사 운영
          </p>
        </motion.div>
      </header>

      <div className="overflow-hidden p-2">
        <ReadNavListAction />
      </div>
    </motion.nav>
  );
}
