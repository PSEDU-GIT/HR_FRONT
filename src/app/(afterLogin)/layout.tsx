import NavArea from '@/app/(afterLogin)/_area/Nav.area';
import HeaderArea from '@/app/(afterLogin)/_area/Header.area';
import ClickFontScaleAction from '@/app/(afterLogin)/_action/header/ClickFontScale.action';
import AlertProvider from '@/app/(afterLogin)/_provider/Alert.provider';

export default function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-foreground flex h-screen w-screen overflow-hidden">
      <NavArea />

      <div className="flex-1 p-2">
        <div className="bg-background border-custom-slate-border-side flex h-full flex-col overflow-y-auto rounded-2xl shadow-sm">
          <HeaderArea />

          <main className="flex-1 px-8 pb-8">{children}</main>
        </div>
      </div>

      <ClickFontScaleAction />
      <AlertProvider />
    </div>
  );
}
