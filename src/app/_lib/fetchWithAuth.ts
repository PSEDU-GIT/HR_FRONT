import { auth } from '@/app/auth';

const API_BASE = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://xamfinity.n-e.kr';
const SITE_BASE = process.env.NEXT_PUBLIC_SITE_URL ?? '';

type StandardResponse<T = object> = {
  data: T | null;
  message: string;
  code: number;
};

function toURL(path: string) {
  if (/^https?:\/\//.test(path)) return path;

  if (path.startsWith('/api/')) {
    return `${SITE_BASE}${path}`;
  }

  return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
}

export async function fetchWithAuth<T = object>(
  url: string,
  init: RequestInit = {},
  hasToken?: boolean
) {
  let session = await auth();

  if (!session?.accessToken && hasToken) {
    const error = new Error('UNAUTHENTICATED');
    (error as any).data = {
      code: 401,
      message: 'UNAUTHENTICATED',
      data: null,
    };
    throw error;
  }

  const doFetch = async (token: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(init.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(toURL(url), {
      ...init,
      credentials: 'omit',
      headers,
    });
  };

  let response: Response;
  try {
    response = await doFetch(session?.accessToken ?? '');
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    session = await auth();
    response = await doFetch(session?.accessToken ?? '');
  }

  if ((response.status === 500 || response.status === 401) && hasToken) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    session = await auth();
    response = await doFetch(session?.accessToken ?? '');
  }

  const isSuccess = response.status >= 200 && response.status < 300;
  const isNotFound = response.status === 404;
  const isCustom = response.status >= 900 && response.status < 1000;

  const result = (await response.json()) as StandardResponse<T>;

  if (!isSuccess && !isNotFound && !isCustom) {
    const error = new Error('API ERROR');
    (error as any).data = result;

    throw error;
  }

  return result;
}
