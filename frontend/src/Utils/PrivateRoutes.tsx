import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "./Auth";

const PrivateRoutes = () => {
  const authenticated = checkAuth();

  return authenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
