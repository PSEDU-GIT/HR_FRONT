export interface RequestOtpPayload {
  token: string;
  name: string;
  phone: string;
}

export interface ConfirmOtpPayload {
  token: string;
  code: string;
}

export const requestOtp = async ({ token, name, phone }: RequestOtpPayload) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const res = await fetch(`/api/account/contract-signature/${token}/request-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, phone: cleanPhone }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || 'OTP 발송에 실패했습니다.');
  }
  return data;
};

export const confirmOtp = async ({ token, code }: ConfirmOtpPayload) => {
  const res = await fetch(`/api/account/contract-signature/${token}/confirm-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || 'OTP 인증번호가 올바르지 않습니다.');
  }
  return data;
};
