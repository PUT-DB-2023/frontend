import { protectedRoutes } from "routes/admin";
import { useRoutes } from 'react-router-dom';

export const AppRoutes = () => {
    const routes = protectedRoutes
  
    const element = useRoutes([...routes]);
    return <>{element}</>
  };