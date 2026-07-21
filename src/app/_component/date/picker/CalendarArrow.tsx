import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export default function CalendarArrow({
  direction,
  onClick,
  disabled = false,
  className = '',
}: Props) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={className}
    >
      <span className="hover:bg-hover-icon flex h-6 w-6 cursor-pointer items-center justify-center rounded-full">
        {direction === 'left' ? (
          <ChevronLeft size={18} className="text-text-sub" strokeWidth={2} />
        ) : (
          <ChevronRight size={18} className="text-text-sub" strokeWidth={2} />
        )}
      </span>
    </motion.button>
  );
}
