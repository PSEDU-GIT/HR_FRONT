import SelectInstructorModeAction from '@/app/(afterLogin)/wizard/(standard)/step1/_action/instructor/SelectInstructorMode.action';
import InstructorFormHandler from '@/app/(afterLogin)/wizard/(standard)/step1/_handler/InstructorForm.handler';

export default function Step1InstructorArea() {
  return (
    <article className="border-custom-slate-border-side space-y-4 rounded-3xl border bg-white p-6">
      <h3 className="text-15 text-text-title font-bold">강사 정보</h3>
      <div className="grid grid-cols-2 gap-4">
        <SelectInstructorModeAction />
        <InstructorFormHandler />
      </div>
    </article>
  );
}
