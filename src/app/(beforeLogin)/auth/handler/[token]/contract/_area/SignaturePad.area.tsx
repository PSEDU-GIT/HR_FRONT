import ClickResetSignatureAction from '../_action/ClickResetSignature.action';
import FormSignaturePadAction from '../_action/FormSignaturePad.action';

export default function SignaturePadArea() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-text-title text-xs font-bold dark:text-slate-100">서명</h2>
        <ClickResetSignatureAction />
      </div>
      <FormSignaturePadAction />
    </div>
  );
}
