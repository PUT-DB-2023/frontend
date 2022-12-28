import { ErrorPage } from 'components/ErrorPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Group } from './Group'
import { Groups } from './Groups'

export const GroupsRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<ErrorPage text='Nie znaleziono takiej strony.' buttonText='Powrót na stronę główną' /> } />,
      <Route path="" element={<Groups />} />
      <Route path=":id" element={<Group />} />
    </Routes>
  )
}
