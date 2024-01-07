import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Loader } from "./common/components/Loader";
import PrivateRoutes from "./utils/PrivateRoutes";

/*
 */
const Layout = lazy(() => import("./layouts/layouts/layout_1"));
// const Layout = lazy(() => import("./layouts/layouts/layout_2"));
/*
 */
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Settings = lazy(() => import("./pages/Settings"));
const Page404 = lazy(() => import("./pages/404"));

const RoutesList = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RoutesList;
