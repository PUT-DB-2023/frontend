import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Edition } from './Edition'
import { Editions } from './Editions'

export const EditionsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Editions />} />
      <Route path=":id" element={<Edition />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
