import ClickSidebarToggleAction from '@/app/(afterLogin)/_action/ClickSidebarToggle.action';
import ClickDarkModeAction from '@/app/(afterLogin)/_action/ClickDarkMode.action';
import ClickAcademyAction from '@/app/(afterLogin)/_action/ClickAcademy.action';
import ClickProfileAction from '@/app/(afterLogin)/_action/ClickProfile.action';

export default function HeaderArea() {
  return (
    <header className="border-custom-slate-border flex h-14 w-full shrink-0 items-center justify-between border-b bg-transparent p-2 px-4">
      <ClickSidebarToggleAction />
      <div className="flex items-center gap-2.5">
        <ClickDarkModeAction />
        <ClickAcademyAction />
        <ClickProfileAction />
      </div>
    </header>
  );
}
