import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Profile } from './Profile'
import { Users } from './Users'

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Users />} />
      <Route path=":id" element={<Profile />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
