import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Courses } from 'features/courses';
import { MainLayout } from 'components';
import { Editions } from 'features/editions';
import { Error } from 'components'
import { AppRoutes } from 'routes';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'lib/react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ReactQueryDevtools initialIsOpen/>
      </QueryClientProvider>
    </BrowserRouter>
    
  );
}

export default App;
