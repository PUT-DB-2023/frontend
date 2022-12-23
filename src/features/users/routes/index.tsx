import React from 'react'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import { UserType } from 'types'
import { User } from './User'
import { Users } from './Users'
import { UserTypes } from './UserTypes'

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<UserTypes />} />
      <Route path="/:id" element={<User type={UserType.TEACHER} />} />
      <Route path="/admins/" element={<Users type={UserType.ADMIN}/>} />
      <Route path="/teachers/" element={<Users type={UserType.TEACHER}/>} />
      <Route path="/students/" element={<Users type={UserType.STUDENT}/>} /> 
      <Route path="/admins/:id" element={<User type={UserType.ADMIN} />} />
      <Route path="/teachers/:id" element={<User type={UserType.TEACHER} />} />
      <Route path="/students/:id" element={<User type={UserType.STUDENT} />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
