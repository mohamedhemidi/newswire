import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "modules/authentication/utils/authHelper";

const PrivateRoutes = () => {
  const authenticated = checkAuth();

  return authenticated.loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
