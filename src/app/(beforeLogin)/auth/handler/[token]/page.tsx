import TokenHandlerArea from './_area/TokenHandler.area';

interface TokenPageProps {
  params: Promise<{ token: string }>;
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { token } = await params;

  return <TokenHandlerArea token={token} />;
}
