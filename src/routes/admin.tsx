import { MainLayout } from "components";
import { Courses } from "features/courses";

const App = () => {
    return (
      <MainLayout>
      </MainLayout>
    );
  };

export const adminRoutes = [
    {
      path: '/app',
      element: <App />,
      children: [
        { path: '/', element: <Courses /> },
      ],
    },
  ];