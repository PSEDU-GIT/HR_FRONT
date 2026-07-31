import { Suspense } from 'react';
import Step1InstructorSkeleton from '@/app/(afterLogin)/wizard/(standard)/step1/_component/Step1InstructorSkeleton';
import Step1InstructorArea from '@/app/(afterLogin)/wizard/(standard)/step1/_area/Step1Instructor.area';
import Step1ContractTypeArea from '@/app/(afterLogin)/wizard/(standard)/step1/_area/Step1ContractType.area';
import Step1SideArea from '@/app/(afterLogin)/wizard/(standard)/step1/_area/Step1Side.area';

export default function WizardStep1Page() {
  return (
    <div className="flex items-start">
      <section className="flex-1 space-y-6">
        <Suspense fallback={<Step1InstructorSkeleton />}>
          <Step1InstructorArea />
        </Suspense>
        <Step1ContractTypeArea />
      </section>
      <Step1SideArea />
    </div>
  );
}
