'use client';

import ReadContractPeriodBadgeAction from '@/app/(afterLogin)/wizard/step2/_action/period/ReadContractPeriodBadge.action';
import ReadContractPeriodWarningAction from '@/app/(afterLogin)/wizard/step2/_action/period/ReadContractPeriodWarning.action';
import ReadProbationWarningAction from '@/app/(afterLogin)/wizard/step2/_action/period/ReadProbationWarning.action';
import SelectContractPresetAction from '@/app/(afterLogin)/wizard/step2/_action/period/SelectContractPreset.action';
import SelectContractPeriodDateAction from '@/app/(afterLogin)/wizard/step2/_action/period/SelectContractPeriodDate.action';
import SelectProbationPeriodAction from '@/app/(afterLogin)/wizard/step2/_action/period/SelectProbationPeriod.action';

export default function FormContractPeriodAction() {
  return (
    <fieldset className="space-y-5 border-none p-0">
      <div className="space-y-2.5">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
              계약 기간
            </legend>
            <ReadContractPeriodBadgeAction />
            <ReadContractPeriodWarningAction />
          </div>
          <SelectContractPresetAction />
        </header>
        <SelectContractPeriodDateAction />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <legend className="text-text-side text-xs font-extrabold tracking-widest uppercase">
            수습 기간
          </legend>
          <ReadProbationWarningAction />
        </div>
        <SelectProbationPeriodAction />
      </div>
    </fieldset>
  );
}
