import { MainLayout } from "components";
import { ErrorFallback } from "components/ErrorFallback";
import { CoursesRoutes } from "features/courses/routes";
import { GroupsRoutes } from "features/groups";
import { MajorsRoutes } from "features/majors";
import { ProvidersRoutes } from "features/providers";
import { SemestersRoutes } from "features/semesters";
import { ServersRoutes } from "features/servers";
import { UsersRoutes } from "features/users";
import { Navigate, Outlet } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";

const App = () => {
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
      { path: '*', element: <ErrorFallback error={{ response: { status: 404 } }} /> },
      { path: '/', element: <Navigate to={'/courses/'} /> },
      { path: '/courses/*', element: <ProtectedRoute element={<CoursesRoutes />} permission={'database.view_course'} /> },
      { path: '/users/*', element: <ProtectedRoute element={<UsersRoutes />} permission={'database.view_user'} /> },
      { path: '/servers/*', element: <ProtectedRoute element={<ServersRoutes />} permission={'database.view_server'} /> },
      { path: '/semesters/*', element: <ProtectedRoute element={<SemestersRoutes />} permission={'database.view_semester'} /> },
      { path: '/groups/*', element: <ProtectedRoute element={<GroupsRoutes />} permission={'database.view_group'} /> },
      { path: '/majors/*', element: <ProtectedRoute element={<MajorsRoutes />} permission={'database.view_group'} /> },
      { path: '/providers/*', element: <ProtectedRoute element={<ProvidersRoutes />} permission={'database.view_group'} /> },
    ],
  }
];