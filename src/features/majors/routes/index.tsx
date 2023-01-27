import { ErrorFallback } from 'components/ErrorFallback'
import { Route, Routes } from 'react-router-dom'
import { Majors } from './Majors'

export const MajorsRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<ErrorFallback error={{ response: { status: 404 } }} />} />,
      <Route path="" element={<Majors />} />
    </Routes>
  )
}