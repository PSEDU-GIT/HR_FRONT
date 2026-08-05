export interface TokenSessionData {
  token: string;
  step: number; // 1: 본인확인, 2: OTP/가입안내, 3: 서명체결
  name: string;
  phone: string;
  isMember?: boolean;
}

export const clearOldTokenSessions = (currentToken: string) => {
  if (typeof window === 'undefined' || !currentToken) return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('contract_session_') && key !== `contract_session_${currentToken}`) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => sessionStorage.removeItem(key));
  } catch (e) {
    console.error('Failed to clear old token sessions:', e);
  }
};

export const getTokenSession = (token: string): TokenSessionData => {
  if (typeof window === 'undefined' || !token) {
    return { token: token || '', step: 1, name: '', phone: '' };
  }
  try {
    const raw = sessionStorage.getItem(`contract_session_${token}`);

    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        token,
        step: parsed.step || 1,
        name: parsed.name || '',
        phone: parsed.phone || '',
        isMember: parsed.isMember,
      };
    }
  } catch (e) {
    console.error('Failed to read token session storage:', e);
  }
  return { token, step: 1, name: '', phone: '' };
};

export const setTokenSession = (token: string, data: Partial<TokenSessionData>) => {
  if (typeof window === 'undefined' || !token) return;
  try {
    // 이전 토큰 세션 키들을 정리하여 세션 누적 방지
    clearOldTokenSessions(token);

    const current = getTokenSession(token);
    const updated: TokenSessionData = {
      ...current,
      ...data,
      token,
    };
    sessionStorage.setItem(`contract_session_${token}`, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to set token session storage:', e);
  }
};
