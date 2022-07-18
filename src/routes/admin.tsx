import { MainLayout } from "components";
import { Courses } from "features/courses";
import { CoursesRoutes } from "features/courses/routes";
import { Edition } from "features/editions/routes/Edition";
import { ServersRoutes } from "features/servers";
import { UsersRoutes } from "features/users";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

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
        { path: '/', element: <Courses /> },
        { path: '/courses/*', element: <CoursesRoutes /> },
        { path: '/users/*', element: <UsersRoutes /> },
        { path: '/editions/*', element: <Edition /> },
        { path: '/servers/*', element: <ServersRoutes /> },
      ],
    },
  ];