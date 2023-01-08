import AuthContext from 'context/AuthContext'
import { User } from 'features/users'
import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router'
import { Layout } from '../components/Layout'
import { LoginForm } from '../components/LoginForm'

export const Login = () => {
  // const {authUser, setAuthUser} = useContext(AuthContext)

  // useEffect(() => {
  //   const authenticatedUser: User = JSON.parse(localStorage.getItem('auth_user') || "") 
  //   setAuthUser(authenticatedUser)
  //   console.log(authenticatedUser, authUser);
    
  // }, [])

  // if (authUser.id) {
  //   console.log(authUser.id);
    
  //   return <Navigate to='/' />
  // }

  return(
    <Layout title={'Logowanie'}>
      <LoginForm />
    </Layout>
  )
}
