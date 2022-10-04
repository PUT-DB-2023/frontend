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
      <Route path="/admins/" element={<Users type={UserType.ADMIN}/>} />
      <Route path="/teachers/" element={<Users type={UserType.TEACHER}/>} />
      <Route path="/students/" element={<Users type={UserType.STUDENT}/>} /> 
      <Route path=":id" element={<User />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
