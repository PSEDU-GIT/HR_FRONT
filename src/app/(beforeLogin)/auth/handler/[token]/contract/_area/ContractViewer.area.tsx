'use client';

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import cx from 'classnames';
import { getContractByToken } from '../_lib/getContractByToken';
import { submitSignature } from '../_lib/submitSignature';
import PrivacyTermsArea from './PrivacyTerms.area';
import ContractDocumentArea from './ContractDocument.area';
import SignaturePadArea from './SignaturePad.area';

interface ContractViewerAreaProps {
  token: string;
  name: string;
  phone: string;
}

export default function ContractViewerArea({ token, name, phone }: ContractViewerAreaProps) {
  const [contractData, setContractData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Agreements state
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedIdentification, setAgreedIdentification] = useState(false);
  const [agreedElectronic, setAgreedElectronic] = useState(false);

  // Signature state
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signedSuccess, setSignedSuccess] = useState(false);

  const toggleAllAgreements = (val: boolean) => {
    setAgreedPrivacy(val);
    setAgreedIdentification(val);
    setAgreedElectronic(val);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchContract = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getContractByToken(token);
        if (isMounted) {
          setContractData(res.data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || '계약서를 불러오지 못했습니다. 링크가 만료되었거나 올바르지 않습니다.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchContract();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const isAgreementsValid = agreedPrivacy && agreedIdentification && agreedElectronic;
  const isSubmitDisabled = !isAgreementsValid || !signatureImage || isSubmitting || signedSuccess;

  const handleFinalSubmit = async () => {
    if (!isAgreementsValid) {
      alert('필수 약관 동의 항목에 모두 동의해 주세요.');
      return;
    }
    if (!signatureImage) {
      alert('서명란에 자필 서명을 작성해 주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitSignature({
        token,
        signatureImageBase64: signatureImage,
        consentCheckedAt: new Date().toISOString(),
      });
      setSignedSuccess(true);
      alert('전자서명 제출 및 계약 체결이 완료되었습니다.');
    } catch (err: any) {
      console.error('서명 제출 실패:', err);
      alert(err.message || '서명 제출 과정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Main Content */}
      <main className="px-5 pt-6 pb-28 space-y-6">
        <div className="space-y-1">
          <h1 className="text-text-title text-xl font-bold tracking-tight dark:text-slate-100">
            전자근로계약서 체결
          </h1>
          <p className="text-text-sub text-xs font-normal dark:text-slate-400">
            {name ? `${name} 강사님, ` : ''}약관 동의 및 서명을 진행해 주세요.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-2">
            <Loader2 className="text-text-side h-5 w-5 animate-spin" />
            <p className="text-text-side text-xs font-normal">계약 정보를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="border-custom-danger-border bg-custom-danger-bg rounded-lg border p-4 text-center space-y-2 dark:border-rose-950 dark:bg-rose-950/30">
            <AlertCircle className="text-custom-danger mx-auto h-6 w-6" />
            <p className="text-custom-danger text-xs font-bold dark:text-rose-300">{error}</p>
          </div>
        ) : (
          <>
            <PrivacyTermsArea
              agreedPrivacy={agreedPrivacy}
              agreedIdentification={agreedIdentification}
              agreedElectronic={agreedElectronic}
              setAgreedPrivacy={setAgreedPrivacy}
              setAgreedIdentification={setAgreedIdentification}
              setAgreedElectronic={setAgreedElectronic}
              toggleAllAgreements={toggleAllAgreements}
            />

            <ContractDocumentArea
              name={name}
              phone={phone}
              contractData={contractData}
            />

            <SignaturePadArea
              onSignatureChange={(dataUrl) => setSignatureImage(dataUrl)}
            />
          </>
        )}
      </main>

      {/* Fixed Bottom Action Bar */}
      {!loading && !error && (
        <div className="border-custom-slate-border fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto max-w-md">
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitDisabled}
              className={cx(
                'flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition-colors',
                signedSuccess
                  ? 'bg-custom-emerald text-white cursor-default'
                  : !isSubmitDisabled
                    ? 'bg-custom-indigo text-white hover:bg-custom-indigo-hover'
                    : 'bg-custom-slate-bg text-text-side cursor-not-allowed border border-custom-slate-border dark:bg-slate-800 dark:text-slate-600',
              )}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : signedSuccess ? (
                <span>서명 완료</span>
              ) : (
                <span>서명 제출 및 계약 체결</span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
