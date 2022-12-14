import { MainLayout } from "components";
import { CoursesRoutes } from "features/courses/routes";
import { GroupsRoutes } from "features/groups";
import { SemestersRoutes } from "features/semesters";
import { ServersRoutes } from "features/servers";
import { UsersRoutes } from "features/users";
import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

// const CoursesRoutes = lazy(() => import("features/courses"))
// const GroupsRoutes = lazy(() => import("features/groups"))
// const SemestersRoutes = lazy(() => import("features/semesters"))
// const ServersRoutes = lazy(() => import("features/servers"))
// const UsersRoutes = lazy(() => import("features/users"))

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