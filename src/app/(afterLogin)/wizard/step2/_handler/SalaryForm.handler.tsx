'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore, SalaryType } from '@/app/(afterLogin)/wizard/store';
import Step2SalaryMonthlyArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2SalaryMonthly.area';
import Step2SalaryCommissionArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2SalaryCommission.area';
import Step2SalaryHourlyArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2SalaryHourly.area';
import Step2SalaryPayDayArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2SalaryPayDay.area';
import Step2SalaryTaxFreeArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2SalaryTaxFree.area';
import Step2NonCompeteArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2NonCompete.area';
import Step2ExtraAllowanceArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2ExtraAllowance.area';
import Step2SalarySummaryArea from '@/app/(afterLogin)/wizard/step2/_area/level3/Step2SalarySummary.area';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import cx from 'classnames';

const getSubLevelTitle = (subLevel: number, salaryType: SalaryType): string => {
  if (salaryType === 'hourly') {
    const hourlyTitles: Record<number, string> = {
      1: '시간당 시급 수령액 설정',
      2: '급여 지급일 설정',
      3: '급여 및 수당 최종 설정 요약',
    };
    return hourlyTitles[subLevel] || '';
  }

  if (subLevel === 1) {
    if (salaryType === 'commission') return '비율제 정산율 설정';
    return '기본 월급 수령액 설정';
  }

  const titles: Record<number, string> = {
    2: '급여 지급일 설정',
    3: '비과세 수당 적용 설정',
    4: '경업금지 약정 설정',
    5: '추가 고정수당 설정',
    6: '급여 및 수당 최종 설정 요약',
  };
  return titles[subLevel] || '';
};

const SALARY_TYPE_LABELS: Record<SalaryType, string> = {
  monthly: '고정급',
  commission: '비율제',
  hourly: '시급제',
};

export default function SalaryFormHandler() {
  const { wizSalaryType, wizSalarySubStep, wizHourlyRate, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizSalaryType: state.step2.wizSalaryType,
      wizSalarySubStep: state.step2.wizSalarySubStep || 1,
      wizHourlyRate: state.step2.wizHourlyRate,
      setStep2: state.setStep2,
    })),
  );

  const subLevel = wizSalarySubStep;
  const maxSubLevel = wizSalaryType === 'hourly' ? 3 : 6;
  const isHourlyBelowMinimum =
    wizSalaryType === 'hourly' && subLevel === 1 && wizHourlyRate < 10320;

  const handleChangeSalaryType = () => {
    setStep2({
      wizSalaryApplied: false,
      wizSalarySubStep: 1,
    });
  };

  const handlePrev = () => {
    if (subLevel > 1) {
      setStep2({
        wizSalarySubStep: (subLevel - 1) as 1 | 2 | 3 | 4 | 5 | 6,
      });
    }
  };

  const handleNext = () => {
    if (isHourlyBelowMinimum) return;
    if (subLevel < maxSubLevel) {
      const nextLevel = (subLevel + 1) as 1 | 2 | 3 | 4 | 5 | 6;
      setStep2((prev) => ({
        wizSalarySubStep: nextLevel,
        maxUnlockedSalarySubStep: Math.max(prev.maxUnlockedSalarySubStep || 1, nextLevel) as
          1 | 2 | 3 | 4 | 5 | 6,
      }));
    } else {
      setStep2({ wizSubStep: 4 });
    }
  };

  const renderSubLevelContent = () => {
    if (wizSalaryType === 'hourly') {
      switch (subLevel) {
        case 1:
          return <Step2SalaryHourlyArea />;
        case 2:
          return <Step2SalaryPayDayArea />;
        case 3:
          return <Step2SalarySummaryArea />;
        default:
          return <Step2SalaryHourlyArea />;
      }
    }

    switch (subLevel) {
      case 1:
        if (wizSalaryType === 'commission') {
          return <Step2SalaryCommissionArea />;
        }
        return <Step2SalaryMonthlyArea />;
      case 2:
        return <Step2SalaryPayDayArea />;
      case 3:
        return <Step2SalaryTaxFreeArea />;
      case 4:
        return <Step2NonCompeteArea />;
      case 5:
        return <Step2ExtraAllowanceArea />;
      case 6:
        return <Step2SalarySummaryArea />;
      default:
        return <Step2SalaryMonthlyArea />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
            {subLevel}
          </span>
          <h4 className="text-text-main text-xs font-extrabold">
            {getSubLevelTitle(subLevel, wizSalaryType)}
          </h4>
          <button
            type="button"
            onClick={handleChangeSalaryType}
            title="급여 형태 변경"
            className="border-custom-indigo-border bg-custom-indigo-bg text-custom-indigo hover:bg-custom-indigo-bg/80 inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold transition-all active:scale-95"
          >
            <span>{SALARY_TYPE_LABELS[wizSalaryType] || '고정급'}</span>
            <RotateCcw className="h-2.5 w-2.5" />
          </button>
        </div>
        <span className="text-text-side text-[11px] font-bold">
          {subLevel} / {maxSubLevel} 단계
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={subLevel}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2 }}
        >
          {renderSubLevelContent()}
        </motion.div>
      </AnimatePresence>

      {subLevel < maxSubLevel && (
        <footer className="flex items-center gap-2 pt-1">
          {subLevel > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="border-custom-slate-border text-text-side hover:text-text-main flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-xl border bg-white px-3.5 py-2.5 text-xs font-bold whitespace-nowrap transition-all hover:bg-slate-50 active:scale-[0.99]"
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              <span>이전</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={isHourlyBelowMinimum}
            className={cx(
              'border-custom-slate-border flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition-all',
              isHourlyBelowMinimum
                ? 'cursor-not-allowed bg-slate-100 text-slate-400 opacity-60'
                : 'text-text-title cursor-pointer bg-white hover:bg-slate-50 active:scale-[0.99]',
            )}
          >
            <span>{subLevel === maxSubLevel - 1 ? '다음 (최종 요약 확인)' : '다음'}</span>
            <ArrowRight
              className={cx('h-3.5 w-3.5 shrink-0', isHourlyBelowMinimum ? 'text-slate-400' : 'text-text-side')}
            />
          </button>
        </footer>
      )}
    </div>
  );
}
