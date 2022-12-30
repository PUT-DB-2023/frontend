import { AuthProvider } from 'context/AuthContext';
import { queryClient } from 'lib/react-query';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from 'routes';
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
