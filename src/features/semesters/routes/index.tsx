import { ErrorFallback } from 'components/ErrorFallback'
import { Route, Routes } from 'react-router-dom'
import { Semesters } from './Semesters'

export const SemestersRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<ErrorFallback error={{response: {status: 404}}}/> } />,
      <Route path="" element={<Semesters />} />
      {/* <Route path=":id" element={<Semester/>} /> */}
    </Routes>
  )
}
