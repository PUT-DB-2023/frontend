import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Server } from './Server'
import { Servers } from './Servers'

export const ServersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Servers />} />
      <Route path=":id" element={<Server />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
