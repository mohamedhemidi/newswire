import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "modules/authentication/utils/authHelper";

const PrivateRoutes = () => {
  const authenticated = checkAuth();

  return authenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
