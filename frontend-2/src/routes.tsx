import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./layouts/layout";
import { Loader } from "./common/components/Loader";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "pages/Login";
import Signup from "pages/Signup";

const Home = lazy(() => import("./pages/Home"));

const RoutesList = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>{/* // Pivate Routes */}</Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RoutesList;
