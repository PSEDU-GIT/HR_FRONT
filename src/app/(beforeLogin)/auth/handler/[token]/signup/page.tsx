import ClickGoogleSignupAction from './_action/ClickGoogleSignup.action';
import ClickStandardSignupAction from './_action/ClickStandardSignup.action';
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
      <div className="space-y-2">
        <h1 className="text-text-title text-xl font-bold leading-snug tracking-tight dark:text-slate-100">
          {name ? `${name}님, ` : ''}회원가입 안내
        </h1>
        <p className="text-text-sub text-xs font-normal leading-relaxed dark:text-slate-400">
          전자계약서 체결을 위해 회원가입을 진행해 주세요.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <ClickGoogleSignupAction token={token} name={name} phone={phone} />
        <ClickStandardSignupAction token={token} name={name} phone={phone} />
        <ClickVerifyAfterSignupAction token={token} name={name} phone={phone} />
      </div>
    </main>
  );
}
