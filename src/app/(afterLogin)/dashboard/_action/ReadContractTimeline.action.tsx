'use client';

interface TimelineItem {
  id: string;
  time: string;
  text: string;
  tag?: string;
}

const TIMELINE_LIST: TimelineItem[] = [
  {
    id: '1',
    time: '08:15',
    text: '이지은 강사 근로계약서 서명 완료',
  },
  {
    id: '2',
    time: '08:42',
    text: '김철수 강사 재계약서 발송 완료',
    tag: '#HR-3467',
  },
  {
    id: '3',
    time: '09:05',
    text: '최수민 강사 계약조건 확인 문의',
  },
  {
    id: '4',
    time: '09:18',
    text: '박준형 강사 만료임박 갱신 안내 전송',
    tag: '#HR-3467',
  },
  {
    id: '6',
    time: '10:02',
    text: '정아름 강사 서명 대기 문서 시스템 저장',
  },
  {
    id: '7',
    time: '10:15',
    text: '이지은 강사 계약서 보관함 보관 처리',
    tag: '#HR-3467',
  },
];

export default function ReadContractTimelineAction() {
  return (
    <div className="border-custom-slate-border flex w-full flex-col gap-6 rounded-2xl border bg-white p-6 text-sm h-full">
      <h3 className="font-bold text-neutral-900 text-base">계약 활동 타임라인</h3>

      <div className="relative flex flex-col gap-6 py-2">
        {/* 전체 아이콘의 중심을 지나는 완벽하게 일직선인 수직선 */}
        <div className="absolute left-[4.25rem] top-3.5 bottom-3.5 w-[1.5px] -translate-x-1/2 bg-gray-200" />

        {TIMELINE_LIST.map((item) => (
          <div key={item.id} className="relative flex items-center text-sm min-h-[2.25rem]">
            {/* 시간 */}
            <div className="w-14 shrink-0 font-bold text-neutral-900 text-xs sm:text-sm">
              {item.time}
            </div>

            {/* 원형 아이콘 노드 (수직선 중앙 정렬) */}
            <div className="relative z-10 flex w-6 shrink-0 items-center justify-center">
              <div className="h-3.5 w-3.5 rounded-full border-2 border-neutral-900 bg-white" />
            </div>

            {/* 내용 텍스트 및 태그 */}
            <div className="flex-1 pl-3 font-medium leading-normal text-gray-600">
              <span>{item.text}</span>
              {item.tag && (
                <span className="ml-1.5 whitespace-nowrap font-semibold text-red-500">
                  {item.tag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
