import AuthContext from "context/AuthContext";
import { AuthRoutes } from "features/auth";
import { useContext } from "react";
import { Navigate } from "react-router";

const PublicRoute = () => {
  const {authUser, setAuthUser} = useContext(AuthContext)
  
  if (authUser.id) {
    console.log(authUser.id);
    
    return <Navigate to='/' />
  }

  return <AuthRoutes />
}

export const publicRoutes = [
    {
      path: '/auth/*',
      element: <PublicRoute />,
    },
];