import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Semester } from './Semester'
import { Semesters } from './Semesters'

export const SemestersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Semesters />} />
      {/* <Route path=":id" element={<Semester/>} /> */}
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
