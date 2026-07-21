import ClickDarkModeAction from '@/app/(afterLogin)/_action/ClickDarkMode.action';
import ClickAcademyAction from '@/app/(afterLogin)/_action/ClickAcademy.action';
import ClickProfileAction from '@/app/(afterLogin)/_action/ClickProfile.action';

export default function HeaderArea() {
  return (
    <header className="flex h-[64px] w-full shrink-0 items-center justify-between bg-transparent px-[32px] dark:border-slate-800">
      <div />
      <div className="flex items-center gap-[24px]">
        <ClickDarkModeAction />
        <div className="h-[24px] w-[1px] bg-slate-200 dark:bg-slate-800" />
        <ClickAcademyAction />
        <ClickProfileAction />
      </div>
    </header>
  );
}
