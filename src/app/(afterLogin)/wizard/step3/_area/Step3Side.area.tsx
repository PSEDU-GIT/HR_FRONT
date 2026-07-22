'use client';

import ClickPrevStepAction from '@/app/(afterLogin)/wizard/step3/_action/side/ClickPrevStep.action';
import NextStepBtn from '@/app/(afterLogin)/wizard/_component/NextStepBtn';
import ReadLegalTermsAdvisoryAction from '@/app/(afterLogin)/wizard/step3/_action/side/ReadLegalTermsAdvisory.action';
import ReadLegalTermRecommendationAction from '@/app/(afterLogin)/wizard/step3/_action/side/ReadLegalTermRecommendation.action';

export default function Step3SideArea() {
  return (
    <aside className="ml-6 w-[540px] shrink-0 space-y-4">
      <div className="absolute top-[14px] right-0 flex w-[360px] items-center gap-2.5">
        <ClickPrevStepAction className="flex-1" />
        <NextStepBtn className="flex-1" />
      </div>

      <div className="max-h-[700px] overflow-y-auto space-y-4 pr-1">
        <ReadLegalTermsAdvisoryAction />
        <ReadLegalTermRecommendationAction />
      </div>
    </aside>
  );
}
