import { Edition } from 'features/editions/routes/Edition'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Course } from './Course'
import { Courses } from './Courses'

export const CoursesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Courses />} />
      <Route path=":courseId" element={<Course />}>
        <Route path="editions/:editionId" element={<Edition />} />
      </Route>
      <Route path=":courseId/editions" element={<Course />} />
      <Route path="*" element={<Navigate to="" />} />
    </Routes>
  )
} 