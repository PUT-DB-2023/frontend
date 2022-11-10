import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Course } from './Course'
import { Courses } from './Courses'

export const CoursesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Courses />} />
      <Route path=":id" element={<Course />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}