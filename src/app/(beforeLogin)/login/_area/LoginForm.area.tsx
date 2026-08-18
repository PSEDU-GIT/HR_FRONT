import LoginFormAction from '../_action/LoginForm.action';
import GoogleSocialLoginAction from '../_action/GoogleSocialLogin.action';
import QuickDemoLoginAction from '../_action/QuickDemoLogin.action';

export default function LoginFormArea() {
  return (
    <div className="w-full max-w-[380px] space-y-6">
      {/* Brand & Header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <img
            alt="학온 HR"
            className="h-8 object-contain"
            src="/images/logo.png"
          />
          <span className="bg-custom-indigo inline-block shrink-0 rounded-md px-1.5 py-0.5 text-11 font-bold text-white">
            HR
          </span>
        </div>
        <p className="text-text-side mt-2.5 text-xs font-medium">
          전자계약에서 시작하는 학원 인사 운영
        </p>
      </div>

      {/* Main Form Card */}
      <div className="border-custom-slate-border bg-background rounded-2xl border p-6 shadow-xs sm:p-7">
        <LoginFormAction />

        <div className="relative my-4 flex items-center justify-center">
          <div className="border-custom-slate-border absolute inset-0 flex items-center">
            <div className="border-custom-slate-border w-full border-t" />
          </div>
          <span className="bg-background text-text-side relative px-3 text-[11px]">
            또는
          </span>
        </div>

        <div className="space-y-2.5">
          <QuickDemoLoginAction />
          <GoogleSocialLoginAction />
        </div>
      </div>

      {/* Footer copyright */}
      <p className="text-text-side text-center text-[11px]">
        © 2026 Hakon HR. All rights reserved.
      </p>
    </div>
  );
}
