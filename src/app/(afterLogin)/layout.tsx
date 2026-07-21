import NavArea from '@/app/(afterLogin)/_area/Nav.area';
import HeaderArea from '@/app/(afterLogin)/_area/Header.area';
import ClickFontScaleAction from '@/app/(afterLogin)/_action/ClickFontScale.action';

export default function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <NavArea />

      <div className="bg-foreground flex flex-1 flex-col overflow-hidden">
        <HeaderArea />

        <main className="flex-1 pl-8">{children}</main>
      </div>

      <ClickFontScaleAction />
    </div>
  );
}
