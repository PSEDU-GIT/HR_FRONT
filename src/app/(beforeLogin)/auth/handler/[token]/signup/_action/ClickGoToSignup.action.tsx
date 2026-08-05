'use client';

interface ClickGoToSignupActionProps {
  token: string;
}

export default function ClickGoToSignupAction({ token }: ClickGoToSignupActionProps) {
  const handleGoToSignup = () => {
    window.open(`https://xamfinity.n-e.kr/signup?token=${token}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleGoToSignup}
      className="bg-custom-indigo hover:bg-custom-indigo-hover flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-semibold text-white transition-colors"
    >
      회원가입하러 가기
    </button>
  );
}
