'use client';

import { useParams } from 'next/navigation';
import NextStepBtn from '@/app/(afterLogin)/wizard/_component/NextStepBtn';

const SIDE_GUIDE_MAP: Record<
  string,
  {
    title: string;
    guide1: string;
    guide2: string;
    guide3: string;
  }
> = {
  edit: {
    title: '계약서 수정 가이드',
    guide1: '• 기존 등록된 계약서의 모든 상세 항목이 로드되었습니다.',
    guide2: '• 변경이 필요한 강사 정보, 계약 기간, 근무 시간, 급여 항목을 즉시 수정할 수 있습니다.',
    guide3: '• [다음 단계로] 버튼을 클릭하면 수정된 계약서 초안 검토 페이지로 이동합니다.',
  },
  load: {
    title: '이전 계약 불러오기 요약 가이드',
    guide1: '• 기존 계약서의 조건들이 자동으로 입력되었습니다.',
    guide2: '• 변경된 급여나 근무 일정 등 수정할 사항이 있는 경우 왼쪽 영역에서 즉시 수정할 수 있습니다.',
    guide3: '• [다음 단계로] 버튼을 클릭하면 4단계 계약서 초안 검토 페이지로 바로 이동합니다.',
  },
  draft: {
    title: '임시 저장 계약서 작성 가이드',
    guide1: '• 작성 중이었던 임시 저장 계약서 데이터가 불러와졌습니다.',
    guide2: '• 검토 후 미입력 항목이나 변경할 계약 조건을 수정해 주시기 바랍니다.',
    guide3: '• [다음 단계로] 버튼을 클릭하여 계약서 초안을 검토해 주세요.',
  },
};

export default function StepSummarySideArea() {
  const params = useParams<{ type?: string }>();
  const type = params?.type || 'draft';

  const guide = SIDE_GUIDE_MAP[type] || SIDE_GUIDE_MAP.draft;

  return (
    <aside className="ml-6 w-[540px] shrink-0 space-y-4">
      <div className="absolute top-[14px] right-0 flex justify-end">
        <NextStepBtn className="w-48" />
      </div>

      <div className="border-custom-slate-border-side dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 rounded-3xl border p-6 transition-colors">
        <h4 className="text-13 text-text-title dark:text-slate-100 font-bold">{guide.title}</h4>
        <div className="text-text-sub dark:text-slate-300 space-y-3 text-xs font-medium leading-relaxed">
          <p>{guide.guide1}</p>
          <p>{guide.guide2}</p>
          <p className="text-custom-indigo font-bold">{guide.guide3}</p>
        </div>
      </div>
    </aside>
  );
}
