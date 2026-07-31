import SelectWorkDaysPresetAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/SelectWorkDaysPreset.action';
import ClickApplySchedulePresetAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/ClickApplySchedulePreset.action';
import ClickResetSchedulePresetAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/ClickResetSchedulePreset.action';
import FormBatchWorkTimeAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/FormBatchWorkTime.action';
import ReadWorkScheduleWarningAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/ReadWorkScheduleWarning.action';

export default function Step2WorkSchedulePresetArea() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
            근무 요일 및 일괄 시간 설정
          </legend>
          <ReadWorkScheduleWarningAction />
        </div>
        <ClickResetSchedulePresetAction />
      </div>

      <SelectWorkDaysPresetAction />
      <FormBatchWorkTimeAction />

      <footer className="pt-2">
        <ClickApplySchedulePresetAction />
      </footer>
    </div>
  );
}
