import type { Metadata } from 'next';
import './globals.css';
import './styles/font.css';
import './styles/keyframes.css';
import './styles/format.css';
import MSWProvider from '../mocks/MSWProvider';
import ReactQueryProvider from '../providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: '학온 HR',
  description: '전자계약에서 시작하는 학원 인사 운영',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full font-sans antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <MSWProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
