import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from 'routes';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'lib/react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { ErrorBoundary } from 'react-error-boundary';
import AuthContext, { AuthProvider } from 'context/AuthContext';
import { useContext } from 'react';
import { useAuthUserInfo } from 'hooks/useAuthUserInfo';

const ErrorFallback = ({error, resetErrorBoundary} : {error: any, resetErrorBoundary: any}) => {
  return (
    <div
      className="text-red-500 w-screen h-screen bg-zinc-100 flex flex-col justify-center items-center gap-12"
      role="alert"
    >
      <h2 className="text-xl font-semibold"> Coś poszło nie tak :(</h2>
      {/* <h2 className="text-base font-semibold"> </h2> */}
      <Button type={ButtonType.ACTION} onClick={() => window.location.assign(window.location.origin)} text='Odśwież' />
    </div>
  );
};


const App = () => {

  return (
    <AuthProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
            <ReactQueryDevtools initialIsOpen/>
          </QueryClientProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
    
  );
}

export default App;
