'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight, RotateCcw } from 'lucide-react';
import cx from 'classnames';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { useAlert } from '@/app/(afterLogin)/_state/useAlert';

interface NextStepBtnProps {
  className?: string;
  disabled?: boolean;
}

export default function NextStepBtn({ className, disabled }: NextStepBtnProps) {
  const pathname = usePathname();
  const router = useRouter();
  const step1 = useWizardStore((state) => state.step1);
  const step2 = useWizardStore((state) => state.step2);
  const reset = useWizardStore((state) => state.reset);
  const { handleAlert } = useAlert();

  const getActiveStep = () => {
    if (pathname.includes('/step4')) return 4;
    if (pathname.includes('/summary')) return 3;
    if (pathname.includes('/step3')) return 3;
    if (pathname.includes('/step2')) return 2;
    return 1;
  };

  const activeStep = getActiveStep();

  const getNextStepPath = () => {
    if (pathname.includes('/summary') && !pathname.includes('/preview')) {
      return `${pathname}/preview`;
    }
    if (activeStep === 1) return '/wizard/step2';
    if (activeStep === 2) return '/wizard/step3';
    if (activeStep === 3) return '/wizard/step4';
    return '/dashboard';
  };

  const checkStep1Validation = () => {
    if (!step1.isNewInstructor && !step1.selectedStaffId) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '등록된 강사를 선택해 주세요.',
      });
      return false;
    }

    if (!step1.instructorName?.trim()) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '강사 이름을 입력해 주세요.',
      });
      return false;
    }

    if (!step1.instructorPhone?.trim()) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '연락처를 입력해 주세요.',
      });
      return false;
    }

    if (!step1.instructorSubject?.trim()) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '담당 과목을 입력해 주세요.',
      });
      return false;
    }

    if (!step1.instructorBirth?.trim()) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '생년월일을 입력해 주세요.',
      });
      return false;
    }

    if (!step1.instructorAddress?.trim()) {
      handleAlert({
        type: 'warning',
        title: '강사 정보 입력 필요',
        description: '주소를 입력해 주세요.',
      });
      return false;
    }

    return true;
  };

  const checkStep2Validation = () => {
    if (step2.maxUnlockedSubStep < 2) {
      handleAlert({
        type: 'warning',
        title: '근무/급여 설정 필요',
        description: '계약 기간 및 수습 설정을 완료해 주세요.',
      });
      return false;
    }

    if (step2.maxUnlockedSubStep < 3) {
      handleAlert({
        type: 'warning',
        title: '근무/급여 설정 필요',
        description: '근무 요일 및 소정근로시간 설정을 완료해 주세요.',
      });
      return false;
    }

    if (!step2.wizSalaryDone) {
      handleAlert({
        type: 'warning',
        title: '근무/급여 설정 필요',
        description: '급여 형태 및 금액 설정을 완료해 주세요.',
      });
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      const isValid = checkStep1Validation();
      if (!isValid) return;
    }

    if (activeStep === 2) {
      const isValid = checkStep2Validation();
      if (!isValid) return;
    }

    router.push(getNextStepPath());
  };

  const handleReset = () => {
    reset();
    handleAlert({
      type: 'info',
      title: '초기화 완료',
      description: '모든 입력 항목이 초기 설정값으로 리셋되었습니다.',
    });
  };

  return (
    <div
      className={cx(
        'flex items-center gap-2',
        className ? className : 'absolute top-[14px] right-0',
      )}
    >
      {activeStep === 1 && (
        <button
          type="button"
          onClick={handleReset}
          className="flex h-9 cursor-pointer items-center justify-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-black text-slate-700 shadow-2xs transition-all duration-200 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <RotateCcw size={14} className="text-slate-500 dark:text-slate-400" />
          <span>초기화</span>
        </button>
      )}

      <button
        type="button"
        onClick={handleNextStep}
        disabled={disabled}
        className="flex h-9 w-48 cursor-pointer items-center justify-center space-x-1 rounded-xl bg-slate-900 px-4 text-xs font-black text-white shadow-sm transition-all duration-200 hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
      >
        <span>{activeStep === 4 ? '작성 완료' : '다음 단계로'}</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
