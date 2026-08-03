import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5,
        gcTime: 60 * 1000 * 5 * 2,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return sscQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  return browserQueryClient;
};

const sscQueryClient = cache(() => createQueryClient());

export default getQueryClient;
