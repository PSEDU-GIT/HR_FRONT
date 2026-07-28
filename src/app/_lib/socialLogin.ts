export type SocialLoginResponseTypes = {
  status: 'LOGIN_SUCCESS' | 'REGISTER_REQUIRED';
  email: string | null;
  tokenInfo: {
    accessToken: string;
    refreshToken: string;

    staff: {
      id: number;
      name: string;
      email: string;
      loginId: string;
    };

    academies: {
      academy_id: string;
      academy_name: string;
      group_auth_id: number;
      employ_status: string;
      position: string;
      isDirector: boolean;
      director_name: string;
    }[];

    roles: {
      path: string;
      role: string;
    }[];

    loginStatus: string;
  } | null;
};

type Props = {
  token: string;
};

export const socialLogin = async ({ token }: Props) => {
  const payload = { token, provider: 'GOOGLE' };
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://124.63.118.168:5001/server';

  const response = await fetch(`${apiBase}/api/auth/signIn/social`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || '구글 로그인을 실패하였습니다.');
  }

  return (await response.json()).data as SocialLoginResponseTypes;
};
