import AuthContext from 'context/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router';
import { ErrorFallback } from './ErrorFallback';

interface IProtectedRoutes {
  element: JSX.Element;
  permission: string;
}

export const ProtectedRoute = ({ element, permission }: IProtectedRoutes) => {
  const { authUser } = useContext(AuthContext)

  // redirect to login if there is no user
  if (!authUser.id) {
    return <Navigate to='/auth/login' />
  }

  // display 403 page
  if (!authUser?.permissions?.includes(permission)) {
    return <ErrorFallback error={{ response: { status: 403 } }} />
  }

  return (
    element
  )
}