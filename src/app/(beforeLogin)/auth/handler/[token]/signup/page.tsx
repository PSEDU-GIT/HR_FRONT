import StepGuardAction from '../_action/StepGuard.action';
import ClickGoToSignupAction from './_action/ClickGoToSignup.action';
import ClickVerifyAfterSignupAction from './_action/ClickVerifyAfterSignup.action';

interface SignupPageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ name?: string; phone?: string }>;
}

export default async function SignupPage({ params, searchParams }: SignupPageProps) {
  const { token } = await params;
  const { name = '', phone = '' } = await searchParams;

  return (
    <main className="px-5 pt-8 pb-32">
      <StepGuardAction requiredStep={2} token={token} name={name} phone={phone} />

      <div className="space-y-2">
        <h1 className="text-text-title text-xl leading-snug font-bold tracking-tight">
          {name ? `${name}님, ` : ''}회원가입 안내
        </h1>
        <p className="text-text-sub text-xs leading-relaxed font-normal">
          전자계약서 체결을 위해 아래 버튼을 통해 회원가입을 완료해 주세요.
        </p>
      </div>

      <div className="mt-6">
        <ClickGoToSignupAction token={token} />
      </div>

      <ClickVerifyAfterSignupAction token={token} name={name} phone={phone} />
    </main>
  );
}
