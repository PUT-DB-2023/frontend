import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from 'routes';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'lib/react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen bg-zinc-100 flex flex-col justify-center items-center gap-12"
      role="alert"
    >
      <h2 className="text-xl font-semibold"> Coś poszło nie tak :(</h2>
      <Button type={ButtonType.ACTION} onClick={() => window.location.assign(window.location.origin)} text='Odśwież' />
    </div>
  );
};


function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <ReactQueryDevtools initialIsOpen/>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
    
  );
}

export default App;
