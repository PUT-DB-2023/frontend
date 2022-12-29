import { ErrorFallback } from 'components/ErrorFallback'
import { Route, Routes } from 'react-router-dom'
import { Server } from './Server'
import { Servers } from './Servers'

export const ServersRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<ErrorFallback error={{response: {status: 404}}}/> } />,
      <Route path="" element={<Servers />} />
      <Route path=":id" element={<Server />} />
    </Routes>
  )
}
