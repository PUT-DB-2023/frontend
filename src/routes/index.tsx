import { useRoutes } from 'react-router-dom';
import { useProtectedRoutes } from './admin';
import { publicRoutes } from "./public";

export const AppRoutes = () => {
    const element = useRoutes([...useProtectedRoutes(), ...publicRoutes]);
    return <>{element}</>
  };