import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from "./public";
import { ToastContainer } from 'react-toastify';

export const AppRoutes = () => {

  const element = useRoutes([...protectedRoutes, ...publicRoutes])

  return <>
    <ToastContainer />
    {element}
  </>
}