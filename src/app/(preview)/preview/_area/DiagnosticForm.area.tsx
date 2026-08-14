'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import cx from 'classnames';
import { useDiagnosticStore, REGIONS } from '../_state/useDiagnosticStore';
import Select, { SelectDataTypes } from '@/app/_component/select/Select';
import { Check, AlertCircle } from 'lucide-react';

function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/[^0-9]/g, '').slice(0, 11);
  if (numbers.length <= 3) {
    return numbers;
  }
  if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
}

export default function DiagnosticFormArea() {
  const { sido, sigungu, phone, agreed, setSido, setSigungu, setPhone, setAgreed, setStep } =
    useDiagnosticStore(
      useShallow((state) => ({
        sido: state.sido,
        sigungu: state.sigungu,
        phone: state.phone,
        agreed: state.agreed,
        setSido: state.setSido,
        setSigungu: state.setSigungu,
        setPhone: state.setPhone,
        setAgreed: state.setAgreed,
        setStep: state.setStep,
      })),
    );

  const [errorMessage, setErrorMessage] = useState('');

  const effectiveSido = sido || '서울특별시';

  const sidoData: SelectDataTypes[] = Object.keys(REGIONS).map((name) => ({
    id: name,
    displayName: name,
  }));

  const selectedSidoData: SelectDataTypes = {
    id: effectiveSido,
    displayName: effectiveSido,
  };

  const sigunguList = REGIONS[effectiveSido] || [];
  const sigunguData: SelectDataTypes[] = sigunguList.map((name) => ({
    id: name,
    displayName: name,
  }));

  const effectiveSigungu = sigungu || (sigunguList.length > 0 ? sigunguList[0] : '종로구');

  const selectedSigunguData: SelectDataTypes = {
    id: effectiveSigungu,
    displayName: effectiveSigungu,
  };

  const handleSidoChange = (datum: SelectDataTypes) => {
    const nextSido = String(datum.id);
    setSido(nextSido);
    const list = REGIONS[nextSido] || [];
    if (list.length > 0) {
      setSigungu(list[0]);
    } else {
      setSigungu('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    if (errorMessage) setErrorMessage('');
  };

  const isPhoneEmpty = !phone.trim();
  const isAgreedFalse = !agreed;
  const isInvalid = isPhoneEmpty || isAgreedFalse;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPhoneEmpty) {
      setErrorMessage('휴대폰 번호를 입력해 주세요.');
      return;
    }
    if (isAgreedFalse) {
      setErrorMessage('개인정보 수집 및 이용 동의에 체크해 주세요.');
      return;
    }
    setErrorMessage('');
    if (!sido) {
      setSido(effectiveSido);
    }
    if (!sigungu) {
      setSigungu(effectiveSigungu);
    }
    setStep('result');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28 text-gray-900 antialiased">
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur-md">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <span>학온 HR 진단</span>
        </div>

        <span className="font-mono text-11 font-semibold text-blue-600">진단 완료 (8/8)</span>
      </header>

      <main className="mx-auto max-w-md px-4 pt-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-xl leading-snug font-bold tracking-tight text-gray-900">
              진단이 완료되었습니다
            </h1>

            <p className="text-xs leading-relaxed font-medium text-gray-600">
              진단 결과를 확인하고 원장님께 꼭 필요한 조언을 전해드리기 위해 연락처를 입력해 주세요.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-gray-800">학원 지역</label>
            <div className="grid grid-cols-2 gap-2">
              <Select
                data={sidoData}
                selectData={selectedSidoData}
                onChangeAction={handleSidoChange}
                buttonClassName="!py-3 !px-3 !text-xs bg-white border-gray-200 rounded-xl"
              />

              <Select
                data={sigunguData}
                selectData={selectedSigunguData}
                onChangeAction={(datum) => setSigungu(String(datum.id))}
                buttonClassName="!py-3 !px-3 !text-xs bg-white border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-800">휴대폰 번호</label>
            <input
              type="tel"
              placeholder="010-1234-5678"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={13}
              className={cx('bg-background w-full', {
                'border-rose-400': isPhoneEmpty && errorMessage,
              })}
            />
          </div>

          <div className="pt-2">
            <div
              onClick={() => {
                setAgreed(!agreed);
                if (errorMessage) setErrorMessage('');
              }}
              className={cx(
                'flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all active:scale-[99%]',
                {
                  'border-blue-300 bg-blue-50/20 text-gray-900': agreed,
                  'border-rose-400 bg-rose-50/20 text-gray-900':
                    !agreed && isAgreedFalse && errorMessage,
                  'border-gray-200 bg-white text-gray-700 hover:border-gray-300':
                    !agreed && (!isAgreedFalse || !errorMessage),
                },
              )}
            >
              <div
                className={cx(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                  {
                    'border-blue-600 bg-blue-600 text-white': agreed,
                    'border-gray-300 bg-white': !agreed,
                  },
                )}
              >
                {agreed && <Check className="h-3 w-3 stroke-[3]" />}
              </div>

              <div className="space-y-0.5 text-xs">
                <p className="font-bold text-gray-900">[필수] 개인정보 수집 및 이용 동의</p>
                <p className="text-11 leading-relaxed font-medium text-gray-500">
                  진단 결과 리포트 안내 및 학온 인사노무 서비스 정보 제공을 위해 수집합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3.5 backdrop-blur-md">
            <div className="mx-auto max-w-md space-y-2">
              {isInvalid && (
                <div className="text-custom-rose flex items-center justify-center gap-1.5 text-11 font-bold">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    {isPhoneEmpty
                      ? '휴대폰 번호를 입력해야 결과를 확인할 수 있습니다'
                      : '개인정보 수집 동의에 체크해야 결과를 확인할 수 있습니다'}
                  </span>
                </div>
              )}

              <button
                type="submit"
                className={cx(
                  'flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-xs transition-all active:scale-[98%]',
                  {
                    'cursor-not-allowed bg-blue-300 opacity-90': isInvalid,
                    'bg-blue-600 hover:bg-blue-700': !isInvalid,
                  },
                )}
              >
                <span>진단 결과 확인하기 →</span>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
