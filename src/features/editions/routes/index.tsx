import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Edition } from './Edition'

export const EditionsRoutes = () => {
  return (
    <Routes>
      <Route path=":editionId" element={<Edition />} />
    </Routes>
  )
}
