import { ErrorPage } from 'components/ErrorPage'
import { Route, Routes } from 'react-router-dom'
import { Semesters } from './Semesters'

export const SemestersRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<ErrorPage text='Nie znaleziono takiej strony.' buttonText='Powrót na stronę główną' /> } />,
      <Route path="" element={<Semesters />} />
      {/* <Route path=":id" element={<Semester/>} /> */}
    </Routes>
  )
}
