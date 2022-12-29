import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions, QueryCache } from 'react-query';

const queryConfig: DefaultOptions = {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: false,
      // suspense: false,
    },
  };
  
  export const queryClient = new QueryClient({ 
    defaultOptions: queryConfig,
    // queryCache: new QueryCache({
    //   onSuccess(data, query) {
    //     return null
    //   },
    //   onError: (error) => {
        
    //   }
    // })
  });