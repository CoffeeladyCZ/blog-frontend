import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutes = () => {
  const auth = { token: Cookies.get('token') || false };

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
