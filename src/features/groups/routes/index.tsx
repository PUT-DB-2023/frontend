import { ErrorFallback } from 'components/ErrorFallback'
import { Route, Routes } from 'react-router-dom'
import { Group } from './Group'
import { Groups } from './Groups'

export const GroupsRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<ErrorFallback error={{ response: { status: 404 } }} />} />,
      <Route path="" element={<Groups />} />
      <Route path=":id" element={<Group />} />
    </Routes>
  )
}