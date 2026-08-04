import ContractViewerArea from './_area/ContractViewer.area';

interface ContractPageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ name?: string; phone?: string }>;
}

export default async function ContractPage({ params, searchParams }: ContractPageProps) {
  const { token } = await params;
  const { name = '', phone = '' } = await searchParams;

  return <ContractViewerArea token={token} name={name} phone={phone} />;
}
