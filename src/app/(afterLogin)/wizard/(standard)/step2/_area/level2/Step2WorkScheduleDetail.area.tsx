import SelectDayScheduleToggleAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/SelectDayScheduleToggle.action';
import FormEditingDayTimeAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/FormEditingDayTime.action';
import ClickNextSubStepAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/period/ClickNextSubStep.action';
import ReadWorkScheduleWarningAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/ReadWorkScheduleWarning.action';

export default function Step2WorkScheduleDetailArea() {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
            요일별 상세 소정근로시간 설정
          </legend>
          <ReadWorkScheduleWarningAction />
        </div>
        <p className="text-text-sub mt-1.5 text-[11px] leading-relaxed font-medium">
          * 각 요일을 클릭하여 휴무 여부 및 시작/종료/휴게 시간을 세부 조정할 수 있습니다.
        </p>
      </div>

      <SelectDayScheduleToggleAction />
      <FormEditingDayTimeAction />

      <footer className="pt-2">
        <ClickNextSubStepAction nextSubStep={3} />
      </footer>
    </div>
  );
}
