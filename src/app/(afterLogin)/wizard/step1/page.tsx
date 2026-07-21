import { Suspense } from 'react';
import Step1InstructorArea from '@/app/(afterLogin)/wizard/step1/_area/Step1Instructor.area';
import Step1ContractTypeArea from '@/app/(afterLogin)/wizard/step1/_area/Step1ContractType.area';
import Step1SideArea from '@/app/(afterLogin)/wizard/step1/_area/Step1Side.area';

export default function WizardStep1Page() {
  return (
    <div className="flex items-start">
      <section className="flex-1 space-y-6">
        <Suspense
          fallback={
            <div className="flex min-h-[200px] items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold text-slate-400">강사 정보를 불러오는 중...</span>
            </div>
          }
        >
          <Step1InstructorArea />
        </Suspense>
        <Step1ContractTypeArea />
      </section>
      <Step1SideArea />
    </div>
  );
}
