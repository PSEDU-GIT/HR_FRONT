import { motion } from 'framer-motion';
import ClickLogoutAction from '@/app/(afterLogin)/_action/profile/ClickLogout.action';

export default function ProfilePopoverArea() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="border-custom-slate-border bg-background absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-2xl border p-1.5 shadow-lg backdrop-blur-lg"
    >
      <div className="border-custom-slate-border border-b px-3 py-2">
        <p className="text-text-title text-xs font-bold">내 계정</p>
      </div>

      <div className="pt-1">
        <ClickLogoutAction />
      </div>
    </motion.div>
  );
}
