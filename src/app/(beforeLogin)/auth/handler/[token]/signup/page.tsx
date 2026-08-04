import SignupHandlerArea from './_area/SignupHandler.area';

interface SignupPageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ name?: string; phone?: string }>;
}

export default async function SignupPage({ params, searchParams }: SignupPageProps) {
  const { token } = await params;

  const { name = '', phone = '' } = await searchParams;

  return <SignupHandlerArea token={token} name={name} phone={phone} />;
}
