import { ErrorPage } from 'components/ErrorPage';
import AuthContext from 'context/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router';

interface IProtectedRoutes {
  element: JSX.Element;
  permission: string;
}

export const ProtectedRoute = ({element, permission}: IProtectedRoutes) => {
  const {authUser, setAuthUser} = useContext(AuthContext)

  // redirect to login if there is no user
  if (!authUser.id) {
    console.log('YEP');
    
    return <Navigate to='/auth/login' />
  }

  // display 403 page
  if (!authUser.permissions.includes(permission)) {
    return <ErrorPage text='Nie masz wystarczających uprawnień, aby wyświetlić tą stronę.' buttonText='Powrót na stronę główną' />
  }

  return (
    element
  )
}