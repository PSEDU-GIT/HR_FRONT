import OtpHandlerArea from './_area/OtpHandler.area';

interface OtpPageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ name?: string; phone?: string }>;
}

export default async function OtpPage({ params, searchParams }: OtpPageProps) {
  const { token } = await params;
  const { name = '', phone = '' } = await searchParams;

  return <OtpHandlerArea token={token} name={name} phone={phone} />;
}
