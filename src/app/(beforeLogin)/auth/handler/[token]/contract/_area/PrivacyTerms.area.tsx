import FormPrivacyTermsAction from '../_action/FormPrivacyTerms.action';

export default function PrivacyTermsArea() {
  return (
    <div className="space-y-3">
      <div className="border-custom-slate-border flex items-center justify-between border-b pb-2">
        <h2 className="text-text-title text-xs font-bold">약관 동의</h2>
      </div>
      <FormPrivacyTermsAction />
    </div>
  );
}
