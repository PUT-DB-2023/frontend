import { protectedRoutes } from "./admin";
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from "./public";

export const AppRoutes = () => {
    const element = useRoutes([...protectedRoutes, ...publicRoutes]);
    return <>{element}</>
  };