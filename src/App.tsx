import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Courses } from 'features/courses';
import { MainLayout } from 'components';
import { Editions } from 'features/editions';
import { Error } from 'components'
import { AppRoutes } from 'routes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    
  );
}

export default App;
