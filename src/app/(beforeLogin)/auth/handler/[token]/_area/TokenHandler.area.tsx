import FormInputNameAction from '../_action/FormInputName.action';
import FormInputPhoneAction from '../_action/FormInputPhone.action';
import ClickCheckMembershipAction from '../_action/ClickCheckMembership.action';

interface TokenHandlerAreaProps {
  token: string;
}

export default function TokenHandlerArea({ token }: TokenHandlerAreaProps) {
  return (
    <main className="px-5 pt-8 pb-32">
      <div className="space-y-2">
        <h1 className="text-text-title text-xl font-bold leading-snug tracking-tight dark:text-slate-100">
          강사 본인 확인
        </h1>
        <p className="text-text-sub text-xs font-normal leading-relaxed dark:text-slate-400">
          전자계약서 체결을 위해 이름과 휴대폰 번호를 입력해 주세요.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <label className="text-text-main block text-xs font-medium dark:text-slate-300">
            이름
          </label>
          <FormInputNameAction />
        </div>

        <div className="space-y-1.5">
          <label className="text-text-main block text-xs font-medium dark:text-slate-300">
            휴대폰 번호
          </label>
          <FormInputPhoneAction />
        </div>

        <ClickCheckMembershipAction token={token} />
      </div>
    </main>
  );
}
