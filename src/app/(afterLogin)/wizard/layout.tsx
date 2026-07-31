import LoadProvider from './_provider/Load.provider';

export default function WizardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden pt-0">
      <LoadProvider />
      {children}
    </div>
  );
}
