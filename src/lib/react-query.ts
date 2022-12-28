import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions, QueryCache } from 'react-query';

const queryConfig: DefaultOptions = {
    queries: {
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  };
  
  export const queryClient = new QueryClient({ defaultOptions: 
    queryConfig,
    // queryCache: new QueryCache({
    //   onSuccess(data, query) {
    //     return null
    //   },
    //   onError: (error) => {
    //     console.log('QUERY CACHE - ERROR', error);
    //   }
    // })
  });