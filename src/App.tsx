import { Button } from 'components/Button';
import { AuthProvider } from 'context/AuthContext';
import { queryClient } from 'lib/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from 'routes';
import { ButtonType } from 'types';
import './App.css';

const ErrorFallback = ({error, resetErrorBoundary} : {error: any, resetErrorBoundary: any}) => {

  console.log('-/-/-/-/-/-/-/-/-/-/-/- ERROR FALLBACK', error, resetErrorBoundary);
  
  return (
    <div
      className="text-red-500 w-screen h-screen bg-zinc-100 flex flex-col justify-center items-center gap-12"
      role="alert"
    >
      <h2 className="text-xl font-semibold"> {error.message}</h2>
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
