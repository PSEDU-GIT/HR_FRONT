import { motion } from 'framer-motion';
import AcademyPartyInfoHandler from '@/app/(afterLogin)/_handler/AcademyPartyInfo.handler';

export default function AcademyInfoPopoverArea() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="border-custom-slate-border bg-background absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border p-4 shadow-xl backdrop-blur-lg"
    >
      <AcademyPartyInfoHandler />
    </motion.div>
  );
}
