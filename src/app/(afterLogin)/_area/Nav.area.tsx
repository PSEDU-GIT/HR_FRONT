import ReadNavListAction from '@/app/(afterLogin)/_action/ReadNavList.action';

export default function NavArea() {
  return (
    <aside className="flex h-full w-[264px] shrink-0 flex-col gap-[30px] bg-[oklch(0.25_0.035_260)] p-[28px_18px] text-[oklch(0.94_0.01_260)]">
      <div className="flex flex-col items-center gap-[2px] px-[6px]">
        <div className="flex items-center gap-[6px]">
          <div>
            <img alt="hakon HR" className="h-[28px]" src="/assets/wh_logo-zOOw48sH.png" />
          </div>
          <div className="mb-[4px] flex items-center justify-center rounded-[8px] bg-[rgb(20,_61,_153)] p-[6px_8px] text-[16px] font-bold text-white">
            HR
          </div>
        </div>
        <div>
          <div className="text-[12px] text-[oklch(0.8_0.02_260)]">
            전자계약에서 시작하는 학원 인사 운영
          </div>
        </div>
      </div>
      <ReadNavListAction />
    </aside>
  );
}
