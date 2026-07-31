import Step2ContractPeriodArea from './_area/level1/Step2ContractPeriod.area';
import LevelSideHandler from './_handler/LevelSide.handler';
import ClickPrevStepAction from './_action/side/ClickPrevStep.action';
import NextStepBtn from '@/app/(afterLogin)/wizard/_component/NextStepBtn';
import Step2WorkScheduleArea from './_area/level2/Step2WorkSchedule.area';
import Step2SalaryInfoArea from './_area/level3/Step2SalaryInfo.area';

export default function WizardStep2Page() {
  return (
    <div className="flex items-start">
      <section className="flex-1">
        <div className="flex flex-col gap-4">
          <Step2ContractPeriodArea />
          <Step2WorkScheduleArea />
          <Step2SalaryInfoArea />
        </div>
      </section>

      <aside className="ml-6 w-[540px] shrink-0 space-y-4">
        <div className="absolute top-[14px] right-0 flex w-[360px] items-center gap-2.5">
          <ClickPrevStepAction className="flex-1" />
          <NextStepBtn className="flex-1" />
        </div>

        <LevelSideHandler />
      </aside>
    </div>
  );
}
