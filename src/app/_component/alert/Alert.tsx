'use client';

import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import cx from 'classnames';
import HoverChip from '@/app/_component/chip/HoverChip';
import { useAlertStore, AlertType } from '@/app/_state/useAlertStore';
import { motion, AnimatePresence } from 'framer-motion';

const alertConfig = {
  info: {
    icon: Info,
    iconColor: 'text-custom-indigo',
    gradient: 'from-custom-indigo-bg 30% via-white 10% to-white',
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-custom-emerald',
    gradient: 'from-custom-emerald-bg 30% via-white 10% to-white',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-custom-multi',
    gradient: 'from-custom-multi-bg 30% via-white 10% to-white',
  },
  error: {
    icon: AlertCircle,
    iconColor: 'text-custom-danger',
    gradient: 'from-custom-danger-bg 30% via-white 10% to-white',
  },
};

interface AlertProps {
  type?: AlertType;
  title?: string;
  description?: string;
  isVisible?: boolean;
}

export default function Alert({
  type: propsType,
  title: propsTitle,
  description: propsDescription,
  isVisible: propsIsVisible,
}: AlertProps) {
  const { alert, hideAlert } = useAlertStore();

  const isVisible = propsIsVisible !== undefined ? propsIsVisible : alert.isVisible;
  const type = propsType || alert.type;
  const title = propsTitle || alert.title;
  const description = propsDescription || alert.description;

  const config = alertConfig[type] || alertConfig.info;
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={cx(
            'border-custom-slate-border relative flex w-full max-w-md items-start overflow-hidden rounded-2xl border bg-gradient-to-r p-3.5 sm:p-4 shadow-sm dark:bg-slate-900 dark:from-slate-900 dark:to-slate-900',
            config.gradient,
          )}
        >
          <div className="z-10 mr-3.5 shrink-0 sm:mr-4">
            <div className="border-custom-slate-border-side/50 rounded-xl border bg-white p-2 dark:border-slate-800 dark:bg-slate-950">
              <Icon className={cx('h-5 w-5', config.iconColor)} strokeWidth={2.5} />
            </div>
          </div>

          <div className="flex-1 pt-0.5 min-w-0">
            <h3 className="text-14 sm:text-15 text-text-title mb-0.5 font-bold">{title}</h3>
            <p className="text-text-side text-xs font-semibold leading-snug break-words">{description}</p>
          </div>

          <button type="button" onClick={hideAlert} className="ml-3 shrink-0 cursor-pointer sm:ml-4">
            <HoverChip icon={<X className="h-4 w-4 text-text-side" strokeWidth={2} />} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
