import { MainLayout } from "components";
import { ErrorPage } from "components/ErrorPage";
import AuthContext from "context/AuthContext";
import { CoursesRoutes } from "features/courses/routes";
import { GroupsRoutes } from "features/groups";
import { SemestersRoutes } from "features/semesters";
import { ServersRoutes } from "features/servers";
import { User, UsersRoutes } from "features/users";
import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";

const App = () => {
  const {authUser, setAuthUser} = useContext(AuthContext)

  useEffect(() => {
    const authenticatedUser: User = JSON.parse(localStorage.getItem('auth_user') || "") 
    setAuthUser(authenticatedUser)
    console.log('authenticatedUser', authenticatedUser);
    console.log('authUser', authUser);
  }, [])

    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  };

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '*', element:  <ErrorPage text='Nie znaleziono takiej strony.' buttonText='Powrót na stronę główną' /> },
      { path: '/', element: <Navigate to={'/courses/'} /> },
      { path: '/courses/*', element: <ProtectedRoute element={<CoursesRoutes />} permission={'database.view_course'} /> },
      { path: '/users/*', element: <ProtectedRoute element={<UsersRoutes />} permission={'database.view_user'} /> },
      { path: '/servers/*', element: <ProtectedRoute element={<ServersRoutes />} permission={'database.view_server'} /> },
      { path: '/semesters/*', element: <ProtectedRoute element={<SemestersRoutes />} permission={'database.view_semester'} /> },
      { path: '/groups/*', element: <ProtectedRoute element={<GroupsRoutes />} permission={'database.view_group'} /> },
    ],
  }
];
