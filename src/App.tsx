import { Button } from 'components/Button';
import { Loading } from 'components/Loading';
import { AuthProvider } from 'context/AuthContext';
import { queryClient } from 'lib/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider, useQueryErrorResetBoundary } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'routes';
import { ButtonType } from 'types';
import './App.css';

export const ErrorFallback = ({error, resetErrorBoundary} : {error: any, resetErrorBoundary: any}) => {
  console.log('-/-/-/-/-/-/-/-/-/-/-/- ERROR FALLBACK', error, resetErrorBoundary);
  const navigate = useNavigate()
  
  return (
    <div className='w-full h-full flex gap-8 flex-col justify-center items-center' role="alert">
      <h2 className="text-xl text-red-500 font-semibold"> {error.message} </h2>
      <Button type={ButtonType.ACTION} onClick={() => window.location.assign(window.location.origin)} text='Powrót na stronę główną' />
  </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
            <ReactQueryDevtools initialIsOpen/>
          </QueryClientProvider>
        </BrowserRouter>
    </AuthProvider>   
  );
}

export default App;
