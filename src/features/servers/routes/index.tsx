import { ErrorPage } from 'components/ErrorPage'
import { Route, Routes } from 'react-router-dom'
import { Server } from './Server'
import { Servers } from './Servers'

export const ServersRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<ErrorPage text='Nie znaleziono takiej strony.' buttonText='Powrót na stronę główną' /> } />,
      <Route path="" element={<Servers />} />
      <Route path=":id" element={<Server />} />
    </Routes>
  )
}
