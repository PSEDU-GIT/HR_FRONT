'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import AccordionCard from '@/app/(afterLogin)/wizard/(standard)/step2/_component/AccordionCard';
import ReadWorkScheduleSummaryAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/ReadWorkScheduleSummary.action';
import SelectDayScheduleToggleAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/SelectDayScheduleToggle.action';
import FormEditingDayTimeAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/FormEditingDayTime.action';
import ReadWorkScheduleWarningAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/ReadWorkScheduleWarning.action';
import ClickNextSubStepAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/period/ClickNextSubStep.action';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import { motion } from 'framer-motion';

export default function Step2WorkScheduleArea() {
  const { wizSubStep, maxUnlockedSubStep, wizDaysConfig, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizSubStep: state.step2.wizSubStep,
      maxUnlockedSubStep: state.step2.maxUnlockedSubStep,
      wizDaysConfig: state.step2.wizDaysConfig,
      setStep2: state.setStep2,
    })),
  );

  if (maxUnlockedSubStep < 2) return null;

  const weeklyHours = parseFloat(
    Object.values(wizDaysConfig)
      .reduce(
        (sum, conf) =>
          sum +
          (conf.enabled ? calculateDailyHours(conf.startTime, conf.endTime, conf.breakTime) : 0),
        0,
      )
      .toFixed(1),
  );
  const hasStep2Warning = weeklyHours < 15 || weeklyHours > 52;

  const handleSubStepChange = (subStep: 1 | 2 | 3) => {
    setStep2({ wizSubStep: subStep });
  };

  const isCurrentOpen = wizSubStep === 2;

  return (
    <motion.article
      layout="position"
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      style={{ order: isCurrentOpen ? -1 : 2 }}
    >
      <AccordionCard
        title="근무 요일 및 소정근로시간 설정"
        hasWarning={hasStep2Warning}
        isOpen={isCurrentOpen}
        isDone={maxUnlockedSubStep >= 3}
        onClick={() => handleSubStepChange(2)}
        summary={<ReadWorkScheduleSummaryAction />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
                  요일별 상세 소정근로시간 설정
                </legend>
                <ReadWorkScheduleWarningAction />
              </div>
              <p className="text-text-sub mt-1 text-[11px] leading-relaxed font-medium">
                * 각 요일을 클릭하여 휴무 여부 및 시작/종료/휴게 시간을 세부 조정할 수 있습니다. (주 52시간 상한 준수)
              </p>
            </div>
          </div>

          <SelectDayScheduleToggleAction />
          <FormEditingDayTimeAction />

          <footer className="pt-2">
            <ClickNextSubStepAction nextSubStep={3} />
          </footer>
        </div>
      </AccordionCard>
    </motion.article>
  );
}
