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
