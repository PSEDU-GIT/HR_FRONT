import ViewContractDocumentAction from '../_action/ViewContractDocument.action';

interface ContractDocumentAreaProps {
  token: string;
  name: string;
  phone: string;
}

export default function ContractDocumentArea({
  token,
  name,
  phone,
}: ContractDocumentAreaProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-text-title text-xs font-bold">계약서 전문</h2>
      <ViewContractDocumentAction token={token} name={name} phone={phone} />
    </div>
  );
}
