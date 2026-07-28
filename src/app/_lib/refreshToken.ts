export type RefreshTokenResponseTypes = {
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
};

export const refreshToken = async (refreshTokenString: string) => {
  const payload = { refreshToken: refreshTokenString };
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://124.63.118.168:5001/server';

  const response = await fetch(`${apiBase}/api/auth/token/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || '토큰 재발급 실패');
  }

  return (await response.json()).data as RefreshTokenResponseTypes;
};
