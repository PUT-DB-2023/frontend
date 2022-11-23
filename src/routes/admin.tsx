import { MainLayout } from "components";
import { Courses } from "features/courses";
import { CoursesRoutes } from "features/courses/routes";
import { GroupsRoutes } from "features/groups";
import { SemestersRoutes } from "features/semesters";
import { ServersRoutes } from "features/servers";
import { UsersRoutes } from "features/users";
import { Navigate, Outlet } from "react-router-dom";

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
        { path: '/', element: <Navigate to={'/courses/'} /> },
        { path: '/courses/*', element: <CoursesRoutes /> },
        { path: '/users/*', element: <UsersRoutes /> },
        { path: '/servers/*', element: <ServersRoutes /> },
        { path: '/semesters/*', element: <SemestersRoutes /> },
        { path: '/groups/*', element: <GroupsRoutes /> },
        { path: '*', element: <Navigate to={'/courses/'} /> },
      ],
    },
  ];