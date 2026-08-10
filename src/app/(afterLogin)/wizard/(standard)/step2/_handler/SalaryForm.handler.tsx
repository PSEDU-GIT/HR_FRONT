'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore, SalaryType } from '@/app/(afterLogin)/wizard/store';
import Step2SalaryMonthlyArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level3/Step2SalaryMonthly.area';
import Step2SalaryCommissionArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level3/Step2SalaryCommission.area';
import Step2SalaryHourlyArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level3/Step2SalaryHourly.area';
import Step2SalaryPayDayArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level3/Step2SalaryPayDay.area';
import Step2SalaryTaxFreeArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level3/Step2SalaryTaxFree.area';
import Step2NonCompeteArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level3/Step2NonCompete.area';
import Step2ExtraAllowanceArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level3/Step2ExtraAllowance.area';
import Step2SalarySummaryArea from '@/app/(afterLogin)/wizard/(standard)/step2/_area/level3/Step2SalarySummary.area';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import cx from 'classnames';

const SALARY_TYPE_LABELS: Record<SalaryType, string> = {
  monthly: '고정급',
  commission: '비율제',
  hourly: '시급제',
};

export default function SalaryFormHandler() {
  const {
    wizSalaryType,
    salaryEditingSection,
    wizHourlyRate,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizSalaryType: state.step2.wizSalaryType,
      salaryEditingSection: state.step2.salaryEditingSection || null,
      wizHourlyRate: state.step2.wizHourlyRate,
      setStep2: state.setStep2,
    })),
  );

  const handleChangeSalaryType = () => {
    setStep2({
      wizSalaryApplied: false,
      salaryEditingSection: null,
    });
  };

  const handleFinishEdit = () => {
    setStep2({ salaryEditingSection: null });
  };

  const isHourlyBelowMinimum =
    wizSalaryType === 'hourly' && salaryEditingSection === 'amount' && wizHourlyRate < 10320;

  const renderEditingContent = () => {
    switch (salaryEditingSection) {
      case 'amount':
        return wizSalaryType === 'hourly' ? (
          <Step2SalaryHourlyArea />
        ) : wizSalaryType === 'commission' ? (
          <Step2SalaryCommissionArea />
        ) : (
          <Step2SalaryMonthlyArea />
        );
      case 'payDay':
        return <Step2SalaryPayDayArea />;
      case 'taxFree':
        return <Step2SalaryTaxFreeArea />;
      case 'nonCompete':
        return <Step2NonCompeteArea />;
      case 'extraAllowance':
        return <Step2ExtraAllowanceArea />;
      default:
        return <Step2SalarySummaryArea />;
    }
  };

  return (
    <div className="space-y-4">
      {!salaryEditingSection && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="border-custom-indigo-border bg-custom-indigo-bg text-custom-indigo inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-extrabold dark:border-custom-indigo/40 dark:bg-slate-900 dark:text-custom-indigo">
              {SALARY_TYPE_LABELS[wizSalaryType] || '고정급'}
            </span>
            <span className="text-text-main text-xs font-bold dark:text-slate-200">
              급여 및 수당 설정
            </span>
          </div>
          <button
            type="button"
            onClick={handleChangeSalaryType}
            className="text-text-side hover:text-custom-indigo flex cursor-pointer items-center gap-1 text-xs font-semibold transition-colors dark:text-slate-400 dark:hover:text-custom-indigo"
          >
            <RotateCcw className="h-3 w-3" />
            <span>급여 형태 변경</span>
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={salaryEditingSection || 'summary'}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2 }}
        >
          {renderEditingContent()}
        </motion.div>
      </AnimatePresence>

      {salaryEditingSection && (
        <footer className="pt-1">
          <button
            type="button"
            onClick={handleFinishEdit}
            disabled={isHourlyBelowMinimum}
            className={cx(
              'flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition-all shadow-2xs',
              isHourlyBelowMinimum
                ? 'cursor-not-allowed border-rose-200 bg-rose-50 text-rose-500 opacity-80 dark:border-rose-950 dark:bg-rose-950/40 dark:text-rose-400'
                : 'border-custom-indigo-border bg-custom-indigo text-white hover:bg-custom-indigo-hover active:scale-[0.99]',
            )}
          >
            <span>수정 완료</span>
          </button>
        </footer>
      )}
    </div>
  );
}
