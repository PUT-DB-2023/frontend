import { ErrorFallback } from 'components/ErrorFallback'
import { Route, Routes } from 'react-router-dom'
import { Providers } from './Providers'

export const ProvidersRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<ErrorFallback error={{response: {status: 404}}}/> } />,
      <Route path="" element={<Providers />} />
    </Routes>
  )
}
