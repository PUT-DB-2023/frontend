import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Courses } from 'features/courses';
import { MainLayout } from 'components';
import { Editions } from 'features/editions';
import { Error } from 'components'

function App() {
  return (
    <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path='/courses' element={ <Courses /> }/>
            <Route path="/courses/:id" element={ <Editions />} />
            <Route path='/404' element={ <Error /> }/>
            <Route
                path="/"
                element={<Navigate to="/courses" replace />}
            />
            <Route
                path="*"
                element={<Navigate to="/404" replace />}
            />
          </Routes>
      </MainLayout>
    </BrowserRouter>
    
  );
}

export default App;
