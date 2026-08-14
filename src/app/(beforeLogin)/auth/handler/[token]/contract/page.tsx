import StepGuardAction from '../_action/StepGuard.action';
import PrivacyTermsArea from './_area/PrivacyTerms.area';
import ContractDocumentArea from './_area/ContractDocument.area';
import SignaturePadArea from './_area/SignaturePad.area';
import ClickSubmitSignatureAction from './_action/ClickSubmitSignature.action';

interface ContractPageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ name?: string; phone?: string }>;
}

export default async function ContractPage({ params, searchParams }: ContractPageProps) {
  const { token } = await params;
  const { name = '', phone = '' } = await searchParams;

  return (
    <>
      <StepGuardAction requiredStep={3} token={token} name={name} phone={phone} />

      <main className="space-y-6 px-5 pt-6 pb-28">
        <div className="space-y-1">
          <h1 className="text-text-title text-xl font-bold tracking-tight">
            전자근로계약서 체결
          </h1>
          <p className="text-text-sub text-xs font-normal">
            {name ? `${name} 강사님, ` : ''}약관 동의 및 서명을 진행해 주세요.
          </p>
        </div>

        <PrivacyTermsArea />
        <ContractDocumentArea token={token} name={name} phone={phone} />
        <SignaturePadArea />
      </main>

      <ClickSubmitSignatureAction token={token} />
    </>
  );
}
