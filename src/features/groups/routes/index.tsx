import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Group } from './Group'
import { Groups } from './Groups'

export const GroupsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Groups />} />
      <Route path=":id" element={<Group />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
