import { adminRoutes } from "routes/admin";
import { useRoutes } from 'react-router-dom';

export const AppRoutes = () => {
    const routes = adminRoutes
  
    const element = useRoutes([...routes]);
    return <>{element}</>
  };